import { TokenInfo } from '@labb/constellation-core-types';
import { BootstrapService, formatters } from '@labb/dx-engine';
import { PegaEmbed } from '@labb/react-adapter';
import { MutableRefObject, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { DemoBootstrap } from './bootstrap';
import './pega/ContainerMapping';
import { sendMessage, speechToText, startConversation } from './pega/conversational';
import { BOIAlert } from './pega/design-system/alert';
import { Chat } from './pega/design-system/chat';
import { BOIContainer } from './pega/design-system/container';
import { BOIBackButton } from './pega/design-system/navigation-buttons';
import { BOISummaryItem } from './pega/design-system/summary';
import BOITemplate from './pega/design-system/template';
import './style.css';

const root = ReactDOM.createRoot(
  document.getElementsByTagName('app-root')[0] as HTMLElement
);

async function render() {
  root.render(
    <Suspense>
      <BOITemplate>
        <Main />
      </BOITemplate>
    </Suspense>
  );
}

function Main() {
  const [token, setToken] = useState<TokenInfo>();
  const [authError, setAuthError] = useState<string>();
  const [showCase, setShowCase] = useState<boolean>(false);
  const [lastAgentMessage, setLastAgentMessage] = useState<{ text: string, timestamp: Date }[]>([]);
  const deployUrl = '/demo-self-service/bankofireland/';
  const [portfolio, setPortfolio] = useState({
    details: {
      balance: 25430,
      name: '',
      tolerance: '',
      goal: '',
      benchmark: '',
      portfolioId: '',
    },
    shares: [
      {
        name: 'Apple',
        callSign: 'AAPL',
        amount: 12,
        price: 237.88
      },
      {
        name: 'Tesla',
        callSign: 'TSLA',
        amount: 5,
        price: 416.85
      },
      {
        name: 'Amazon',
        callSign: 'AMZN',
        amount: 8,
        price: 231.23
      }
    ]
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [conversationID, setConversationID] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const useVoiceRecording = (onStopRecording: (blob: Blob) => void, audioContextRef: MutableRefObject<AudioContext | null>) => {
    const [isRecording, setIsRecording] = useState(false);
    const [permissionError, setPermissionError] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const SILENCE_DURATION = 1500; // ms
    const SILENCE_THRESHOLD = 0.01; // Adjust as needed

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (sourceRef.current && analyserRef.current && audioContextRef.current) {
          const source = audioContextRef.current.createMediaStreamSource(stream);
          sourceRef.current = source;
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 2048;
          source.connect(analyserRef.current);
        }
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setIsRecording(false);
          onStopRecording(audioBlob);
          audioChunksRef.current = [];
          stream.getTracks().forEach(track => track.stop());
          if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setPermissionError(false);
        detectSilence();
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setPermissionError(true);
        setIsRecording(false);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    };

    // Silence detection logic
    const detectSilence = useCallback(() => {
      if (!analyserRef.current) return;
      const buffer = new Float32Array(analyserRef.current.fftSize);
      analyserRef.current.getFloatTimeDomainData(buffer);
      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] * buffer[i];
      }
      const rms = Math.sqrt(sum / buffer.length);
      if (rms < SILENCE_THRESHOLD) {
        if (!silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            stopRecording();
          }, SILENCE_DURATION);
        }
      } else {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      }
      if (isRecording) {
        requestAnimationFrame(detectSilence);
      }
    }, [isRecording]);

    useEffect(() => {
      if (isRecording) {
        detectSilence();
      }
      return () => {
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      };
    }, [isRecording, detectSilence]);

    return {
      isRecording,
      permissionError,
      startRecording,
      stopRecording,
    };
  };

  const handleStopRecording = (audioBlob: Blob) => {
    sendAudioToServer(audioBlob);
  };

  const { isRecording, permissionError, startRecording, stopRecording } = useVoiceRecording(
    handleStopRecording,
    audioContextRef
  );

  const sendAudioToServer = async (audioBlob: Blob) => {
    const response = await speechToText(audioBlob);
    chatRequest(response, token!);
  };

  useEffect(() => {
    try {
      DemoBootstrap.getToken().then(async token => {
        await BootstrapService.init({
          appID: DemoBootstrap.getAppId(),
          infinityServer: DemoBootstrap.getServerUrl(),
          deployUrl: deployUrl,
          token: token
        });

        const portfolioData = await window.PCore.getDataPageUtils()
          .getPageDataAsync('D_Portfolio', "app/primary_1", {
            pyGUID: "365a7ec5-e55f-41e4-af2a-001ab36c3fb5",
          }, {
            invalidateCache: true,
          });
        setPortfolio({
          ...portfolio,
          details: {
            name: portfolioData.PortfolioName,
            tolerance: portfolioData.RiskTolerance,
            goal: portfolioData.InvestmentGoal,
            benchmark: portfolioData.Benchmark,
            portfolioId: portfolioData.AccountID,
            balance: portfolioData.TotalValue
          }
        })
        setToken(token);
      });
    } catch (e) {
      setAuthError(e as string);
    }
  }, []);

  document.addEventListener("caseStatus", function (e) {
    setShowCase(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  });

  async function chatRequest(message: string, token: TokenInfo) {
    if (!message) return;
    const chatRequest = { text: message, timestamp: new Date() };
    setLastAgentMessage([...lastAgentMessage, chatRequest, { text: 'thinking...', timestamp: new Date() }]);
    console.log('sending ' + message);
    const agentId = '@BASECLASS!DEMOLABBLIVE';
    const context = crypto.randomUUID();
    let convoID = conversationID;
    if (!conversationID) {
      const conversation = await startConversation(agentId, context, token.access_token);
      convoID = conversation.ID;
      setConversationID(convoID);
    }
    const messageResponse = await sendMessage(agentId, token.access_token, convoID!, message);
    setLastAgentMessage([...lastAgentMessage, chatRequest, { text: messageResponse.response, timestamp: new Date() }]);
  }

  return <>
    {token && <BOIContainer progress={null}>
      <div className="portfolio-container">
        <header className="portfolio-header">
          <div className="field section u-title-decorator">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ marginBottom: '0' }}>{portfolio.details.name}</h2>
              <h4 style={{ color: 'green' }}>{formatters.Currency(portfolio.details.balance)}</h4>
            </div>
            <div className="portfolio-id" style={{ marginBottom: '1rem' }}>{portfolio.details.portfolioId}</div>
          </div>
          {Object.keys(portfolio.details)
            .filter(key => !['name', 'balance', 'portfolioId'].includes(key))
            .map(key => <BOISummaryItem key={key} label={key} value={(portfolio.details as any)[key]} />)}
        </header>

        {!showCase ? <section className="stock-list">

          {showConfirmation && <section className='stock-list'>
            <BOIAlert message={'Your order has been processed.'} />
          </section>}
          <div className="fRyVuv">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Nr</th>
                    <th>Price</th>
                    <th className='action'>Buy</th>
                    <th className='action'>Sell</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.shares.map(share => <tr key={share.name}>
                    <td>{share.name}</td>
                    <td>{share.callSign}</td>
                    <td>{share.amount}</td>
                    <td><span className={"stock-price" + (share.price > 300 ? '-positive' : '-negative')} style={{ color: share.price > 300 ? 'green' : 'red' }}>{formatters.Currency(share.price)}</span></td>
                    <td className='action'>
                      <BOIBackButton disabled={false} shadow={false} showArrow={false} onClick={() => setShowCase(true)}>+</BOIBackButton>
                    </td>
                    <td className='action'>
                      <BOIBackButton disabled={false} shadow={false} showArrow={false} onClick={() => setShowCase(true)}>-</BOIBackButton>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <Chat messages={lastAgentMessage}
            toggleRecording={(isRecording) => isRecording ? stopRecording() : startRecording()}
            onReset={() => {
              setConversationID(null);
              setLastAgentMessage([]);
            }}
            onSubmit={async (val) => {
              const message = (val.target as HTMLInputElement).value;
              chatRequest(message, token);
            }} />
        </section> :
          <section className='stock-list'>
            <PegaEmbed
              deployUrl={deployUrl}
              caseTypeID={'BOI-TradeAsset-Work-TradeOrder'}
              infinityServer={DemoBootstrap.getServerUrl()}
              localeID={DemoBootstrap.getLocaleId()}
              appID={DemoBootstrap.getAppId()}
              token={token}
            />
          </section>}
      </div>
    </BOIContainer>}
    {(!token && !authError) && <h3>Taming the chaos...</h3>}
    {(authError) && <h1>{authError}</h1>}
  </>
}

render();

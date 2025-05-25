import { TokenInfo } from "@labb/constellation-core-types";
import { DemoBootstrap } from "@labb/demo-utilities";
import { PegaEmbed } from "@labb/react-adapter";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import HsbcTemplate from "../design-system/hsbc-template";
import FloatingChatContainer from "./components/chat/FloatingChatContainer";
import { ChatProvider } from "./context/ChatContext";
import "./pega/ContainerMapping";

const root = ReactDOM.createRoot(
  document.getElementsByTagName("app-root")[0] as HTMLElement
);

async function render() {
  try {
    root.render(<MainHsbc />);
  } catch (error) {
    root.render(null);
  }
}

render();

function MainHsbc() {
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <ChatProvider>
        <HsbcTemplate
          productImage="public/HSBC_Premier_Debit_Header.png"
          productName={title}
        >
          <Main setTitle={setTitle}/>
        </HsbcTemplate>
        <FloatingChatContainer />
      </ChatProvider>
    </>
  );
}

function Main(props?: { setTitle?: Function }) {
  const [loadingStatus, setLoadingStatus] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<TokenInfo>();
  const [authError, setAuthError] = useState<string>();

  const action = DemoBootstrap.getAction();
  useEffect(() => {
    try {
      DemoBootstrap.getToken().then(setToken);
    } catch (e) {
      setAuthError(e as string);
    }
  }, []);
  return <>
    {token && <PegaEmbed
      caseTypeID={action === 'createCase' ? DemoBootstrap.getCaseTypeId() : undefined}
      pageID={action === 'openPage' ? DemoBootstrap.getPageId() : undefined}
      className={action === 'openPage' ? DemoBootstrap.getPageClass() : undefined}
      infinityServer={DemoBootstrap.getServerUrl()}
      localeID={DemoBootstrap.getLocaleId()}
      appID={DemoBootstrap.getAppId()}
      token={token}
      loadingDone={status => {
        setLoadingStatus(status);
        props?.setTitle?.(
          window.PCore.getStore().getState().data["app/primary_1"]
            ?.caseInfo?.caseTypeName
        );
      }}
    />}
    {(!token && !authError) && <h1>Authentication in progress</h1>}
    {(token && loadingStatus === undefined) && <h1>Process is being loaded</h1>}
    {(authError) && <h1>{authError}</h1>}
    {(loadingStatus === false) && <h1>Error communicating with Pega</h1>}
  </>
}
import { OAuth2Service } from '@labb/dx-engine';
import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pega/ContainerMapping';
import { TokenInfo } from '@labb/constellation-core-types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function render() {
  // const serverUrl = 'https://labbconsulting05.pegalabs.io/prweb';
  const serverUrl = 'http://localhost:3333/prweb'
  const authPath = '/PRRestService/oauth2/v1';
  try {
    // const token = await OAuth2Service.getTokenAuthorizationCode({
    //   appId: 'LabbCS',
    //   authorizationUrl: `${serverUrl}${authPath}/authorize`,
    //   accessTokenUrl: `${serverUrl}${authPath}/token`,
    //   revokeUrl: `${serverUrl}${authPath}/revoke`,
    //   redirectUrl: `http://localhost:4203/auth.html`,
    //   authService: 'pega',
    //   clientId: '13576784492731597416',
    //   pkce: true
    // });
    const token = {} as TokenInfo;
    root.render(
      <PegaEmbed
        serverUrl={serverUrl}
        token={token}
        localeID='en-GB'
        caseTypeID="Labb-LabbCS-Work-Service-MakePayment" />
    );
  } catch (error) {
    root.render(null);
  }
}

render();

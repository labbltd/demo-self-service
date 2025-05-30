import { DemoBootstrap } from "@labb/demo-utilities";

export default function OotbPegaEmbed() {
    return <pega-embed id='theEmbed'
        action={DemoBootstrap.getAction()}
        caseTypeID={DemoBootstrap.getCaseTypeId()}
        caseID={DemoBootstrap.getCaseId()}
        pageID={DemoBootstrap.getPageId()}
        pageClass={DemoBootstrap.getPageClass()}
        casePage={DemoBootstrap.getCasePage()}
        tokenUri={DemoBootstrap.getAccessTokenUrl()}
        pegaServerUrl={DemoBootstrap.getServerUrl()}
        staticContentUrl={DemoBootstrap.getStaticContentUrl()}
        autoReauth='true'
        appAlias={DemoBootstrap.getAppId()}
        grantType={DemoBootstrap.getAuthFlow() === 'client_credentials' ?
            'clientCreds' : 'passwordCreds' // Supported values: 'authCode", 'customBearer', 'clientCreds', 'passwordCreds' or 'none'
        }
        userIdentifier={DemoBootstrap.getUsername()}
        password={window.btoa(DemoBootstrap.getPassword())}
        clientId={DemoBootstrap.getClientId()}
        clientSecret={DemoBootstrap.getClientSecret()}
        style={{ width: '100%', padding: '50px' }}></pega-embed>
}
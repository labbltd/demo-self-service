import { TokenInfo } from "@labb/constellation-core-types";
import { DemoBootstrap } from "@labb/demo-utilities";
import { PegaEmbed } from "@labb/react-adapter";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import LVCTemplate from "../design-system/lvc-template";
import FloatingChatContainer from "./components/chat/FloatingChatContainer";
import { ChatProvider } from "./context/ChatContext";
import "./pega/ContainerMapping";

const root = ReactDOM.createRoot(
  document.getElementsByTagName("app-root")[0] as HTMLElement
);

async function render() {
  try {
    root.render(<MainRoot />);
  } catch (error) {
    root.render(null);
  }
}

render();

function MainRoot() {
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <ChatProvider>
        <LVCTemplate
          productImage="public/LVCWebsiteBanner.png"
          productName={title}
        >
          <Main setTitle={setTitle}/>
        </LVCTemplate>
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
    {(!token && !authError) && <h3>Taming the chaos...</h3>}
    {(token && loadingStatus === undefined) && <h3>Leading the change...</h3>}
    {(authError) && <h1>{authError}</h1>}
    {(loadingStatus === false) && <h1>Error communicating with Pega</h1>}
  </>
}
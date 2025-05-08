import { TokenInfo } from "@labb/constellation-core-types";
import { PegaEmbed } from "@labb/react-adapter";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import HsbcTemplate from "../design-system/hsbc-template";
import "./pega/ContainerMapping";
import { DemoBootstrap } from "@labb/demo-utilities";
import FloatingChatContainer from "./components/chat/FloatingChatContainer";
import { ChatProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function render() {
  try {
    root.render(<Main token={await DemoBootstrap.getToken()}></Main>);
  } catch (error) {
    root.render(null);
  }
}

render();

function Main(props: { token: TokenInfo }) {
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <ChatProvider>
        <HsbcTemplate
          productImage="public/HSBC_Premier_Debit_Header.png"
          productName={title}
        >
          <PegaEmbed
            token={props.token}
            caseTypeID={DemoBootstrap.getCaseTypeId()}
            serverUrl={DemoBootstrap.getServerUrl()}
            localeID={DemoBootstrap.getLocaleId()}
            appID={DemoBootstrap.getAppId()}
            doneLoading={() => {
              setTitle(
                window.PCore.getStore().getState().data["app/primary_1"]
                  ?.caseInfo?.caseTypeName
              );
            }}
          />
        </HsbcTemplate>
        <FloatingChatContainer />
      </ChatProvider>
    </>
  );
}

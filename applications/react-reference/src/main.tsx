import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pega/ContainerMapping';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function render() {
  root.render(
    <PegaEmbed
      token={await DemoBootstrap.getToken()}
      caseTypeID={DemoBootstrap.getCaseTypeId()}
      serverUrl={DemoBootstrap.getServerUrl()}
      localeID={DemoBootstrap.getLocaleId()}
      appID={DemoBootstrap.getAppId()}
    />);
}

render();

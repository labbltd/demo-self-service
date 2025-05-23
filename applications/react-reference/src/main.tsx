import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pega/ContainerMapping';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function render() {
  const action = DemoBootstrap.getAction();
  root.render(
    <PegaEmbed
      token={await DemoBootstrap.getToken()}
      caseTypeID={action === 'createCase' ? DemoBootstrap.getCaseTypeId() : undefined}
      pageID={action === 'openPage' ? DemoBootstrap.getPageId() : undefined}
      className={action === 'openPage' ? DemoBootstrap.getPageClass() : undefined}
      serverUrl={DemoBootstrap.getServerUrl()}
      localeID={DemoBootstrap.getLocaleId()}
      appID={DemoBootstrap.getAppId()}
    />);
}

render();

import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import './pega/ContainerMapping';
import MdsNavbar from './design-system/mds-navbar/mds-navbar';
import MdsTemplate from './design-system/mds-template/mds-template';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function render() {
  root.render(
    <MdsTemplate title='Chase Total Checking<sup>®</sup>'>
      <MdsNavbar />
      <PegaEmbed
        token={await await DemoBootstrap.getToken()}
        caseTypeID={DemoBootstrap.getCaseTypeId()}
        serverUrl={DemoBootstrap.getServerUrl()}
        localeID={DemoBootstrap.getLocaleId()}
        appID={DemoBootstrap.getAppId()}
      />
    </MdsTemplate>
  );
}

render();

import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from '@labb/react-adapter';

import './pega/ContainerMapping';
import './styles.scss';

import LabbContent from './pega/components/content';
import LabbHeader from './pega/components/header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function render() {
  root.render(
    <Suspense fallback={<h2>loading</h2>}>
      <div>
        <div className="header">
          <LabbHeader>
            <LabbContent />
          </LabbHeader>
        </div>
        <div className="main">
          <PegaEmbed
            token={await await DemoBootstrap.getToken()}
            caseTypeID={DemoBootstrap.getCaseTypeId()}
            serverUrl={DemoBootstrap.getServerUrl()}
            localeID={DemoBootstrap.getLocaleId()}
            appID={DemoBootstrap.getAppId()}
          />
        </div>
      </div>
    </Suspense>
  );
}

render();

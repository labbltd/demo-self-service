import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import './pega/ContainerMapping';

import LabbHeader from './pega/components/header';
import LabbContent from './pega/components/content';
import { PegaEmbed } from '@labb/react-adapter';
import { AuthenticationService } from '@labb/dx-engine';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const infinityServer = 'https://labbconsulting02.pegalabs.io/prweb';
const tokenPromise = AuthenticationService.oauthLogin(
  infinityServer,
  {
    clientId: '45946986569480875840',
    clientSecret: '17CA02A7E811F063861884214028D54D',
    grantType: 'client_credentials'
  }
);
tokenPromise.then(token => {
  root.render(
    <Suspense fallback={<h2>loading</h2>}>
      <div>
        <div className="header">
          <LabbHeader>
            <LabbContent />
          </LabbHeader>
        </div>
        <div className="main">
          <PegaEmbed serverUrl={infinityServer} token={token} caseTypeID='ATHO-Insurance-Work-LeningBerekenen' />
        </div>
      </div>
    </Suspense>
  );
})


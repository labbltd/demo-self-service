import { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from '@labb/react-adapter';

import './pega/ContainerMapping';

import { TokenInfo } from '@labb/constellation-core-types';
import LabbContent from './pega/components/content';
import LabbHeader from './pega/components/header';

const root = ReactDOM.createRoot(
  document.getElementsByTagName('app-root')[0] as HTMLElement
);

async function render() {
  root.render(
    <Suspense>
      <div>
        <div className="header">
          <LabbHeader>
            <LabbContent />
          </LabbHeader>
        </div>
        <div className="main">
          <Main />
        </div>
      </div>
    </Suspense>
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
      caseID={action === 'openCase' ? DemoBootstrap.getCaseId() : undefined}
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
        const caseID = window.PCore.getStore().getState().data['app/primary_1']?.caseInfo.ID;
        if (caseID) {
          DemoBootstrap.setAction('openCase');
          DemoBootstrap.setCaseId(caseID);
        }
      }}
    />}
    {(!token && !authError) && <h3>Taming the chaos...</h3>}
    {(token && loadingStatus === undefined) && <h3>Leading the change...</h3>}
    {(authError) && <h1>{authError}</h1>}
    {(loadingStatus === false) && <h1>Error communicating with Pega</h1>}
  </>
}

render();

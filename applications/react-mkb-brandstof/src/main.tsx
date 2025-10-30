import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import { BootstrapService, CaseType } from '@labb/dx-engine';
import { PegaEmbed } from '@labb/react-adapter';
import { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HelpBanner, NavigationFooter, NavigationHeader } from './design-system/design';
import './index.css';
import './pega/ContainerMapping';
import MkbCases from './design-system/cases';

const root = ReactDOM.createRoot(
  document.getElementsByTagName('app-root')[0] as HTMLElement
);

async function render() {
  root.render(<MainWrapper />);
}

function MainWrapper() {
  const [home, setHome] = useState(false);
  return <Suspense>
    <div id="app" className="container registration-form registration-route-contact">
      <NavigationHeader goHome={() => setHome(true)} />

      <div className="registration-content">
        <div className="usp-bar" >2</div>
        <Main home={home} hideHome={() => setHome(false)} />
        <HelpBanner />
      </div>

      <NavigationFooter />

      <div className="passes-shopping-cart-wrapper" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <div className="shopping-cart-button">
          <button type="button" style={{ backgroundColor: '#00AEAB', color: 'white', padding: '15px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="shopping-cart-button__icon">🛒</span>
              <span className="shopping-cart-button__total">
                <span>Jouw bestelling</span> (1)
              </span>
            </div>
            <span className="shopping-cart-button__total-price">
              <span>€ 4,95 p/m</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Suspense>
}

function Main(props?: { setTitle?: Function, home: boolean, hideHome: Function }) {
  const [loadingStatus, setLoadingStatus] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<TokenInfo>();
  const [authError, setAuthError] = useState<string>();
  const [caseTypes, setCaseTypes] = useState<CaseType[]>([]);
  const [hideCase, setHideCase] = useState(props?.home);

  const action = DemoBootstrap.getAction();
  useEffect(() => {
    try {
      DemoBootstrap.getToken().then(setToken);
    } catch (e) {
      setAuthError(e as string);
    }
  }, []);
  useEffect(() => {
    setHideCase(props?.home)
  }, [props?.home]);
  useEffect(() => {
    if (!token) return;
    (async () => {
      const types = await BootstrapService.getCaseTypes(`${DemoBootstrap.getServerUrl()}/app/${DemoBootstrap.getAppId()}`, token!);
      setCaseTypes(types.caseTypes);
    })();
  }, [token]);
  return <>
    {props?.home && <MkbCases cases={caseTypes} onCaseSelected={(key) => {
      props?.hideHome();
      setHideCase(false)
      BootstrapService.createCase(key, 'app', {})
    }} />}
    {token && <div style={{ display: hideCase ? 'none' : 'block' }}><PegaEmbed
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
    /></div>}
    {(!token && !authError) && <h3>Taming the chaos...</h3>}
    {(token && loadingStatus === undefined) && <h3>Leading the change...</h3>}
    {(authError) && <h1>{authError}</h1>}
    {(loadingStatus === false) && <h1>Error communicating with Pega</h1>}
  </>
}

render();

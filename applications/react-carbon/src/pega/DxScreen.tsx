import { PConnect, TokenInfo } from '@pega/constellationjs';
import {
  BootstrapService,
  PContainer,
  PContainerFactory
} from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { createContext, useState } from 'react';

// const serverUrl = 'https://labbconsulting02.pegalabs.io/prweb/app/dx';
const serverUrl = 'http://localhost:3333/prweb';

export interface DxScreenProps {
  portal?: string;
  assignmentID?: string;
  pageID?: string;
  className?: string;
  caseTypeID?: string;
  hideNavigation?: boolean;
}

export const NavigationContext = createContext(false);

export default function DxScreen(props: DxScreenProps): JSX.Element | null {
  const [container, setContainer] = useState<PContainer | null>(null);
  if (!container) {
    (async () => {
      const token = {
        "access_token": "eyJraWQiOiIxM2RlZDIxM2U2ZTQwYzA5YjkzZmFlZTU3YWQzOWE2ZCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ1cm46MjI1MzEwMzgyNjU1NDU4MzQ4MTMiLCJzdWIiOiJkYW5pZWxAbGFiYiIsImFwcF9uYW1lIjoiQXBwb2ludG1lbnRzIiwibmJmIjoxNjg5OTQ1NzI1LCJhcHBfdmVyc2lvbiI6IjAxLjAxLjAxIiwiaXNzIjoidXJuOmxhYmJjb25zdWx0aW5nMDIucGVnYWxhYnMuaW8iLCJleHAiOjE2ODk5NDkzMjUsImlhdCI6MTY4OTk0NTcyNSwianRpIjoiNjJlYjJhNzQ5NTNiYThjYjkzZWQxYzJlZWYzYWU0NDAiLCJvcGVyYXRvcl9hY2Nlc3MiOiJBcHBvaW50bWVudHM6QXV0aG9ycyJ9.EWcCnVehpJ9xG6VsRi2T2JLg2PxDPTwkUgozBWGlUq04Gen6ulvFmJBQL4x4NuvX-b_-EQlrsvdyd1pH4CZNFoRIN4PMogFpKl3gva1qsp27o0JnIhDf-sUCHpo5trH2Zj6UuACL8tO00d31VAMWX7WYt_0o5HtAmYAJNvHhb6MwwPUjX74x1iUCUFpjHYz3eOOUZle6o7c2rm-rn-I_82xuXpFpbE4YuC3v7h6gSzg04qYoOvyYX6KoTOAA68wNteRsQkQ-DAKeEMAPLX2KnQCdqjp_9lm85uEEXyigIAGumIL3ovoAtCgyAZOArJPU9cV2dgkKaPXQLQyPogeNjDxikhhG_nwhX8km8oHrADDcOY7Xm9ts2WWrtjDuj7OxpDBzEmPV-lc-6P9tnZ3y8beHmblU6K2OHl1WL0H9EL9g7ahUp46LSwaIle-P--WKVgINi53IhC0Ailvqq0SGL7K6nQ_QJWbcKwCxUzYhUTANVlNlL-3V1yEjXKtoK77jNBDxyfP5-96jskxDeYlP0GuFRY8EUUPa7Nc387XKqffBOi069kg8cr_a00TZT2nOmFOOvH1ORi4Y5Sf6BenSgL3dfjN-ceHcuzhqQy3_AqX5Y89jpS0XF6yu7IM-33l57f_FU6T-Kmi1WBvGFSYRUi_8fwkUi9vTzzXdJ8PYQKs",
        "refresh_token": "e3YxfWVkMzJmNTU0YjEzYzU3ODY1NTRkZDNkZDdlNWU0MTBkYmQ5ZTY2YzU1ZDZjNGMwMmU4MWUyMzIxZjViMDZhMDA=",
        "token_type": "bearer",
        "expires_in": 3600
    } as TokenInfo;
      const shell = await BootstrapService.constellationInit(serverUrl, token);
      const rootPconnect = await new Promise<PConnect>((resolve, reject) => {
        window.PCore.onPCoreReady((renderObj) =>
          resolve(renderObj.props.getPConnect())
        );
        if (props.portal) {
          shell.loadPortal('pega-incubator', props.portal, []);
        } else {
          shell.loadMashup('pega-incubator', false);
        }
      });

      setContainer(
        await PContainerFactory.create(rootPconnect.getComponentName(), rootPconnect)
      );

      if (props.caseTypeID) {
        await window.PCore.getMashupApi().createCase(props.caseTypeID, 'root', { pageName: 'pyEmbedAssignment', startingFields: {}, });
      } else if (props.pageID && props.className) {
        await window.PCore.getMashupApi().openPage(props.pageID, props.className, 'root');
      } else if (props.assignmentID) {
        await window.PCore.getMashupApi().openAssignment(props.assignmentID, 'root');
      }
    })();
    return null;
  } else {
    return (
      <NavigationContext.Provider value={props.hideNavigation ?? false}>
        <GeneratePContainer container={container} />
      </NavigationContext.Provider>
    );
  }
}

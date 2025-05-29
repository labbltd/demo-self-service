import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'app-root',
  template: `
    @if (token) {
      <dx-pega-entry
        [caseTypeID]="action === 'createCase' ? caseTypeId : undefined"
        [caseID]="action === 'openCase' ? caseId : undefined"
        [pageID]="action === 'openPage' ? pageId : undefined"
        [className]="action === 'openPage' ? pageClass : undefined"
        [infinityServer]="infinityServer"
        [localeID]="localeId"
        [appID]="appId"
        [token]="token"
        (loadingDone)="loadingDone($event)"></dx-pega-entry>
    }
    @if (!token && !authError) { <h3>Taming the chaos...</h3> }
    @if (token && loadingStatus === undefined) { <h3>Leading the change...</h3> }
    @if (authError) { <h1>{{authError}}</h1> }
    @if (loadingStatus === false) { <h1>Error communicating with Pega</h1> }
  `,
  standalone: false
})
export class PegaComponent implements OnInit {
  public title!: string;
  public token!: TokenInfo;
  public authError!: unknown;
  public loadingStatus!: boolean;
  public infinityServer = DemoBootstrap.getServerUrl();
  public action = DemoBootstrap.getAction();
  public pageId = DemoBootstrap.getPageId();
  public pageClass = DemoBootstrap.getPageClass();
  public caseTypeId = DemoBootstrap.getCaseTypeId();
  public caseId = DemoBootstrap.getCaseId();
  public appId = DemoBootstrap.getAppId();
  public localeId = DemoBootstrap.getLocaleId();

  public async ngOnInit() {
    try {
      this.token = await DemoBootstrap.getToken();
    } catch (e) {
      this.authError = e;
    }
  }

  public loadingDone(status: boolean) {
    this.loadingStatus = status;
    this.title = window.PCore.getStore().getState().data["app/primary_1"]
      ?.caseInfo?.caseTypeName;
    const caseID = window.PCore.getStore().getState().data['app/primary_1']?.caseInfo.ID;
    if(caseID) {
      DemoBootstrap.setAction('openCase');
      DemoBootstrap.setCaseId(caseID);
    }
  }
}

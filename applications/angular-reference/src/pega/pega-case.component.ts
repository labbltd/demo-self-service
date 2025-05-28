import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-case',
  template: `
    @if (token) {
      <dx-pega-entry
        [caseTypeID]="action === 'createCase' ? caseTypeId : undefined"
        [pageID]="action === 'openPage' ? pageId : undefined"
        [className]="action === 'openPage' ? pageClass : undefined"
        [infinityServer]="infinityServer"
        [localeID]="localeId"
        [appID]="appId"
        [token]="token"
        (loadingDone)="loadingStatus = $event"></dx-pega-entry>
    }
    @if (!token && !authError) { <h3>Taming the chaos...</h3> }
    @if (token && loadingStatus === undefined) { <h3>Leading the change...</h3> }
    @if (authError) { <h1>{{authError}}</h1> }
    @if (loadingStatus === false) { <h1>Error communicating with Pega</h1> }
  `,
  standalone: false
})
export class PegaCaseComponent implements OnInit {
  public token!: TokenInfo;
  public authError!: unknown;
  public loadingStatus!: boolean;
  public infinityServer = DemoBootstrap.getServerUrl();
  public action = DemoBootstrap.getAction();
  public pageId = DemoBootstrap.getPageId();
  public pageClass = DemoBootstrap.getPageClass();
  public caseTypeId = DemoBootstrap.getCaseTypeId();
  public appId = DemoBootstrap.getAppId();
  public localeId = DemoBootstrap.getLocaleId();

  public async ngOnInit() {
    try {
      this.token = await DemoBootstrap.getToken();
    } catch (e) {
      this.authError = e;
    }
  }
}
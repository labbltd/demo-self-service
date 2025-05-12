import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-case',
  template: `
    @if (token) {
      <dx-pega-entry
        [caseTypeID]="caseTypeId"
        [infinityServer]="infinityServer"
        [localeId]="localeId"
        [appId]="appId"
        [token]="token"
        (loadingDone)="loadingDone = true"></dx-pega-entry>
    }
    @if (!token && !authError) { <h1>Authentication in progress</h1> }
    @if (token && !loadingDone) { <h1>Process is being loaded</h1> }
    @if (authError) { <h1>{{authError}}</h1> }
  `,
  standalone: false
})
export class PegaCaseComponent implements OnInit {
  public token!: TokenInfo;
  public authError!: string;
  public loadingDone!: boolean;
  public infinityServer = DemoBootstrap.getServerUrl();
  public caseTypeId = DemoBootstrap.getCaseTypeId();
  public appId = DemoBootstrap.getAppId();
  public localeId = DemoBootstrap.getLocaleId();

  public async ngOnInit() {
    this.token = await DemoBootstrap.getToken();
  }
}
import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-case',
  template: `
    @if (!loadingDone) {
      <dx-loader></dx-loader>
    }
    @if (token) {
      <dx-pega-entry *ngIf="token"
          [caseTypeID]="caseTypeId"
          [infinityServer]="infinityServer"
          [localeId]="localeId"
          [appId]="appId"
          [token]="token"
          (loadingDone)="loadingDone = true"></dx-pega-entry>
    }
  `,
  standalone: false
})
export class PegaComponent implements OnInit {
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

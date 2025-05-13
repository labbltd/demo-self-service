import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-case',
  template: `
    <citi-header></citi-header>
    <div class="cbolui-cds" style="padding: 50px">
      <dx-pega-entry *ngIf="token"
              [caseTypeID]="action === 'createCase' ? caseTypeId : undefined"
              [pageID]="action === 'openPage' ? pageId : undefined"
              [className]="action === 'openPage' ? pageClass : undefined"
              [infinityServer]="infinityServer"
              [localeId]="localeId"
              [appId]="appId"
              [token]="token"
              (loadingDone)="loadingDone = true"></dx-pega-entry>

      <h1 *ngIf="!token && !authError">Authentication in progress</h1>
      <h1 *ngIf="token && !loadingDone">Process is being loaded</h1>
      <h1 *ngIf="authError">{{authError}}</h1>
    </div>
  `,
  standalone: false
})
export class PegaCaseComponent implements OnInit {
  public token!: TokenInfo;
  public authError!: string;
  public loadingDone!: boolean;
  public infinityServer = DemoBootstrap.getServerUrl();
  public action = DemoBootstrap.getAction();
  public pageId = DemoBootstrap.getPageId();
  public pageClass = DemoBootstrap.getPageClass();
  public caseTypeId = DemoBootstrap.getCaseTypeId();
  public appId = DemoBootstrap.getAppId();
  public localeId = DemoBootstrap.getLocaleId();

  public async ngOnInit() {
    this.token = await DemoBootstrap.getToken();
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-case',
  template: `<dx-page-header-footer>
    <dx-pega-entry *ngIf="token"
              [caseTypeID]="caseTypeId"
              [infinityServer]="infinityServer"
              [localeId]="localeId"
              [appId]="appId"
              [token]="token"
              (loadingDone)="loadingDone = true"></dx-pega-entry>
  </dx-page-header-footer>
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

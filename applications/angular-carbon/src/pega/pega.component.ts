import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';

@Component({
  selector: 'dx-angular-engine',
  template: `
  <div ibmGrid>
    <div ibmRow class="header">
      <ibm-header brand="Labb" name="DX Engine">
        <ibm-hamburger></ibm-hamburger>
      </ibm-header>
    </div>
    <div ibmRow class="sub-heading">
      <div ibmCol [columnNumbers]="{'lg': 8, 'md': 8, 'sm': 8}">
        <h2>Case creation</h2>
      </div>
    </div>
    <dx-pega-entry *ngIf="token"
      [caseTypeID]="caseTypeId"
      [infinityServer]="infinityServer"
      [localeId]="localeId"
      [appId]="appId"
      [token]="token"
      (loadingDone)="loadingDone = true"></dx-pega-entry>
  </div>
  `,
  styles: [
    `.header { margin-bottom: 5rem;}`,
    `.sub-heading { margin-bottom: 1.5rem;}`,
    `h4, .bx--label, .bx--btn { margin-top: 1.5rem;}`
  ],
  encapsulation: ViewEncapsulation.None,
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

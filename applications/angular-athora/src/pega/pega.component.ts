import { Component, OnInit } from '@angular/core';
import { TokenInfo } from '@labb/constellation-core-types';
import { OAuth2Service } from '@labb/dx-engine';

@Component({
  selector: 'dx-case',
  template: `
    <dx-loader *ngIf="loading"></dx-loader>
    <dx-pega-entry *ngIf="token"
      [caseTypeID]="'ATHO-Insurance-Work-LeningBerekenen'"
      [token]="token"
      [infinityServer]="infinityServer"
      (loadingDone)="loading=false"></dx-pega-entry>
  `
})
export class PegaComponent implements OnInit {
  public loading = true;
  public token!: TokenInfo;
  public infinityServer!: string;

  public async ngOnInit(): Promise<void> {
    this.infinityServer = 'https://labbconsulting02.pegalabs.io/prweb';
    this.token = await OAuth2Service.getTokenAuthorizationCode(
      {
        authorizationUrl: '',
        accessTokenUrl: '',
        clientId: '45946986569480875840',
        clientSecret: '17CA02A7E811F063861884214028D54D',
        grantType: 'client_credentials'
      }
    );
  }
}

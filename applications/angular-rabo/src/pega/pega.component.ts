import { Component } from '@angular/core';
import { PCore, State, TokenInfo } from '@pega/constellationjs';
import { AuthenticationService } from '@labb/dx-engine';

declare global {
  interface Window {
    PCore: PCore<State>;
  }
}

@Component({
  selector: 'dx-case',
  templateUrl: './pega.component.html'
})
export class PegaComponent {
  public token!: TokenInfo;
  public infinityServer!: string;

  public constructor() {
    this.infinityServer = 'https://labbconsulting02.pegalabs.io/prweb';
    AuthenticationService.oauthLogin(
      this.infinityServer,
      {
        clientId: '45946986569480875840',
        clientSecret: '17CA02A7E811F063861884214028D54D',
        grantType: 'client_credentials'
      }
    ).then(token => {
      this.token = token;
    });
  }
}

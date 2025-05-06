import { Component, ViewEncapsulation } from '@angular/core';
import { PCore, State, TokenInfo } from '@pega/constellationjs';

declare global {
  interface Window {
    PCore: PCore<State>;
  }
}

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
    <dx-pega-entry caseTypeID="MyCaseTypeID" [token]="token"></dx-pega-entry>
  </div>
  `,
  styles: [
    `.header { margin-bottom: 5rem;}`,
    `.sub-heading { margin-bottom: 1.5rem;}`,
    `h4, .bx--label, .bx--btn { margin-top: 1.5rem;}`
  ],
  encapsulation: ViewEncapsulation.None
})
export class PegaComponent {
  public token = {} as TokenInfo;
}

import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-currency-control',
  template: `
  <dx-input-wrapper
    [label]="container.config.label" 
    [labelEnd]="container.config.helperText"
    [errorMessage]="container.config.validatemessage">
    <dx-input-money
      [value]="container.config.value"
      [hasErrors]="!!container.config.validatemessage"></dx-input-money>
  </dx-input-wrapper>
   `,
  standalone: false
})
export class CurrencyComponent extends PContainerComponent {
}

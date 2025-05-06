import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-radio-buttons-control',
  template: `
    <dx-input-wrapper
        [errorMessage]="container.config.validatemessage | translate:'radiobuttons'">
        <dx-radio-group
            class="sfc-display-inline-block"
            [hasErrors]="!!container.config.validatemessage"
            [value]="container.config.value"
            [label]="container.config.label"
            [options]="container.config.datasource"
            (valueChanged)="changeAndCommit($event)"></dx-radio-group>
    </dx-input-wrapper>
  `,
})
export class RadioButtonsComponent extends PContainerComponent {
  public changeAndCommit(value: string) {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }
}

import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { RadioChange } from 'carbon-components-angular';

@Component({
  selector: 'dx-radio-buttons-control',
  template: `
  <ibm-label
    [invalid]="!!container.config.validatemessage"
    [invalidText]="container.config.validatemessage"
    [helperText]="container.config.helperText">
    {{container.config.label}}
    <ibm-radio-group
      [disabled]="container.config.readOnly"
      (change)="onChange($event)">
      <ibm-radio *ngFor="let option of container.config.datasource"
        [value]="option.key"
        [checked]="container.config.value === option.key">
          {{option.value}}
      </ibm-radio>
    </ibm-radio-group>
  </ibm-label>
  `,
  standalone: false
})
export class RadioButtonsComponent extends PContainerComponent {
  public onChange(val: RadioChange): void {
    this.container.updateFieldValue(val.value);
    this.container.triggerFieldChange(val.value);
  }
}

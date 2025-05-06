import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-date-control',
  template: `<ibm-date-picker
    language="en"
    size="lg"
    [label]="container.config.label"
    [placeholder]="container.config.placeholder || 'mm/dd/yyyy'"
    [disabled]="container.config.readOnly"
    [invalid]="!!container.config.validatemessage"
    [invalidText]="container.config.validatemessage"
    [value]="container.config.value"
    (valueChange)="selected($event)">
  </ibm-date-picker>`,
})
export class DateComponent extends PContainerComponent {
  public selected(val: Date[]) {
    this.container.updateFieldValue(val[0].toISOString().split('T')[0]);
  }
}

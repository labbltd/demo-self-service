import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-checkbox-control',
  template: `
  @if (container.config.readOnly) {
    <dt>{{ container.config.label }}</dt><dd>{{container.config.value ? container.config.trueLabel : container.config.falseLabel ?? '--'}}</dd>
  } @else {
    <ibm-checkbox
        [checked]="container.config.value"
        (checkedChange)="change($event)">
        {{container.config.caption}}
    </ibm-checkbox>
  }
  `,
  standalone: false
})
export class CheckboxComponent extends PContainerComponent {
  public change(value: boolean): void {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }
}

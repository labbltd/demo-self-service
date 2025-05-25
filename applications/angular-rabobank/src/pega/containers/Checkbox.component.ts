import { Component, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-checkbox',
  template: `
  <dx-checkbox-control
    [label]="container.config.caption" 
    [labelEnd]="container.config.helperText"
    [errorMessage]="container.config.validatemessage"
    [checked]="container.config.value">
      <input
        [id]="container.id"
        type="checkbox"
        [attr.readonly]="container.config.readOnly"
        [value]="container.config.value"
        (change)="container.updateFieldValue(getValue($event.target))"
        (blur)="container.triggerFieldChange(getValue($event.target))"
      />
  </dx-checkbox-control>
   `,
  standalone: false
})
export class CheckboxComponent extends PContainerComponent {
  public getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    return t.checked;
  }
}

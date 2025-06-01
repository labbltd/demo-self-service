import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-checkbox',
  template: `
  @if (container.config.readOnly) {
      <dx-input-wrapper
          [label]="container.config.label" 
          [labelEnd]="container.config.helperText"
          [errorMessage]="container.config.validatemessage">
          {{container.config.value ? container.config.trueLabel : container.config.falseLabel}}
      </dx-input-wrapper>
    } @else {
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
            (change)="change($event.target)"
          />
      </dx-checkbox-control>
    }
   `,
  standalone: false
})
export class CheckboxComponent extends PContainerComponent {
  public change(target: EventTarget | null) {
    if (!target) return;
    const val = (target as HTMLInputElement).checked;
    this.container.updateFieldValue(val);
    this.container.triggerFieldChange(val);
  }
}

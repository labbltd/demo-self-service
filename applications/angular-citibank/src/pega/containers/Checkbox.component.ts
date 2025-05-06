import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-text-input-control',
  template: `
    <div>
      <label [for]="container.id">
      <input
        [id]="container.id"
        type="checkbox"
        [attr.readonly]="container.config.readOnly"
        [formControl]="control"
        (change)="container.updateFieldValue(getValue($event.target))"
        (blur)="container.triggerFieldChange(getValue($event.target))"
      />
      {{ label }}{{ container.config.required ? ' *' : '' }}
      </label>
      {{ container.config.helperText }}
      {{ container.config.validatemessage }}
    </div>
   `,
})
export class CheckboxComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');
  public get label(): string {
    return this.container.config.label || this.container.config.caption;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
    this.container.updates.subscribe(() => {
      this.control.setValue(this.container.config.value);
    });
  }

  public getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    return t.checked;
  }
}

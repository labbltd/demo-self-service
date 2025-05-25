import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-text-area-control',
  template: `<label
    >{{ container.config.label }}{{ container.config.required ? ' *' : '' }}
    <textarea
      [formControl]="control"
      (change)="container.updateFieldValue(getValue($event.target))"
      (blur)="container.triggerFieldChange(getValue($event.target))"
    ></textarea>
    {{ container.config.helperText }}
    {{ container.config.validatemessage }}
  </label>`,
  standalone: false
})
export class TextAreaComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
  }

  public getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }
}

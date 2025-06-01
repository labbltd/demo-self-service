import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import { formatters } from '@labb/dx-engine';

@Component({
  selector: 'dx-text-input-control',
  template: `
  @if (container.config.readOnly) {
    <dt>{{ label }}</dt><dd>{{format(container.config.value) ?? '--'}}</dd>
  } @else {
    <ibm-label
        [disabled]="container.config.readOnly"
        [helperText]="container.config.helperText"
        [invalid]="!!container.config.validatemessage"
        [invalidText]="container.config.validatemessage">
        {{container.config.label}}
        <input ibmText
          [type]="type"
          [attr.inputmode]="inputmode"
          [attr.step]="step"
          [formControl]="control"
          (change)="container.updateFieldValue(getValue($event.target))"
          (blur)="container.triggerFieldChange(getValue($event.target))"
          [invalid]="!!container.config.validatemessage"
          [placeholder]="container.config.placeholder ?? ''">
      </ibm-label>
  }
    `,
  standalone: false
})
export class TextInputComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');
  public get label(): string {
    return this.container.config.label || this.container.config.caption;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
    if (this.container.config.readOnly) {
      this.control.disable();
    }
  }

  public format(value: any) {
    if (this.type === 'date') return formatters.Date(value);
    if (this.type === 'datetime-local') return formatters.DateTime(value);
    if (this.type === 'time') return formatters.Time(value);
    if (this.type === 'number' && this.container.config.currencyISOCode) return formatters.Currency(value);
    return value;
  }

  public get type(): string {
    switch (this.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return 'number';
      case 'Integer':
        return 'number';
      case 'True-False':
        return 'checkbox';
      case 'Date Time':
        return 'datetime-local';
      case 'Date':
        return 'date';
      case 'TimeOfDay':
        return 'time';
      case 'Text':
        switch (this.container.config.fieldMetadata?.displayAs) {
          case 'pxEmail':
            return 'email';
          default:
            return 'text';
        }
      default:
        return 'text';
    }
  }

  public get inputmode(): string | null {
    switch (this.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return 'numeric';
      case 'Percentage':
        return 'numeric';
      case 'Integer':
        return 'numeric';
      default:
        return null;
    }
  }

  public get step(): string | null {
    switch (this.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return '0.01';
      case 'Percentage':
        return '0.01';
      case 'Integer':
        return '1';
      default:
        return null;
    }
  }

  public getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (this.type) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate;
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }
}

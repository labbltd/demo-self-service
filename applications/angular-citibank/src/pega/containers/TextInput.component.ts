import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { DefaultProps } from '@labb/constellation-core-types';
import { formatters, PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-text-input-control',
  template: `
    @if(container.config.readOnly) {
      <dt>{{container.config.label}}</dt><dd>{{format(container.config.value) ?? '--'}}</dd>
    } @else {
      <cds-form-field [label]="container.config.label" [for]="container.id"
          [tooltip]="{body: container.config.helperText}"
          [errorMessage]="container.config.validatemessage">
          @if(disabled) {
            {{value}}
          } @else {
            <input cdsInput
              [value]="value"
              [type]="type"
              [name]="container.id"
              (blur)="update($event.target)">
          }
      </cds-form-field>
    }
  `,
  standalone: false
})
export class TextInputComponent extends PContainerComponent<PContainer<DefaultProps>> implements OnInit {
  public format(value: any) {
    if (this.type === 'date') return formatters.Date(value);
    if (this.type === 'datetime-local') return formatters.DateTime(value);
    if (this.type === 'time') return formatters.Time(value);
    if (this.type === 'number' && this.container.config.currencyISOCode) return formatters.Currency(value);
    return value;
  }

  public update(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.container.updateFieldValue(target.value);
      this.container.triggerFieldChange(target.value);
    }
  }

  public get value(): string | number | boolean | null {
    const v = this.container.config.value;
    switch (this.type) {
      case 'number':
        return v;
      case 'date':
        return v?.split('T')[0] || null;
      case 'datetime-local':
        return v?.split('.')[0] || null;
      case 'checkbox':
        return v;
      default:
        return v;
    }
  }

  public get disabled(): boolean {
    return this.container.config.readOnly;
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
        return t.valueAsDate?.toISOString().split('T')[0] || null;
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }
}

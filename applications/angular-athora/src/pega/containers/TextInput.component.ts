import { Component } from '@angular/core';
import { DefaultProps } from '@labb/constellation-core-types';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-text-input-control',
  template: `
  @if (container.config.readOnly) {
    <dt>{{ label }}</dt><dd>{{container.config.value || '--'}}</dd>
  }
  @if (!container.config.readOnly) {
    <div class="dx-control">
      <mat-label>
          {{ container.config.label }}
          <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
        </mat-label>
      <mat-form-field>
        <input matInput [placeholder]="container.config.placeholder" [formControl]="control">
      </mat-form-field>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
        (closed)="helperTextOpen = false"
        [hint]="container.config.helperText"></dx-hint>
    {{ container.config.validatemessage }}
  }
  `,
  standalone: false
})
export class TextInputComponent extends ControlComponent<string, DefaultProps & { caption: string }> {
  public get label(): string {
    return this.container.config.label || this.container.config.caption;
  }

  public updateValue(val: string): void {
    this.container.updateFieldValue(val);
    this.container.triggerFieldChange(val);
  }

  public override toControlValue(val: string): string | null {
    return this.type === 'date' ? val?.split('-').reverse().join('-') : val;
  }

  public override toPegaValue(val: string | null): string {
    return this.type === 'date' ? val?.split('-').reverse().join('-') || '' : val || '';
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

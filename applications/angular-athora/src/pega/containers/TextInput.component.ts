import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { PContainerComponent } from '@labb/angular-adapter';
import { DefaultProps } from '@labb/constellation-core-types';
import { formatters, PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-text-input-control',
  template: `
      @if(container.config.readOnly) {
        <div class="dx-control">
          <mat-label>
            {{ container.config.label }}
          </mat-label>
          {{format(container.config.value)}}
        </div>
      } @else  {
    <div class="dx-control">
      <mat-label>
          {{ container.config.label }}
          <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
        </mat-label>
      <mat-form-field>
        <input matInput 
        [placeholder]="container.config.placeholder"
        [value]="container.config.value"
        [formControl]="formControl"/>
        @if(container.config.validatemessage) { <mat-error>{{container.config.validatemessage}}</mat-error> }
      </mat-form-field>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
        (closed)="helperTextOpen = false"
        [hint]="container.config.helperText"></dx-hint>
  }
  `,
  standalone: false
})
export class TextInputComponent extends PContainerComponent<PContainer<DefaultProps & { caption: string }>> {
  @ViewChild(MatInput) input!: MatInput;
  public formControl = new FormControl();
  public helperTextOpen = false;
  public get label(): string {
    return this.container.config.label || this.container.config.caption;
  }

  ngAfterViewInit(): void {
    this.input?.stateChanges.subscribe(() => {
      this.formControl.markAsDirty();
      this.formControl.markAsTouched();
      const value = this.input.value;
      this.container.updateFieldValue(value);
      this.container.triggerFieldChange(value);
    });
    this.container.updates.subscribe(() => {
      if (this.container.config.validatemessage) {
        this.formControl.setErrors({ required: true });
      }
    })
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
        return t.valueAsDate?.toISOString().split('T')[0] || null;
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }
}

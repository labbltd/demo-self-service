import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-input-control',
  template: `
  <ng-container *ngIf="!container.config.readOnly">
    <div class="dx-control" *ngIf="!container.config.disabled">
      <mat-label class="explanation-label">
        {{ container.config.label }}
        <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
      </mat-label>
      <mat-form-field>
        <input
          matInput
          [name]="container.config.label"
          [placeholder]="container.config.placeholder"
          [type]="type"
          [attr.inputmode]="inputmode"
          [attr.step]="step"
          [formControl]="control"
          (blur)="commitValue($event)"
        />
        <span *ngIf="container.config.currencyISOCode" matTextPrefix>€&nbsp;</span>
        <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage | translate }}</mat-error>
      </mat-form-field>
    </div>
    <mat-card *ngIf="container.config.disabled" appearance="outlined">
      <div class="pension-card-amounts">
        <h4 class="amount__title">{{container.config.label}}</h4>
        <span class="pensionAmount"><span class="pension-amt-bold"> €&nbsp;{{container.config.value | number}} </span><mat-label class="grossLabel">bruto per maand</mat-label></span></div>
    </mat-card>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
      (closed)="helperTextOpen = false"
      [hint]="container.config.helperText"></dx-hint>
      </ng-container>
  `,
  standalone: false
})
export class DxInputComponent extends ControlComponent<string> {
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

  public updateValue(value: string): void {
    this.container.updateFieldValue(value);
  }

  public commitValue(event: FocusEvent): void {
    this.container.triggerFieldChange((event.target as HTMLInputElement).value);
  }

  public override toControlValue(val: string): string | null {
    return val;
  }

  public override toPegaValue(val: string | null): string {
    return val ?? '';
  }
}

import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-date-control',
  template: `
    <div class="dx-control">
      <mat-label>
        {{ container.config.label }}
        <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
      </mat-label>
      <mat-form-field [floatLabel]="'always'">
        <input
          matInput
          [matDatepicker]="picker"
          [formControl]="control"
          (blur)="commitValue($event)"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker">
            <mat-icon matDatepickerToggleIcon>date_range</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker startView="multi-year" [startAt]="startDate"></mat-datepicker>
        <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage | translate}}</mat-error>
      </mat-form-field>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
      (closed)="helperTextOpen = false"
      [hint]="container.config.helperText"></dx-hint>
  `,
  standalone: false
})
export class DxDateComponent extends ControlComponent<Date> {
  public startDate = new Date(`${new Date().getFullYear() - 60}-${new Date().getMonth()}-${new Date().getDate()}`);

  public updateValue(value: Date): void {
    this.container.updateFieldValue(this.toPegaValue(value));
  }

  public commitValue(event: FocusEvent): void {
    const target = event.target as HTMLInputElement;
    if (target && target.valueAsDate) {
      this.container.triggerFieldChange(this.toPegaValue(target.valueAsDate));
    }
  }

  public override toControlValue(val: string): Date | null {
    return new Date(val);
  }

  public override toPegaValue(val: Date | null): string {
    return (val && !isNaN(val.getTime()) && val.toISOString().split('T')[0]) || '';
  }

}

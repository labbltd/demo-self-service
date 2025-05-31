import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { PContainerComponent } from '@labb/angular-adapter';
import { DefaultProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

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
          [value]="container.config.value"
          
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
export class DxDateComponent extends PContainerComponent<PContainer<DefaultProps>> implements AfterViewInit {
  @ViewChild(MatInput) input!: MatInput;
  public startDate = new Date(`${new Date().getFullYear() - 60}-${new Date().getMonth()}-${new Date().getDate()}`);
  public helperTextOpen = false;
  
  ngAfterViewInit(): void {
    this.input.stateChanges.subscribe(() => {
      const value = (this.input.value as unknown as Date).toISOString().split('T')[0];
      this.container.updateFieldValue(value);
      this.container.triggerFieldChange(value);
    })
  }
}

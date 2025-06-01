import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { PContainerComponent } from '@labb/angular-adapter';
import { DefaultProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-date-control',
  template: `
    @if(container.config.readOnly) {
      <div class="dx-control">
        <mat-label>
          {{ container.config.label }}
        </mat-label>
        {{container.config.value}}
      </div>
    } @else  {
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
          [formControl]="formControl"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker">
            <mat-icon matDatepickerToggleIcon>date_range</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker startView="multi-year" [startAt]="startDate"></mat-datepicker>
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
export class DxDateComponent extends PContainerComponent<PContainer<DefaultProps>> implements AfterViewInit {
  @ViewChild(MatInput) input!: MatInput;
  public startDate = new Date(`${new Date().getFullYear() - 60}-${new Date().getMonth()}-${new Date().getDate()}`);
  public helperTextOpen = false;
  public formControl = new FormControl('', { updateOn: 'blur' });

  ngAfterViewInit(): void {
    if(this.container.config.readOnly) return;
    this.input.stateChanges.subscribe(() => {
      this.formControl.markAsTouched();
      this.formControl.markAsDirty();
    });
    this.formControl.valueChanges.subscribe(() => {
      const value = (this.input.value as unknown as Date)?.toISOString().split('T')[0];
      this.container.updateFieldValue(value);
      this.container.triggerFieldChange(value);
    })
    this.container.updates.subscribe(() => {
      if (this.container.config.validatemessage) {
        this.formControl.markAsTouched();
        this.formControl.markAsDirty();
        this.formControl.setErrors({ required: true });
      }
    })
  }
}

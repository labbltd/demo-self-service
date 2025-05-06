import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';
import { PicklistProps } from '@pega/constellationjs';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    <div class="dx-control">
      <mat-label>
        {{ container.config.label }}
        <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
      </mat-label>
      <mat-form-field>
        <mat-select [formControl]="control">
          <mat-option *ngFor="let option of container.config.datasource" [value]="option.key">
            {{option.value}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage}}</mat-error>
      </mat-form-field>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
      (closed)="helperTextOpen = false"
      [hint]="container.config.helperText"></dx-hint>
  `
})
export class DxDropdownComponent extends ControlComponent<string, PicklistProps> {
  public updateValue(val: string): void {
    this.container.updateFieldValue(val);
    this.container.triggerFieldChange(val);
  }

  public override toControlValue(val: string): string | null {
    return val;
  }

  public override toPegaValue(val: string | null): string {
    return val ?? '';
  }
}

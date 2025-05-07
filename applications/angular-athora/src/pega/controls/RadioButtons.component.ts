import { Component } from '@angular/core';
import { PicklistProps } from '@labb/constellation-core-types';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-radio-buttons-control',
  template: `
    <div [ngClass]="{'dx-control': container.config.inline}">
      <mat-label>
        {{ container.config.label }}
        <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
      </mat-label>
      <mat-radio-group [formControl]="control" [ngClass]="{'mat-radio-group-vertical boxed' : !container.config.inline}">
        <mat-radio-button *ngFor="let option of container.config.datasource" 
            [value]="option.key">{{option.value}}</mat-radio-button>
      </mat-radio-group>
      <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage | translate}}</mat-error>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
      (closed)="helperTextOpen = false"
      [hint]="container.config.helperText"></dx-hint>
  `
})
export class DxRadioButtonsComponent extends ControlComponent<string, PicklistProps> {
  public override updateValue(value: string | null): void {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }

  public override toControlValue(val: string): string | null {
    return val;
  }

  public override toPegaValue(val: string | null): string {
    return val ?? '';
  }
}

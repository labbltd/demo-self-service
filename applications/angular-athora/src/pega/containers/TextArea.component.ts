import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-text-area-control',
  template: `
    <mat-label>
      {{ container.config.label }}
    </mat-label>
    <mat-form-field [floatLabel]="'always'">
      <textarea
        matInput
        [formControl]="control"
        (blur)="commitValue($event);"
      ></textarea>
      <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage}}</mat-error>
      <mat-hint *ngIf="container.config.helperText">{{container.config.helperText}}</mat-hint>
    </mat-form-field>
  `,
  host: {
    'class': 'dx-control'
  },
  standalone: false
})
export class TextAreaComponent extends ControlComponent<string> implements OnInit {
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

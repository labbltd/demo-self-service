import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-slide-control',
  template: `
    <mat-slide-toggle [formControl]="control">
        {{ container.config.label }}
    </mat-slide-toggle>
    <mat-hint *ngIf="container.config.helperText">{{container.config.helperText}}</mat-hint>
    <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage}}</mat-error>
  `,
  host: {
    'class': 'dx-control'
  },
  standalone: false
})
export class DxSlideComponent extends ControlComponent<boolean> implements OnInit {
  public updateValue(value: boolean): void {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }

  public override toControlValue(val: string): boolean | null {
    return val === 'true';
  }

  public override toPegaValue(val: boolean | null): string {
    return val ? 'true' : 'false';
  }
}

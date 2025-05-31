import { Component } from '@angular/core';
import { ControlComponent } from '../control.component';

@Component({
  selector: 'dx-checkbox-control',
  template: `
    <mat-checkbox [formControl]="control">
      {{ container.config.caption }}
    </mat-checkbox>
    <mat-error *ngIf="container.config.validatemessage">{{container.config.validatemessage}}</mat-error>
    <br>
    <mat-hint *ngIf="container.config.helperText">{{container.config.helperText}}</mat-hint>
  `,
  standalone: false
})
export class CheckboxComponent extends ControlComponent {
  public async updateValue(value: boolean): Promise<void> {
    await this.container.updateFieldValue(value);
    await this.container.triggerFieldChange(value);
  }

  public override toControlValue(val: boolean): boolean | null {
    return val;
  }

  public override toPegaValue(val: boolean | null): string {
    return !!val as unknown as string;
  }
}

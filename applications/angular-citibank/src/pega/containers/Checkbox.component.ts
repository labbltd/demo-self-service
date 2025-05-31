import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-checkbox-control',
  template: `
      @if (container.config.readOnly) {
        <dt>{{container.config.caption}}</dt><dd>{{container.config.value ? container.config.trueLabel : container.config.falseLabel}}</dd>
      } @else {
        <cds-form-field [errorMessage]="container.config.validatemessage" [tooltip]="container.config.helperText" [label]="container.config.label">
          @if(container.config.readOnly) {
            {{container.config.value ? container.config.trueLabel : container.config.falseLabel}}
          } @else {
            <cds-checkbox [label]="container.config.caption" [for]="container.id">
                <input [id]="container.id" cdsInput type="checkbox" [formControl]="control" (change)="change($event)">
            </cds-checkbox>
          }
        </cds-form-field>
      }
   `,
  standalone: false
})
export class CheckboxComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
    this.container.updates.subscribe(() => {
      this.control.setValue(this.container.config.value);
    });
  }

  public getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    return t.checked;
  }

  public change(event: Event) {
    this.container.updateFieldValue(this.getValue(event.target))
    this.container.triggerFieldChange(this.getValue(event.target))
  }
}

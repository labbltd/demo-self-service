import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-radio-buttons-control',
  template: `
    <h5>{{container.config.label}}</h5>
    <cds-form-field [errorMessage]="container.config.validatemessage">
        <cds-radio-group [direction]="container.config.datasource.length > 2 ? 'column' : 'row'">
            @for (option of container.config.datasource; track option.key) {
              <cds-radio [label]="option.value" [for]="container.id+option.key">
                  <input cdsInput type="radio" [name]="container.id" [id]="container.id+option.key" [value]="option.key" (change)="change(option.key)">
              </cds-radio>
            }
        </cds-radio-group>
    </cds-form-field>
  `,
})
export class RadioButtonsComponent extends PContainerComponent<PContainer<PicklistProps>> {
    public change(value: string) {
      this.container.updateFieldValue(value);
      this.container.triggerFieldChange(value);
    }
}

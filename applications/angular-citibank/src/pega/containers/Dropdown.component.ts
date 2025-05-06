import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    <cds-form-field [label]="container.config.label" [errorMessage]="container.config.validatemessage">
      <cds-dropdown (selected)="update($event)">
          @for (option of container.config.datasource; track option.key) {
            <cds-option [value]="option.value"></cds-option>
          }
      </cds-dropdown>
    </cds-form-field>
  `,
})
export class DropdownComponent extends PContainerComponent<PContainer<PicklistProps>> {
  public update(value: string) {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }
}

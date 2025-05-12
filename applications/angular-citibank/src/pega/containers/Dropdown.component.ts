import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { CdsDropdownService } from '../../design-system/cds-dropdown/cds-dropdown.service';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    <cds-form-field [label]="container.config.label" [errorMessage]="container.config.validatemessage">
      <cds-dropdown (selected)="update($event)">
          @for (option of container.config.datasource; track option.key) {
            <cds-option (click)="submit(option.value)" [value]="option.value"></cds-option>
          }
      </cds-dropdown>
    </cds-form-field>
  `,
  providers: [
    CdsDropdownService
  ],
  standalone: false
})
export class DropdownComponent extends PContainerComponent<PContainer<PicklistProps>> {
  public constructor(private dropdownService: CdsDropdownService) {
    super();
  }

  public submit(value: string) {
    this.dropdownService.submit(value);
  }

  public update(value: string) {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }
}

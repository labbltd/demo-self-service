import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { CdsDropdownService } from '../../design-system/cds-dropdown/cds-dropdown.service';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    <cds-form-field [label]="container.config.label" [errorMessage]="container.config.validatemessage">
      <cds-dropdown (selected)="update($event)" [value]="container.config.value" [disabled]="container.config.readOnly">
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
export class DropdownComponent extends PContainerComponent<PContainer<PicklistProps>> implements OnInit {
  public constructor(private dropdownService: CdsDropdownService) {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    if (this.container.config.value) {
      this.dropdownService.submit(this.container.config.value);
    }
  }

  public submit(value: string) {
    this.dropdownService.submit(value);
  }

  public update(value: string) {
    if (value !== this.container.config.value) {
      this.container.updateFieldValue(value);
      this.container.triggerFieldChange(value);
    }
  }
}

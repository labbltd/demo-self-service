import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    <dx-input-wrapper
        [errorMessage]="container.config.validatemessage | translate:'dropdown'">
        <dx-select
            [value]="container.config.value"
            [hasError]="!!container.config.validatemessage"
            [label]="container.config.label"
            [options]="container.config.datasource"
            (valueChanged)="changeAndCommit($event)"></dx-select>
    </dx-input-wrapper>
  `,
})
export class DropdownComponent extends PContainerComponent {
  public changeAndCommit(value: string) {
    this.container.updateFieldValue(value);
    this.container.triggerFieldChange(value);
  }
}

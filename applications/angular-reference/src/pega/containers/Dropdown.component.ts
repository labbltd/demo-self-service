import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-dropdown-control',
  template: `
  <label>{{ container.config.label }}{{ container.config.required ? ' *' : '' }}
    @if(!container.config.readOnly) {
      <select
        [id]="container.id"
        [formControl]="control"
        (change)="container.updateFieldValue(getValue($event.target))"
        (blur)="container.triggerFieldChange(getValue($event.target))"
      >
        <option disabled selected value="{undefined}">
          -- select an option --
        </option>
        @for (option of container.config.datasource; track option.key) {
          <option [value]="option.key">
            {{ option.value }}
          </option>
        }
      </select>
    } @else {
      <span>{{container.config.value}}</span>
    }
    {{ container.config.helperText }}
    {{ container.config.validatemessage }}
  </label> `,
  standalone: false
})
export class DropdownComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
    this.container.updates.subscribe(() => {
      this.control.setValue(this.container.config.value);
    });
  }

  public getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }
}

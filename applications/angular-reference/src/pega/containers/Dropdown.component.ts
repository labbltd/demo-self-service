import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    @if (container.config.readOnly) {
      <dt>{{ container.config.label }}</dt><dd>{{container.config.value ?? '--'}}</dd>
    } @else {
      <label [for]="container.id">
        {{ container.config.label }}{{ container.config.required ? ' *' : '' }}
        @if (container.config.helperText) {
          <span [attr.data-tooltip]="container.config.helperText">?</span>
        }
      </label>
      @if (container.config.validatemessage) {
        <em>{{ container.config.validatemessage }}</em>
      }
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
    }
    `,
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

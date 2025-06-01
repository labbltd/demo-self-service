import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-text-input-control',
  template: `
    @if(container.config.readOnly) {
        <dt>{{container.config.caption}}</dt><dd>{{container.config.value ? container.config.trueLabel : container.config.falseLabel}}</dd>
    } @else {
      <div>
        <label [for]="container.id">
        <input
          [id]="container.id"
          type="checkbox"
          [attr.readonly]="container.config.readOnly"
          [formControl]="control"
          (change)="change($event)"
        />
        {{ container.config.caption }}{{ container.config.required ? ' *' : '' }}
        </label>
        {{ container.config.helperText }}
        {{ container.config.validatemessage }}
      </div>
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

  public change(event: Event) {
    if (!event.target) return;
    const val = (event.target as HTMLInputElement).checked;
    this.container.updateFieldValue(val);
    this.container.triggerFieldChange(val);
  }
}

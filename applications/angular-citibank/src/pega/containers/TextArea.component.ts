import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-text-area-control',
  template: `
    <cds-form-field [label]="container.config.label" [for]="container.id"
        [tooltip]="{body: container.config.helperText}"
        [errorMessage]="container.config.validatemessage">
        @if(container.config.readOnly) {
          {{container.config.value}}
        } @else {
          <textarea cdsInput
            class="cds-textarea"
            type="textarea"
            [rows]="10"
            [value]="container.config.value"
            [formControl]="control"
            (change)="container.updateFieldValue(getValue($event.target))"
            (blur)="container.triggerFieldChange(getValue($event.target))"></textarea>
        }
    </cds-form-field>
  `,
  standalone: false
})
export class TextAreaComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('');

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
  }

  public get type(): string {
    return this.container.config.fieldMetadata?.type === 'Decimal'
      ? 'number'
      : 'text';
  }

  public getValue(target: EventTarget | null): string | number {
    return this.type === 'number'
      ? (target as HTMLInputElement).valueAsNumber
      : (target as HTMLInputElement).value;
  }
}

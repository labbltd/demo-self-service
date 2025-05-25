import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-checkbox-control',
  template: `
    <ibm-checkbox
        [value]="container.config.value"
        (change)="change(null, $event)">
        {{container.config.caption}}
    </ibm-checkbox>
  `,
  standalone: false
})
export class CheckboxComponent extends PContainerComponent {
  public change(e: any, t: Event): void {
    this.container.updateFieldValue((t as any).checked);
    this.container.triggerFieldChange((t as any).checked);
  }
}

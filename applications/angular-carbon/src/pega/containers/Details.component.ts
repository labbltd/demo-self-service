import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-details-container',
  template: `
    <div class="bx--label">{{label}}</div>
  `,
})
export class DetailsComponent extends PContainerComponent {
  public get label(): string {
    return this.container.config.inheritedProps.find((conf: {prop: string, value: string}) => conf.prop === 'label')?.value;
  }
}

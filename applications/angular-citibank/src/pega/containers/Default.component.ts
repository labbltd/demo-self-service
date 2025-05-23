import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-container',
  template: `
    <ng-container *ngFor="let child of container.children">
      <ng-template dxContainer [container]="child"></ng-template>
    </ng-container>
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent {

}

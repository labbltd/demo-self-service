import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-container',
  template: `
    @for(child of container.children; track child.id) {
      <ng-container dxContainer [container]="child"/>
    }
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent {

}

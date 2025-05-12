import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-case-view',
  template: `
    @for (child of container.children; track child.id) {
      <ng-container dxContainer [container]="child"/>
    }
  `,
  standalone: false
})
export class CaseViewComponent extends PContainerComponent { }

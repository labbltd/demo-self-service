import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-details-container',
  template: `
    @for(child of container.children; track child.id) {
      <ng-container dxContainer [container]="child"/>
    }
  `,
  standalone: false
})
export class DetailsComponent extends PContainerComponent implements OnInit {
}

import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-group-container',
  template: `
      <h1 *ngIf="container.config.heading">{{container.config.heading}}</h1>
      <div *ngIf="container.config.instructions" [innerHtml]="container.config.instructions | translate"></div>
      <form class="dip-ext-grid-form">
        @for(child of container.children; track child.id) {
          <ng-container dxContainer [container]="child"/>
        }
      </form>
  `,
  standalone: false
})
export class GroupComponent extends PContainerComponent {
}

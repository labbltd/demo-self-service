import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-container',
  template: `
    <mat-card-title *ngIf="container.config.heading"><h1>{{container.config.heading}}</h1></mat-card-title>
    <div *ngIf="container.config.instructions" [innerHtml]="container.config.instructions | translate"></div>
    @for(child of container.children; track child.id) {
      <ng-container dxContainer [container]="child"/>
    }
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent {
}

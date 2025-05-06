import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-one-column-template',
  template: `
    <ng-template
      *ngIf="container.view"
      dxContainer
      [container]="container.view"
    ></ng-template>
    <ng-template
      *ngFor="let child of container.children"
      dxContainer
      [container]="child"
    ></ng-template>
  `,
})
export class OneColumnComponent extends PContainerComponent {}

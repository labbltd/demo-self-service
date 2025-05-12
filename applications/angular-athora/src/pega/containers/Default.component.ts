import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-default-container',
  template: `
    <mat-card-title *ngIf="container.config.heading"><h1>{{container.config.heading}}</h1></mat-card-title>
    <div *ngIf="container.config.instructions" [innerHtml]="container.config.instructions | translate"></div>
    <ng-container *ngFor="let child of container.children; trackBy: trackByFn">
      <ng-template dxContainer [container]="child"></ng-template>
    </ng-container>
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent {
  public trackByFn(index: number, item: PContainer): string {
    return item.componentName + '_' + item.id;
  }
}

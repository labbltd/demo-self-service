import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-default-container',
  template: `
    <ng-container *ngFor="let child of container.children; trackBy: trackByFn">
      <ng-template dxContainer [container]="child"></ng-template>
    </ng-container>
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent implements OnInit {
  public trackByFn(index: number, item: PContainer): string {
    return item.componentName + '_' + item.id;
  }
}

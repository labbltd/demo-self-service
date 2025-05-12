import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-default-container',
  template: `
    @if (container.children.length > 0) {
      <ng-container *ngFor="let child of container.children; trackBy: trackByFn">
        <ng-template dxContainer [container]="child"></ng-template>
      </ng-container>
    } @else {
      <div class="card" appearance="outlined">
        <h2>Het formulier wordt geladen!</h2>
        <strong>Nog een ogenblik geduld.</strong>
      </div>
    }
  `,
  standalone: false
})
export class ViewContainerComponent extends PContainerComponent {
  public trackByFn(index: number, item: PContainer): string {
    return item.componentName + '_' + item.id;
  }
}

import { Component } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { View } from "@labb/dx-engine";

@Component({
    selector: 'dx-view-container',
    template: `
      <ng-container *ngFor="let child of container.children">
        <ng-template dxContainer [container]="child"></ng-template>
      </ng-container>
    `
})
export class ViewComponent extends PContainerComponent<View> {
}
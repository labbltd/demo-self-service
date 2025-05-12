import { Component } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { View } from "@labb/dx-engine";

@Component({
  selector: 'dx-view-container',
  template: `
      @for (child of container.children; track child.id) {
        <ng-template dxContainer [container]="child"></ng-template>
      }
  `,
  standalone: false
})
export class ViewComponent extends PContainerComponent<View> {
}
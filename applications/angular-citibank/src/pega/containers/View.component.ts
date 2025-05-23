import { Component } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { View } from "@labb/dx-engine";

@Component({
    selector: 'dx-view-container',
    template: `
      <div [ngClass]="{group: container.pconnect.getComponentName().startsWith('Group'), readOnly: container.config.readOnly}">
        @if (!container.pconnect.getComponentName().startsWith('reference')) {
          <div *ngFor="let message of container.config.httpMessages">
            {{message.type}}: {{message.message}}
          </div>
          <h4 *ngIf="container.config.showHeading">{{container.config.heading}}</h4>
          <h4 *ngIf="container.config.showLabel">{{container.config.label}}</h4>
          <div *ngIf="container.config.instructions && container.config.instructions !== 'none'" [innerHtml]="container.config.instructions"></div>
        }
        <div class="body">
            @for(child of container.children; track child.id) {
              <ng-container dxContainer [container]="child"/>
            }
        </div>
      </div>
    `,
    standalone: false
})
export class ViewComponent extends PContainerComponent<View> {
}
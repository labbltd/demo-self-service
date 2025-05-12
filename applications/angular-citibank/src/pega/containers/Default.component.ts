import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { PContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-default-container',
  template: `
    <div [ngClass]="{group: container.componentName.startsWith('Group'), readOnly: container.config.readOnly}">
      @if (!container.componentName.startsWith('reference')) {
        <div *ngFor="let message of container.config.httpMessages">
          {{message.type}}: {{message.message}}
        </div>
        <h2 *ngIf="container.config.showHeading">{{container.config.heading}}</h2>
        <h4 *ngIf="container.config.showLabel">{{container.config.label}}</h4>
        <div *ngIf="container.config.instructions && container.config.instructions !== 'none'" [innerHtml]="container.config.instructions"></div>
      }
      <div class="body">
        <ng-container *ngFor="let child of container.children; trackBy: trackByFn">
          <ng-template dxContainer [container]="child"></ng-template>
        </ng-container>
      </div>
    </div>
  `,
  standalone: false
})
export class DefaultComponent extends PContainerComponent {
  public trackByFn(index: number, item: PContainer): string {
    return item.componentName + '_' + item.id;
  }
}

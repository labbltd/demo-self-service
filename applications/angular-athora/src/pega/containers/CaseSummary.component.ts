import { Component, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-case-summary',
  template: `
    <button role="button" (click)="showSummary = !showSummary">
      <h3>
        <span>Show Case Details</span>
      </h3>
    </button>
    @if (showSummary) {
      <div role="region">
        <div>
          @for (child of container.children; track child.id) {
            <ng-container dxContainer [container]="child"/>
          }
        </div>
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CaseSummaryComponent extends PContainerComponent {
  showSummary = false;
}

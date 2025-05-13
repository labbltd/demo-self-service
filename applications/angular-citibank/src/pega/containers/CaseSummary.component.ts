import { Component, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-case-summary',
  template: `
    <citi-simple-layout>
      <div class="matlist-section">
        <button role="button" (click)="showSummary = !showSummary" 
          class="btn accordion-trigger"
          [ngClass]="{
            contentExpanded: showSummary,
            contentCollapsed: !showSummary
          }" 
          aria-expanded="false" id="accordion-0" style="outline: none;">
          <h3 class="category-title">
            <span>Show Case Details</span>
          </h3>
        </button>
        @if (showSummary) {
          <div role="region" class="category-content content" id="section-0" aria-labelledby="accordion-0">
            <div>
              @for (child of container.children; track child.id) {
                <ng-container dxContainer [container]="child"/>
              }
            </div>
          </div>
        }
      </div>
    </citi-simple-layout>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './CaseSummary.component.css',
  standalone: false
})
export class CaseSummaryComponent extends PContainerComponent {
  showSummary = false;
}

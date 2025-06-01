import { Component, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { BootstrapService } from '@labb/dx-engine';

@Component({
  selector: 'dx-case-summary',
  template: `
    <a (click)="backToWorklist()" class="breadcrumb-link">< Back to worklist</a><br>
    <a (click)="showSummary = !showSummary" class="breadcrumb-link">
        {{showSummary ? 'Hide' : 'Show'}} Case Details
    </a>
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
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 15px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CaseSummaryComponent extends PContainerComponent {
  showSummary = false;

  public async backToWorklist() {
    await BootstrapService.openPage('pyWorklist', 'Data-Portal', 'app');
  }
}

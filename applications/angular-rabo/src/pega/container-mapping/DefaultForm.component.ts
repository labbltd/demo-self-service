import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-form-template',
  template: `
    <div class="sfc-margin-block-start-300">
      <h2 *ngIf="container.config.label && container.config.showLabel" class="sfc-heading-2">{{container.config.label}}</h2>
      <div *ngIf="container.config.instructions && container.config.instructions !== 'none'" [innerHtml]="container.config.instructions"></div>
      <div [ngClass]="{'sfc-margin-block-start-200': container.config.instructions && container.config.instructions !== 'none'}">
        <div [ngClass]="divClass">
          <ng-template
              *ngIf="container.view"
              dxContainer
              [container]="container.view"
            ></ng-template>
            <ng-template
              *ngFor="let child of container.children"
              dxContainer
              [container]="child"
            ></ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .one-column > *  {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: calc(1rem);
      }
      .two-column > * {
        display: block;
      }
      .two-column > * > * {
        display: block;
        padding-right: 12px;
        padding-left: 12px;
      }
      .three-column > * {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: calc(1rem);
      }
      @media (min-width: 768px) {
        .two-column > * {
          display: flex;
        }
        .two-column > * > * {
            flex: 0 0 50%;
            max-width: 50%;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None
})
export class DefaultFormComponent
  extends PContainerComponent
  implements OnInit {
  public divClass = 'one-column';

  public ngOnInit(): void {
    switch (this.container.config.NumCols ? this.container.config.NumCols : '1') {
      case '1':
        this.divClass = 'one-column';
        break;
      case '2':
        this.divClass = 'two-column';
        break;
      case '3':
        this.divClass = 'three-column';
        break;
      default:
        this.divClass = 'one-column';
        break;
    }
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-form-template',
  template: `
    <div class="sfc-margin-block-start-300">
      <div [ngClass]="{'sfc-margin-block-start-200': container.config.instructions && container.config.instructions !== 'none'}">
        <div [ngClass]="divClass">
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
      .one-column {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: calc(1rem);
      }
      .two-column {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: calc(1rem);
      }
      .three-column {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: calc(1rem);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class DefaultFormComponent
  extends PContainerComponent
  implements OnInit {
  public divClass = 'one-column';

  public override ngOnInit(): void {
    super.ngOnInit();
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

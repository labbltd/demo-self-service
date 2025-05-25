import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-default-container',
  template: `
    @if (container.children.length > 0) {
      @for(child of container.children; track child.id) {
        <ng-container dxContainer [container]="child"/>
      }
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
}

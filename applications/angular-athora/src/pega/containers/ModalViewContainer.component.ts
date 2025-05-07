import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-modal-view-container',
  template: `
    <ng-template *ngIf="false">
      <h2>
        New {{ container.pconnect.getCaseInfo().getName() }} ({{
          container.pconnect.getCaseInfo().getID()
        }})
      </h2>
      <ng-template
        *ngFor="let child of container.children"
        dxContainer
        [container]="child"
      ></ng-template>
    </ng-template>
  `,
})
export class ModalViewContainerComponent extends PContainerComponent {}

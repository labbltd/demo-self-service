import { Component, OnDestroy, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-flow-container',
  template: `
    <citi-simple-layout *ngIf="container.hasAssignment()" [steps]="steps">
      <div *ngFor="let message of container.config.pageMessages">
        {{message.type}}: {{message.message}}
      </div>

      <ng-template
        *ngFor="let child of container.children"
        dxContainer
        [container]="child"
      ></ng-template>

      <div *ngIf="container.actionButtons" 
        class="col-xs-12 btnAllignment">
        <button
        *ngFor="let button of container.actionButtons.secondary"
          [disabled]="loading"
          cdsButton="secondary"
          size="large"
          (click)="buttonClick(button)">
          {{ button.name }}
        </button>
        <button
          *ngFor="let button of container.actionButtons.main"
          [disabled]="loading"
          cdsButton="primary"
          size="large"
          (click)="buttonClick(button)">
          {{ button.name }}
        </button>
      </div>
      <div>{{ errorMessage }}</div>
    </citi-simple-layout>
  `
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> {
  public errorMessage?: string;
  public loading = false;


  public get steps() {
    return this.container.navigation?.steps.map(step => ({
      name: step.name,
      active: step.visited_status === 'current'
    }))
  }

  public async buttonClick(button: ActionButton): Promise<void> {
    try {
      delete this.errorMessage;
      this.loading = true;
      await this.container.buttonClick(button);
    } catch (e) {
      const error = e as { message: string; type: string };
      this.errorMessage = error?.message || error?.type || 'Error';
    }
    this.loading = false;
  }

  public openAssignment(assignment: Assignment) {
    this.container.openAssignment(assignment);
  }
}

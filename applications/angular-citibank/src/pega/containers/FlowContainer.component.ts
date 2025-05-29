import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-flow-container',
  template: `
    @for (message of container.config.caseMessages; track message) {
        <div>
          {{message}}
        </div>
    }
    @if (!container.hasAssignment()) {
          @for(assignment of todoAssignments; track assignment.ID) {
            <div>
              <div>{{assignment.processName}} > {{assignment.name}}</div>
              <div>Assigned to {{assignment.assigneeInfo?.name}}</div>
              <button type="button" (click)="openAssignment(assignment)">Go</button>
            </div>
          }
          @if (todoAssignments.length === 0) {
            <p>Thank you for your request. We will contact you as soon as possible.</p>
          }
    } @else {
      <citi-simple-layout [steps]="steps">
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
    }
  `,
  standalone: false
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> {
  public todoAssignments: Assignment[] = [];
  public errorMessage?: string;
  public loading = false;


  public get steps() {
    return this.container.navigation?.steps.map(step => ({
      name: step.name,
      active: step.visited_status === 'current'
    }))
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.updateAssignments();
    this.container.updates.subscribe(() => {
      this.updateAssignments();
    });
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

  private updateAssignments(): void {
    this.todoAssignments = this.container.getTodoAssignments();
  }
}

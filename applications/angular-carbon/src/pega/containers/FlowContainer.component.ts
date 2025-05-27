import { Component, OnInit } from '@angular/core';
import { ActionButton, ActionButtons, Assignment } from '@labb/constellation-core-types';
import { PContainerComponent } from '@labb/angular-adapter';
import { FlowContainer } from '@labb/dx-engine';

import { Step } from 'carbon-components-angular';

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
    } @else {
      <div ibmRow>
        <div ibmCol [columnNumbers]="leftColumn">
            <ibm-progress-indicator [orientation]="navigationOrientation"
              [steps]="steps" [current]="currentStep"> </ibm-progress-indicator>
        </div>
        <div ibmCol [columnNumbers]="rightColumn">
          <div ibmGrid>
            <div class="cds--stack-vertical cds--stack-scale-4">
              <div ibmRow>
                <h4>{{ title }}</h4>
              </div>
              
              <div ibmRow>
                <ng-template *ngFor="let child of container.children"
                  dxContainer [container]="child"></ng-template>
              </div>

              <div ibmRow *ngIf="buttons">
                <button ibmButton="secondary"
                  *ngFor="let button of buttons.secondary"
                  (click)="buttonClick(button)">
                  {{ button.name }}
                </button>
                <button ibmButton="primary"
                  *ngFor="let button of buttons.main"
                  (click)="buttonClick(button)">
                  {{ button.name }}
                </button>
              </div>
            </div>
            <ibm-toast *ngIf="errorMessage" [notificationObj]="{
                type: 'error',
                title: 'Error',
                subtitle: 'something went wrong',
                caption: errorMessage,
                showClose: true}"></ibm-toast>
          </div> 
        </div>
      </div>
        }
  `,
  standalone: false
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> implements OnInit {
  public errorMessage!: string;
  public todoAssignments: Assignment[] = [];
  public loading = false;

  public get title(): string {
    return this.container.getActiveViewLabel() || this.container.getAssignmentName();
  }

  public get steps(): Step[] {
    return this.container.navigation?.steps?.map(step => ({
      text: step.name,
      state: [],
      label: step.ID
    })) ?? [];
  }

  public get currentStep(): number {
    return this.container.navigation?.steps?.findIndex(step => step.visited_status === 'current') ?? 0;
  }

  public get navigationOrientation(): 'horizontal' | 'vertical' {
    return this.container.navigation?.template === 'Vertical' ? 'vertical' : 'horizontal';
  }

  public get leftColumn() {
    return this.navigationOrientation === 'vertical' ? {'lg': 2, 'md': 2, 'sm': 2} : {'lg': 10, 'md': 10, 'sm': 10};
  }

  public get rightColumn() {
    return this.navigationOrientation === 'vertical' ? {'lg': 6, 'md': 6, 'sm': 6} : {'lg': 10, 'md': 10, 'sm': 10};
  }

  public get buttons(): ActionButtons {
    return this.container.actionButtons;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.updateAssignments();
    this.container.updates.subscribe(() => {
      this.updateAssignments();
    });
  }

  public openAssignment(assignment: Assignment) {
    this.container.openAssignment(assignment);
  }

  private updateAssignments(): void {
    this.todoAssignments = this.container.getTodoAssignments();
  }

  public buttonClick(button: ActionButton): void {
    try {
      this.container.buttonClick(button)
    } catch (e) {
      this.handleActionError(e as Error);
    }
  }

  public handleActionError(e: Error) {
    console.error(e);
    this.errorMessage = e.message || 'Error';
  }
}

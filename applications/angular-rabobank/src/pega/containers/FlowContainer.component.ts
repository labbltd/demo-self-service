import { Component, OnInit } from '@angular/core';
import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { PContainerComponent } from '@labb/angular-adapter';
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
            <div class="card" appearance="outlined">
              <h2>Uw gegevens zijn goed ontvangen!</h2>
              <strong>Wij nemen zo spoedig mogelijk contact met u op.</strong>
            </div>
          }
    } @else {
        <ng-container *ngIf="container.hasAssignment()">
          <h1 class="sfc-heading-1">
            {{ container.getActiveViewLabel() || container.getAssignmentName() }}
          </h1>
          <div class="sfc-row">
            <ng-template
              *ngFor="let child of container.children"
              dxContainer
              [container]="child"
            ></ng-template>
          </div>
          <div class="sfc-margin-block-start-150" *ngIf="container.actionButtons">
            <dx-button
              *ngFor="let button of container.actionButtons.secondary"
              class="sfc-margin-block-end-75 sfc-display-inline-block sfc-margin-inline-end-50"
              type="secondary"
              [loading]="loading === button"
              (click)="buttonClick(button)"
            >
              {{ button.name | translate}}
            </dx-button>
            <dx-button
              *ngFor="let button of container.actionButtons.main"
              class="sfc-margin-block-end-75 sfc-display-inline-block sfc-margin-inline-end-50"
              type="primary"
              [loading]="loading === button"
              (click)="buttonClick(button)"
            >
              {{ button.name | translate}}
            </dx-button>
          </div>
        </ng-container>
    }
  <div>{{ errorMessage | translate}}</div>
  `,
  styles: [],
  standalone: false
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> implements OnInit {
  public todoAssignments: Assignment[] = [];
  public errorMessage!: string;
  public loading: ActionButton | null = null;

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

  public handleActionError(e: Error) {
    console.error(e);
    this.errorMessage = e.message || 'Error';
  }

  public buttonClick(button: ActionButton) {
    this.errorMessage = '';
    if (this.loading) return;
    this.loading = button;
    const action = this.container.buttonClick(button);
    action.finally(() => {
      this.loading = null;
    })
    action.catch((e) => this.handleActionError(e));
  }
}

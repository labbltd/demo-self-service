import { Component, OnDestroy, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';

@Component({
  selector: 'dx-flow-container',
  template: `
    <form>
      @if (!container.hasAssignment()) {
          @for(assignment of todoAssignments; track assignment.ID) {
            <div>
              <div>{{assignment.processName}} > {{assignment.name}}</div>
              <div>Assigned to {{assignment.assigneeInfo?.name}}</div>
              <button type="button" (click)="openAssignment(assignment)">Go</button>
            </div>
          }
      } @else {
        <h2>
          {{ container.getActiveViewLabel() || container.getAssignmentName() }}
        </h2>
        @if (container.navigation) {
          <nav>
            <ol>
              @for (step of container.navigation.steps; track step.ID) {
                <li>{{step.name}} [{{step.visited_status}}]</li>
              }
            </ol>
          </nav>
        }
        @for (message of container.config.pageMessages; track message.message) {
          <div>
            {{message.type}}: {{message.message}}
          </div>
        }
        <fieldset>
          @for (child of container.children; track child.id) {
            <ng-container dxContainer [container]="child"/>
          }
        </fieldset>
        @if (container.actionButtons) {
          @for (button of container.actionButtons.secondary; track button.actionID) {
            <button
              type="button"
              [disabled]="loading"
              (click)="buttonClick(button)">
              {{ button.name }}
            </button>
          }
          @for (button of container.actionButtons.main; track button.actionID) {
            <button
              type="button"
              [disabled]="loading"
              (click)="buttonClick(button)">
              {{ button.name }}
            </button>
          }
        }
        <div>{{ errorMessage }}</div>
      }
    </form>
  `,
  standalone: false
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> implements OnInit, OnDestroy {
  public todoAssignments: Assignment[] = [];

  public override ngOnInit(): void {
    super.ngOnInit();
    this.updateAssignments();
    this.container.updates.subscribe(() => {
      this.updateAssignments();
    });
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public errorMessage?: string;
  public loading = false;

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
    if (this.todoAssignments.length === 1 && !this.container.hasAssignment()) {
      this.container.openAssignment(this.todoAssignments[0]);
    }
  }
}

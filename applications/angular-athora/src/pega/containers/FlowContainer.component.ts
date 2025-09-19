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
              <button mat-flat-button
              color="primary"
              type="button" (click)="openAssignment(assignment)">Go</button>
            </div>
          }
          @if(todoAssignments.length === 0) {
            <div>
              <div class="sidepage-container">
                <mat-card appearance="outlined" *ngIf="!container.hasAssignment()">
                <h2>Uw gegevens zijn goed ontvangen!</h2>
                <strong>Wij nemen zo spoedig mogelijk contact met u op.</strong>
                </mat-card>
                <mat-card appearance="outlined" *ngIf="container.hasAssignment()">
                  <h2>Vast Pensioen</h2>
                  <mat-list compact>
                    <mat-list-item><a target="_blank" href="https:///www.zwitserleven.nl/siteassets/documenten/vergelijkingskaart/vermogen-opbouwen.pdf">Vergelijkingskaart</a></mat-list-item>
                    <mat-list-item><a target="_blank" href="https://www.zwitserleven.nl/siteassets/documenten/voorwaarden/2514N-algemene-voorwaarden-direct-ingaand-pensioen.pdf"> Voorwaarden </a></mat-list-item>
                  </mat-list>
                </mat-card>
                <mat-card appearance="outlined">
                  <h2>Nog vragen?</h2>
                  Stel ze aan uw adviseur of bel ons:<br><a href="tel:0205783160">020 578 31 60</a> (werkdagen 8:30 - 17:00&nbsp;uur)
                </mat-card>
                <mat-card appearance="outlined">
                  <h2>Waarom Zwitserleven?</h2>
                  <mat-list compact>
                      <mat-list-item><span class="check"></span>Bereken in 2 minuten uw pensioen</mat-list-item>
                      <mat-list-item><span class="check"></span>Aanvragen in 7 eenvoudige stappen</mat-list-item>
                      <mat-list-item><span class="check"></span>Aantrekkelijk pensioen dat past bij uw situatie</mat-list-item>
                  </mat-list>
                </mat-card>
              </div>
            </div>
          }
      } @else {
      <mat-stepper labelPosition="bottom" [selectedIndex]="selectedIndex" *ngIf="container.navigation?.steps && (container.navigation?.steps?.length || 0) > 1">
        <mat-step *ngFor="let step of container.navigation?.steps"
          [completed]="step.visited_status === 'success'">
          <ng-template matStepLabel>{{step.name}}</ng-template>
        </mat-step>
      </mat-stepper>
      <dx-loader *ngIf="loading"></dx-loader>
      <div class="dip-ext-container">
        <mat-card *ngIf="container.hasAssignment()" appearance="outlined" class="transparent">
          <ng-template
            *ngFor="let child of container.children"
            dxContainer
            [container]="child"
          ></ng-template>
          <div class="stepper-nav" *ngIf="container.actionButtons">
            <button mat-button type="button"
              *ngFor="let button of container.actionButtons.secondary"
              [ngClass]="{'button--prev' : button.name === 'Previous'}"
              (click)="buttonClick(button)"
            >
              {{ button.name }}
            </button>
            <button
              mat-flat-button
              color="primary"
              type="button"
              class="button--next"
              *ngFor="let button of container.actionButtons.main"
              (click)="buttonClick(button)"
            >
              {{ button.name }}
            </button>
          </div>
        </mat-card>
      </div>
    }
    <div>{{ errorMessage }}</div>
  `,
  standalone: false
})
export class FlowContainerComponent extends PContainerComponent<FlowContainer> implements OnInit {
  public selectedIndex = 0;
  public todoAssignments: Assignment[] = [];
  public errorMessage?: string;
  public loading = false;

  public override ngOnInit(): void {
    super.ngOnInit();
    const subTitle = document.querySelector('*[data-testid="subtitle"]');
    if (subTitle) {
      subTitle.innerHTML = this.container.getAssignmentName();
      this.container.updates.subscribe(() => {
        subTitle.innerHTML = this.container.getAssignmentName();
      });
    }
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

  private setSelectedIndex(): void {
    this.selectedIndex = this.container.navigation?.steps.findIndex(step => step.visited_status === 'current') || 0;
  }

  public buttonClick(button: ActionButton): void {
    this.errorMessage = '';
    this.loading = true;
    this.container.buttonClick(button)
      .then(() => {
        if (button.jsAction === 'finishAssignment') {
          window.scrollTo({ top: 0 });
        }
        this.setSelectedIndex();
        this.loading = false;
      })
      .catch(e => {
        this.handleActionError(e);
        this.setSelectedIndex();
        this.loading = false;
      })
  }

  private handleActionError(e: Error) {
    console.error(e);
    this.errorMessage = e.message || 'Error';
  }
}

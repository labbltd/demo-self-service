import {
  Button, Column, Grid, ProgressIndicator,
  ProgressStep, Row, Stack, Tile,
  ToastNotification
} from '@carbon/react';
import { Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [todoAssignments, setTodoAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    updateAssignments();
    props.container.updates.subscribe(() => {
      updateAssignments();
    });
  }, []);

  function openAssignment(assignment: Assignment) {
    props.container.openAssignment(assignment);
  }

  function updateAssignments(): void {
    setTodoAssignments(props.container.getTodoAssignments());
  }

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  function currentStep(): number {
    return props.container.navigation?.steps?.findIndex(step => step.visited_status === 'current') ?? 0;
  }

  function isVertical(): boolean {
    return props.container.navigation?.template === 'Vertical';
  }

  function colCount(): number {
    return 10
  }

  return <>
    {props.container.config.caseMessages?.map(message =>
      <div key={message}>
        {message}
      </div>
    )}
    {!props.container.hasAssignment() && <>
      {todoAssignments.map(assignment =>
        <div key={assignment.ID}>
          <div>{assignment.processName} {'>'} {assignment.name}</div>
          <div>Assigned to {assignment.assigneeInfo?.name}</div>
          <button type="button" onClick={() => openAssignment(assignment)}>Go</button>
        </div>
      )}
      {todoAssignments.length === 0 && <p>Thank you for your request. We will contact you as soon as possible.</p>}
    </>}
    {props.container.hasAssignment() && <Grid>
      <Column sm={isVertical() ? 2 : 4} md={isVertical() ? 2 : 8} lg={isVertical() ? 4 : 16}>
        <ProgressIndicator currentIndex={currentStep()} vertical={isVertical()}>
          {props.container.navigation?.steps.map((step, i) => (
            <ProgressStep
              key={step.ID}
              label={step.name}
            />
          ))}
        </ProgressIndicator>
      </Column>
      <Column sm={isVertical() ? 2 : 4} md={isVertical() ? 6 : 8} lg={isVertical() ? 12 : 16}>
        <Stack gap={4}>
          <Row>
            <h4>
              {props.container.getActiveViewLabel() ||
                props.container.getAssignmentName()}
            </h4>
          </Row>
          <Row>
            {props.container.children.map((child) => (
              <GeneratePContainer key={child.id} container={child} />
            ))}
          </Row>
          {props.container.actionButtons && (
            <Row>
              {props.container.actionButtons.secondary.map((button, idx) => (
                <Button
                  key={`secondary_${idx}`}
                  kind="secondary"
                  onClick={() =>
                    props.container.buttonClick(button).catch(handleActionError)
                  }
                >
                  {button.name}
                </Button>
              ))}
              {props.container.actionButtons.main.map((button, idx) => (
                <Button
                  key={`main_${idx}`}
                  onClick={() =>
                    props.container.buttonClick(button).catch(handleActionError)
                  }
                >
                  {button.name}
                </Button>
              ))}
            </Row>
          )}
        </Stack>
      </Column>
    </Grid>}
    {errorMessage && <ToastNotification
      role="status"
      title="Error"
      timeout={1000}
      caption={errorMessage} />}
  </>
}

import { Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import HsbcButton from 'applications/react-hsbc/design-system/hsbc-button';
import HsbcButtonGroup from 'applications/react-hsbc/design-system/hsbc-button-group';
import HsbcContainer from 'applications/react-hsbc/design-system/hsbc-container';
import HsbcProgressBar from 'applications/react-hsbc/design-system/hsbc-progress-bar';
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
    setErrorMessage(e?.message || 'Error');
  }

  return <>
    {<HsbcContainer>
      {props.container.config.caseMessages?.map(message => <div key={message}>{message}</div>)}
    </HsbcContainer>}
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
    {props.container.hasAssignment() && <>
      <HsbcContainer>
        <HsbcProgressBar
          name={
            window.PCore.getStore().getState().data[props.container.pconnect.getContextName()].caseInfo.stageLabel
          }
          currentStep={props.container.navigation?.steps.findIndex(step => step.visited_status === 'current')}
          totalSteps={props.container.navigation?.steps.length} />
      </HsbcContainer>
      <HsbcContainer title={props.container.getActiveViewLabel() ||
        props.container.getAssignmentName()}>
        {props.container.children.map((child) => (
          <GeneratePContainer key={child.id} container={child} />
        ))}
      </HsbcContainer>
      {
        props.container.actionButtons && (
          <HsbcContainer>
            <HsbcButtonGroup>
              <>
                {props.container.actionButtons.main.map((button) => (
                  <HsbcButton type="primary"
                    key={button.actionID}
                    label={button.name}
                    onClick={() =>
                      props.container.buttonClick(button).catch(handleActionError)
                    } />
                ))}
                {props.container.actionButtons.secondary
                  .filter(button => button.actionID === 'back')
                  .map((button) => (
                    <HsbcButton type="secondary"
                      key={button.actionID}
                      label={button.name}
                      onClick={() =>
                        props.container.buttonClick(button).catch(handleActionError)
                      } />
                  ))}
              </>
            </HsbcButtonGroup>
          </HsbcContainer>
        )
      }
      {errorMessage && <div>{errorMessage}</div>}
    </>}
  </>
}

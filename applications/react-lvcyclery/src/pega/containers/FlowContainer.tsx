import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import LVCButton from 'applications/react-lvcyclery/design-system/lvc-button';
import LVCButtonGroup from 'applications/react-lvcyclery/design-system/lvc-button-group';
import LVCContainer from 'applications/react-lvcyclery/design-system/lvc-container';
import LVCProgressBar from 'applications/react-lvcyclery/design-system/lvc-progress-bar';
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

  function buttonClick(button: ActionButton) {
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top smoothly
    props.container.buttonClick(button).catch(handleActionError);
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
    {props.container.hasAssignment() && <>
      <LVCContainer>
        <LVCProgressBar
          name={
            window.PCore.getStore().getState().data[props.container.pconnect.getContextName()].caseInfo.stageLabel
          }
          currentStep={props.container.navigation?.steps.findIndex(step => step.visited_status === 'current') || 0}
          totalSteps={props.container.navigation?.steps.length || 0} />
      </LVCContainer>
      <LVCContainer title={props.container.getActiveViewLabel() ||
        props.container.getAssignmentName()}>
        {props.container.children.map((child) => (
          <GeneratePContainer key={child.id} container={child} />
        ))}
      </LVCContainer>
      {
        props.container.actionButtons && (
          <LVCContainer>
            <LVCButtonGroup>
              <>
                {props.container.actionButtons.main.map((button) => (
                  <LVCButton
                    type="primary"
                    key={button.actionID}
                    label={button.name}
                    onClick={() => buttonClick(button)}
                  />
                ))}
                {props.container.actionButtons.secondary
                  .map((button) => (
                    <LVCButton type="secondary"
                      key={button.actionID}
                      label={button.name}
                      onClick={() => buttonClick(button)} />
                  ))}
              </>
            </LVCButtonGroup>
          </LVCContainer>
        )
      }
    </>}
    {errorMessage && <div>{errorMessage}</div>}
  </>
}

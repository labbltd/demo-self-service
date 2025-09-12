import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';
import { BOIContainer, BOIFormContainer } from '../design-system/container';
import { BOIBackButton, BOINavigationButtons, BOINextButton } from '../design-system/navigation-buttons';
import { BOIProgressBar, BOIVerticalProgressBar } from '../design-system/progress-bar';

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

  function buttonClick(button: ActionButton) {
    setErrorMessage(null);
    props.container.buttonClick(button).catch(handleActionError)
  }
  const currentStep = props.container.navigation?.steps.findIndex(s => s.visited_status === 'current') || 0;
  const nSteps = props.container.navigation?.steps.length || 0;
  return <>
    {nSteps > 1 && <BOIProgressBar
      currentStep={currentStep}
      nSteps={nSteps}
    />}
    <BOIContainer progress={nSteps > 1 ? <BOIVerticalProgressBar
      steps={props.container.navigation?.steps.map(step => step.name) || []}
      currentStep={currentStep}
    /> : null}>
      <>
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
        {props.container.hasAssignment() && <form>
          <BOIFormContainer title={props.container.getActiveViewLabel() ||
            props.container.getAssignmentName()}>
            {props.container.children.map((child) => (
              <GeneratePContainer key={child.id} container={child} />
            ))}
            {props.container.actionButtons && (
              <BOINavigationButtons>
                {props.container.actionButtons.main.map((button, idx) => (
                  <BOINextButton
                    key={`main_${idx}`}
                    onClick={() => buttonClick(button)}
                  >
                    {button.name}
                  </BOINextButton>
                ))}
                <div style={{ order: 'initial' }}>
                  {props.container.actionButtons.secondary.filter(button => ['back','fillFormWithAI'].includes(button.actionID)).map((button, idx) => (
                    <BOIBackButton
                      key={`secondary_${idx}`}
                      onClick={() => buttonClick(button)}
                    >
                      {button.name}
                    </BOIBackButton>
                  ))}
                </div>
              </BOINavigationButtons>
            )}
            {errorMessage && <div>{errorMessage}</div>}
          </BOIFormContainer>
        </form>}
      </>
    </BOIContainer>
  </>
}

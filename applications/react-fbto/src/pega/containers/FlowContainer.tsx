import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';
import StepperHeader from '../../design-system/fbto-stepper-header';

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
    props.container.buttonClick(button).catch(handleActionError);
  }

  const currentStepIndex = props.container.navigation?.steps.findIndex(step => step.visited_status === 'current') || 0;
  const nSteps = props.container.navigation?.steps?.length;

  return <>
    {props.container.config.caseMessages?.map(message =>
      <div key={message}>
        {message}
      </div>
    )}
    {!props.container.hasAssignment() && <>
      {todoAssignments.map(assignment =>
        <div key={assignment.ID}>
          <div className="xforms-group container col sfs-page-container-group xforms-ap-full">
            <div>{assignment.processName} {'>'} {assignment.name}</div>
            <div>Assigned to {assignment.assigneeInfo?.name}</div>
            <div className="xforms-group sfs-paging-buttons xforms-ap-default">
              <label className="xforms-empty-group-label"><span></span></label>
              <button
                className="xforms-trigger xforms-control trg_right next_btn xforms-ap-default"
                type="button"
                onClick={() => openAssignment(assignment)}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
      {todoAssignments.length === 0 && <p>Thank you for your request. We will contact you as soon as possible.</p>}
    </>}
    {props.container.hasAssignment() && <form className="xforms-form dev-html5 tpl-xforms row script unknown unknown_1.0">
      <div className="xforms-group sfs-paging-overview xforms-ap-default xforms-htc">
        <label><span>Stappen</span></label>
        <StepperHeader currentStep={currentStepIndex} steps={props.container.navigation?.steps.map(step => step.name) || []} />
      </div>
      <div className="xforms-group container col sfs-page-container-group xforms-ap-full">
        <label className="formTitle">
          <span>
            <span className="currentstep">Stap {currentStepIndex + 1}|</span>
            <span className="totalstep">{nSteps}</span>
            {
              props.container.getActiveViewLabel() ||
              props.container.getAssignmentName()
            }
          </span>
        </label>
        <div className="xforms-switch xforms-group xforms-ap-default">
          <div className="xforms-case xforms-group sfs-page xforms-ap-default">
            <label className="xforms-empty-group-label"><span></span></label>
            <div className="xforms-group xforms-ap-full xforms-htc">
              <label className="xforms-empty-group-label"><span></span></label>
              {props.container.children.map((child) => (
                <GeneratePContainer key={child.id} container={child} />
              ))}
            </div>
          </div>
        </div>
        {props.container.actionButtons && (
          <>
            <div className="xforms-group sfs-paging-buttons xforms-ap-default">
              <label className="xforms-empty-group-label"><span></span></label>
              {props.container.actionButtons.secondary.map((button, idx) => (
                <button
                  key={`secondary_${idx}`}
                  className={"xforms-trigger xforms-control xforms-ap-default trg_left" + (button.name === 'Vorige' ? ' trg_left' : '')}
                  type="button"
                  onClick={(e) => buttonClick(button)}
                >
                  {button.name}
                </button>
              ))}
              {props.container.actionButtons.main.map((button, idx) => (
                <button
                  key={`main_${idx}`}
                  className="xforms-trigger xforms-control trg_right next_btn xforms-ap-default"
                  type="button"
                  onClick={(e) => buttonClick(button)}
                >
                  {button.name}
                </button>
              ))}
            </div>
          </>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>}
  </>
}

import { ActionButton, Assignment } from '@labb/constellation-core-types';
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

  function buttonClick(button: ActionButton) {
    setErrorMessage(null);
    props.container.buttonClick(button).catch(handleActionError)
  }

  return <>
    <div className="container-fluid">
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
      {props.container.hasAssignment() && <form className="ace-form">
        <ul>
          {props.container.navigation?.steps.map((step, i) => (
            <li key={`first_${i}`}>
              {step.name} ({step.ID}: {step.visited_status})
            </li>
          ))}
        </ul>
        <fieldset>
          <legend>
            <h2>
              {props.container.getActiveViewLabel() ||
                props.container.getAssignmentName()}
            </h2>
          </legend>
          {props.container.children.map((child) => (
            <GeneratePContainer key={child.id} container={child} />
          ))}
        </fieldset>
        {props.container.actionButtons && (
          <>
            <div className="primary-button variantConfigurable component dyn-form-primary-cta-default initialized">
              <div className="form-group dyn-form-field initialized">
                <div className="btn-group">
                  {props.container.actionButtons.secondary.map((button, idx) => (
                    <button
                      key={`secondary_${idx}`}
                      type="button"
                      className="btn btn-secondary button-secondary-default"
                      onClick={() => buttonClick(button)}
                    >
                      <div className="button-default-text">
                        <p>{button.name}</p>

                      </div>
                      <div className="button-spinner-active-text hidden">
                        <div className="button-spinner-inner">
                          <i className="fa fa-circle-o-notch fa-spin"></i>

                        </div>
                      </div>
                    </button>
                  ))}
                  {props.container.actionButtons.main.map((button, idx) => (
                    <button
                      key={`main_${idx}`}
                      type="button"
                      className="btn btn-primary button-primary-default"
                      onClick={() => buttonClick(button)}
                    >
                      <div className="button-default-text">
                        <p>{button.name}</p>

                      </div>
                      <div className="button-spinner-active-text hidden">
                        <div className="button-spinner-inner">
                          <i className="fa fa-circle-o-notch fa-spin"></i>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </form>}
    </div>
  </>
}

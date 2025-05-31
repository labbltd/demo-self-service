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
    setErrorMessage(e?.message || 'Error');
  }

  return <>
    {props.container.config.caseMessages?.map(message => <div className="govuk-body" key={message}>{message}</div>)}
    {!props.container.hasAssignment() && <>
      {todoAssignments.map(assignment =>
        <div key={assignment.ID}>
          <div className="govuk-body">{assignment.processName} {'>'} {assignment.name}</div>
          <div className="govuk-body">Assigned to {assignment.assigneeInfo?.name}</div>
          <button className="govuk-button" type="button" onClick={() => openAssignment(assignment)}>Go</button>
        </div>
      )}
    </>}
    {props.container.hasAssignment() && <div>
      <h1 className="govuk-heading-l">
        {props.container.getActiveViewLabel() ||
          props.container.getAssignmentName()}
      </h1>
      {props.container.children.map((child) => (
        <GeneratePContainer key={child.id} container={child} />
      ))}
      {props.container.actionButtons && (
        <div className="govuk-button-group">
          {props.container.actionButtons.secondary.map((button, idx) => (
            <button className="govuk-button govuk-button--secondary"
              data-module="govuk-button"
              data-prevent-double-click="true"
              key={`secondary_${idx}`}
              onClick={(e) => {
                setErrorMessage(null);
                props.container.buttonClick(button).catch(handleActionError)
              }}
            >
              {button.name}
            </button>
          ))}
          {props.container.actionButtons.main.map((button, idx) => (
            <button className="govuk-button"
              data-module="govuk-button"
              data-prevent-double-click="true"
              key={`main_${idx}`}
              onClick={(e) => {
                setErrorMessage(null);
                props.container.buttonClick(button).catch(handleActionError)
              }}
            >
              {button.name}
            </button>
          ))}
        </div>
      )}
      {errorMessage && <div className="govuk-warning-text">
        <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
        <strong className="govuk-warning-text__text">
          <span className="govuk-warning-text__assistive">Warning</span>
          Please correct the fields in the form above.
        </strong>
      </div>}
    </div>
    }
  </>
}

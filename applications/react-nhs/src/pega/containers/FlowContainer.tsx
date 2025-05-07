import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  return (
    <div>
      <h1 className="nhsuk-heading-l">
        {props.container.getActiveViewLabel() ||
          props.container.getAssignmentName()}
      </h1>
      {props.container.children.map((child) => (
        <GeneratePContainer key={child.id} container={child} />
      ))}
      {props.container.actionButtons && (
        <div className="nhsuk-button-group">
          {props.container.actionButtons.secondary.map((button, idx) => (
            <button className={
              "nhsuk-button nhsuk-button--secondary"
              + " margin-right"
            }
              data-module="nhsuk-button"
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
            <button className="nhsuk-button"
              data-module="nhsuk-button"
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
      {errorMessage && <div className="nhsuk-warning-text">
        <span className="nhsuk-warning-text__icon" aria-hidden="true">!</span>
        <strong className="nhsuk-warning-text__text">
          <span className="nhsuk-warning-text__assistive">Warning</span>
          Please correct the fields in the form above.
        </strong>
      </div>}
    </div>
  );
}

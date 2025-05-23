import { FlowContainer as PFlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';

export default function FlowContainer(props: { container: PFlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e?.message || 'Error');
  }

  if (!props.container.hasAssignment()) {
    return <div>No active assignment</div>;
  }

  return (
    <form>
      <ul>
        {props.container.pconnect
          .getDataObject()
          .caseInfo.navigation?.steps.map((step, i) => (
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
          {props.container.actionButtons.secondary.map((button, idx) => (
            <button
              key={`secondary_${idx}`}
              type="button"
              onClick={(e) =>
                props.container.buttonClick(button).catch(handleActionError)
              }
            >
              {button.name}
            </button>
          ))}
          {props.container.actionButtons.main.map((button, idx) => (
            <button
              key={`main_${idx}`}
              type="button"
              onClick={(e) =>
                props.container.buttonClick(button).catch(handleActionError)
              }
            >
              {button.name}
            </button>
          ))}
        </>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

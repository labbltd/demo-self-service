import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import HsbcButton from 'applications/react-hsbc/design-system/hsbc-button';
import HsbcButtonGroup from 'applications/react-hsbc/design-system/hsbc-button-group';
import HsbcContainer from 'applications/react-hsbc/design-system/hsbc-container';
import HsbcProgressBar from 'applications/react-hsbc/design-system/hsbc-progress-bar';
import { useState } from 'react';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e?.message || 'Error');
  }

  if (!props.container.hasAssignment()) {
    return <div>No active assignment</div>;
  }

  return <>
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
  </>
}

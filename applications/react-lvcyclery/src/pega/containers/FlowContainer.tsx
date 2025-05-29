import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import LVCButton from 'applications/react-lvcyclery/design-system/lvc-button';
import LVCButtonGroup from 'applications/react-lvcyclery/design-system/lvc-button-group';
import LVCContainer from 'applications/react-lvcyclery/design-system/lvc-container';
import LVCProgressBar from 'applications/react-lvcyclery/design-system/lvc-progress-bar';
import { useState } from 'react';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e?.message || 'Error');
  }

  if (!props.container.hasAssignment()) {
    return <LVCContainer>
      {props.container.config.caseMessages.map(message => <div key={message}>{message}</div>)}
    </LVCContainer>
  }

  return <>
    <LVCContainer>
      <LVCProgressBar
        name={
          window.PCore.getStore().getState().data[props.container.pconnect.getContextName()].caseInfo.stageLabel
        }
        currentStep={props.container.navigation?.steps.findIndex(step => step.visited_status === 'current')}
        totalSteps={props.container.navigation?.steps.length} />
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
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top smoothly
                    props.container.buttonClick(button).catch(handleActionError);
                  }}
                />
              ))}
              {props.container.actionButtons.secondary
                .filter(button => button.actionID === 'back')
                .map((button) => (
                  <LVCButton type="secondary"
                    key={button.actionID}
                    label={button.name}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top smoothly
                      props.container.buttonClick(button).catch(handleActionError)
                    }
                    } />
                ))}
            </>
          </LVCButtonGroup>
        </LVCContainer>
      )
    }
    {errorMessage && <div>{errorMessage}</div>}
  </>
}

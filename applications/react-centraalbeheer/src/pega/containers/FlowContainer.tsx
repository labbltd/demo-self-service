import { FlowContainer as PFlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';
import { Button } from '../../design-system/cb-button';
import StepperHeader from '../../design-system/cb-stepper-header';

export default function FlowContainer(props: { container: PFlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  if (!props.container.hasAssignment()) {
    return <div>No active assignment</div>;
  }

  const activeStep = props.container.navigation.steps.findIndex(step => step.visited_status === 'current');
  const caseName = props.container.pconnect.getCaseInfo().getCaseTypeName();
  return <>
    <StepperHeader
      steps={props.container.navigation.steps.map(step => step.name)}
      activeStep={activeStep} />
    <section className='container'>
      <div className="strip-funnel__title">
        <h1 className="heading-page-title ng-binding">{caseName}</h1>
        <h2 className="heading-page-subtitle ng-binding">
          {activeStep + 1}. {props.container.getActiveViewLabel() || props.container.getAssignmentName()}
        </h2>
      </div>
      <div className='row flex'>
        <div className="col-12 col-md-8">
          <fieldset className="fieldset">
            {props.container.children.map((child) => (
              <GeneratePContainer key={child.id} container={child} />
            ))}
          </fieldset>
        </div>
      </div>
      {props.container.actionButtons && (
        <div className="row">
          <div className="col-md-8">
            <div className="navigation-buttons">
              {props.container.actionButtons.main
                .map((button, idx) => (
                  <Button
                    key={`main_${idx}`}
                    variant='primary'
                    label={button.name}
                    onClick={() =>
                      props.container.buttonClick(button).catch(handleActionError)
                    }
                  />
                ))}
              {props.container.actionButtons.secondary
                .filter(button => button.actionID !== 'fillFormWithAI')
                .map((button, idx) => (
                  <Button
                    key={`secondary_${idx}`}
                    variant={button.actionID === 'back' ? 'back' : 'secondary'}
                    label={button.name}
                    onClick={() =>
                      props.container.buttonClick(button).catch(handleActionError)
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </section>
  </>
}

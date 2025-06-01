import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer as PFlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';
import { Button } from '../../design-system/cb-button';
import StepperHeader from '../../design-system/cb-stepper-header';

export default function FlowContainer(props: { container: PFlowContainer }) {
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
    setErrorMessage('');
    props.container.buttonClick(button).catch(handleActionError)

  }

  const activeStep = props.container.navigation?.steps.findIndex(step => step.visited_status === 'current');
  const caseName = props.container.pconnect.getCaseInfo().getCaseTypeName();
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
    {props.container.hasAssignment() && <><StepperHeader
      steps={props.container.navigation?.steps.map(step => step.name)}
      activeStep={activeStep} />
      <section className='container'>
        <div className="strip-funnel__title">
          <h1 className="heading-page-title ng-binding">{caseName}</h1>
          <h2 className="heading-page-subtitle ng-binding">
            {activeStep != undefined ? `${activeStep + 1}.` : ''} {props.container.getActiveViewLabel() || props.container.getAssignmentName()}
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
                      onClick={() => buttonClick(button)}
                    />
                  ))}
                {props.container.actionButtons.secondary
                  .filter(button => button.actionID !== 'fillFormWithAI')
                  .map((button, idx) => (
                    <Button
                      key={`secondary_${idx}`}
                      variant={button.actionID === 'back' ? 'back' : 'secondary'}
                      label={button.name}
                      onClick={() => buttonClick(button)}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </section>
    </>}
  </>
}

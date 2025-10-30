import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';
import { StepProgressBar } from '../../design-system/design';

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
    props.container.buttonClick(button).catch(handleActionError)
  }

  const currentStep = props.container.navigation?.steps.findIndex(step => step.visited_status === 'current') ?? 0;
  const steps = props.container.navigation?.steps.map((step, idx) => ({ id: idx + 1, label: step.name, route: '' })) || [];

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
          <button className="btn color-brand-primary" type="submit" onClick={(e) => { e.preventDefault(); openAssignment(assignment) }}>Go</button>
        </div>
      )}
      {todoAssignments.length === 0 && <p>Thank you for your request. We will contact you as soon as possible.</p>}
    </>}
    {props.container.hasAssignment() && <>
      <section className="section-general">
        <div className="wrapper-bounded">
          <StepProgressBar currentStep={currentStep + 1} steps={steps} />
        </div>
      </section>

      <section className="section-general">
        <div className="wrapper-bounded">
          <div className="row no-gutter">
            <div className="col-main">
              <div className="step-header">
                <h1 className="step-header-title">
                  <span className="step-title">{
                    props.container.getActiveViewLabel() || props.container.getAssignmentName()
                  }</span>
                </h1>

                <form>
                  <fieldset>
                    {props.container.children.map((child) => (
                      <GeneratePContainer key={child.id} container={child} />
                    ))}
                  </fieldset>
                  {props.container.actionButtons && (
                    <>
                      <div className="f-buttons">
                        {props.container.actionButtons.secondary.map((button, idx) => (
                          <button
                            key={`secondary_${idx}`}
                            type="button"
                            className={`arrow arrow-back text-color-brand-secondary`}
                            onClick={() => buttonClick(button)}
                          >
                            <span>
                              {button.name}
                            </span>
                          </button>
                        ))}
                        {props.container.actionButtons.main.map((button, idx) => (
                          <button
                            key={`main_${idx}`}
                            type="submit"
                            className="btn color-brand-primary"
                            onClick={(e) => { e.preventDefault(); buttonClick(button) }}
                          >
                            <span>
                              {button.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {errorMessage && <div>{errorMessage}</div>}
                </form>
              </div>
            </div>
            <div className="col-aside" style={{ flex: '1 1 35%', minWidth: '300px' }}>
              {/* <OrderSummary products={[
                {
                  id: '1',
                  name: 'Daniel',
                  license: 'K375TV',
                  pin: '1234',
                  monthlyPrice: 4.95,
                  originalPrice: 10.95,
                  deposit: 200,
                },
              ]} /> */}
            </div>
          </div>
        </div>
      </section>
    </>}
  </>
}

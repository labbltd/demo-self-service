import { FlowContainer as PFlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';
import Navigation from '../../cmc-design/cmc-navigation';
import Buttons from '../../cmc-design/cmc-buttons';

export default function FlowContainer(props: { container: PFlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  if (!props.container.hasAssignment()) {
    return <div>Thank you for contacting us. We will process this information shortly.</div>;
  }

  return <div className="sc-dBmzty eAErfA">
    <div className="sc-lbJcrp kqyALu">
      <div className="sc-czkgLR ijbUQt" style={{height: '100vh'}}>
        {props.container.pconnect
          .getDataObject()
          .caseInfo.navigation.steps.length > 1 && <Navigation steps={props.container.pconnect
            .getDataObject()
            .caseInfo.navigation.steps}></Navigation>}

        <div id="page" className="sc-dycYrt PEfgR screen">
          <div style={{ position: 'fixed', zIndex: 9999, inset: '16px', pointerEvents: 'none' }}></div>
          <div className="sc-jXbUNg kdpnEA">
            <div className="sc-imWYAI jCqVct" style={{ width: '25%' }}></div>
            <div className="sc-imWYAI jCqVct" style={{ width: '50%' }}>
              <div data-testid="stepTitle" className="sc-iapWAC hsxdFd">
                {props.container.getActiveViewLabel() ||
                  props.container.getAssignmentName()}
              </div>
            </div>
          </div>
            {props.container.children.map((child) => (
              <GeneratePContainer key={child.id} container={child} />
            ))}
        </div>

        <Buttons
          buttons={props.container.actionButtons}
          clicked={(button) =>
            props.container.buttonClick(button).catch(handleActionError)
          } />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  </div>
}

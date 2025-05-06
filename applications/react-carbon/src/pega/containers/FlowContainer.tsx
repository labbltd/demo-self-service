import {
  Button, Column, Grid, ProgressIndicator,
  ProgressStep, Row, Stack, Tile,
  ToastNotification
} from '@carbon/react';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useContext, useState } from 'react';
import { NavigationContext } from '../DxScreen';

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hideNavigation = useContext(NavigationContext);

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e.message || 'Error');
  }

  function currentStep(): number {
    return props.container.navigation?.steps?.findIndex(step => step.visited_status === 'current') ?? 0;
  }

  function isVertical(): boolean {
    return props.container.navigation?.template === 'Vertical';
  }

  function colCount(): number {
    return hideNavigation ? 16 : isVertical() ? 10 : 10
  }

  return props.container.hasAssignment() ? <div>
    <Grid>
      {!hideNavigation && <Column sm={isVertical() ? 2 : 4} md={isVertical() ? 2 : 8} lg={isVertical() ? 4 : 16}>
        <ProgressIndicator currentIndex={currentStep()} vertical={isVertical()}>
          {props.container.navigation.steps.map((step, i) => (
            <ProgressStep
              key={step.ID}
              label={step.name}
            />
          ))}
        </ProgressIndicator>
      </Column>}
      <Column sm={isVertical() ? 2 : 4} md={isVertical() ? 6 : 8} lg={isVertical() ? 12 : 16}>
        <Stack gap={4}>
          <Row>
            <h4>
              {props.container.getActiveViewLabel() ||
                props.container.getAssignmentName()}
            </h4>
          </Row>
          <Row>
            {props.container.view && (
              <GeneratePContainer container={props.container.view} />
            )}
            {props.container.children.map((child) => (
              <GeneratePContainer key={child.id} container={child} />
            ))}
          </Row>
          {props.container.actionButtons && (
            <Row>
              {props.container.actionButtons.secondary.map((button, idx) => (
                <Button
                  key={`secondary_${idx}`}
                  kind="secondary"
                  onClick={() =>
                    props.container.buttonClick(button).catch(handleActionError)
                  }
                >
                  {button.name}
                </Button>
              ))}
              {props.container.actionButtons.main.map((button, idx) => (
                <Button
                  key={`main_${idx}`}
                  onClick={() =>
                    props.container.buttonClick(button).catch(handleActionError)
                  }
                >
                  {button.name}
                </Button>
              ))}
            </Row>
          )}
        </Stack>
      </Column>
    </Grid>
    {errorMessage && <ToastNotification
      role="status"
      title="Error"
      timeout={1000}
      caption={errorMessage} />}
  </div> :
    <Tile>Thank you! The next step in this case has been routed appropriately.</Tile>;
}

import { GeneratePContainer } from '@labb/react-adapter';
import { Button, Step, Stepper, Typography } from '@material-tailwind/react';
import { useState } from 'react';

export default function DxFlowContainer(props) {
    const [errorMessage, setErrorMessage] = useState(null);

    function handleActionError(e) {
        console.error(e);
        setErrorMessage(e.message || 'Error');
    }

    if (!props.container.hasAssignment()) {
        return <div>No active assignment</div>;
    }
    const steps = props.container.navigation?.steps || [];
    const activeStep = steps.findIndex(step => step.visited_status === 'current');
    return <div className="w-[42rem] px-24 py-4">
        {steps.length > 0 && <Stepper activeStep={activeStep}>
            {steps.map((step, i) => <Step key={step.ID} className="h-4 w-4" >
                {i === activeStep && <div className="absolute -bottom-[2.5rem] w-max text-center">
                    <Typography
                        color={activeStep === 0 ? "blue-gray" : "gray"}
                        className="font-normal"
                    >
                        {step.name}
                    </Typography>
                </div>}
            </Step>
            )}
        </Stepper>}

        <div className="mt-16">
            {props.container.children.map((child) => (
                <GeneratePContainer key={child.id} container={child} />
            ))}
            {props.container.actionButtons && (
                <div className="flex justify-between mt-6">
                    {props.container.actionButtons.secondary.map((button, idx) => (
                        <Button
                            key={`secondary_${idx}`}
                            variant='outlined'
                            onClick={(e) =>
                                props.container.buttonClick(button).catch(handleActionError)
                            }
                        >
                            {button.name}
                        </Button>
                    ))}
                    {props.container.actionButtons.main.map((button, idx) => (
                        <Button
                            key={`main_${idx}`}
                            variant='filled'
                            color="blue"
                            onClick={(e) =>
                                props.container.buttonClick(button).catch(handleActionError)
                            }
                        >
                            {button.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
        {errorMessage && <div>{errorMessage}</div>}
    </div>
}

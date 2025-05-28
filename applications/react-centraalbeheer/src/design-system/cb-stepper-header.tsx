export default function StepperHeader(props: { steps: string[], activeStep: number }) {
    return (
        <div className="u-mb-1.5">
            <div className="stepbar-v2">
                <div className="stepbar__steps container u-py-0.5">
                    {props.steps?.map((step, index) => (
                        <div key={index} className={`stepbar__step ${index < props.activeStep ? 'is-completed' : index === props.activeStep ? 'is-active' : ''}`}>
                            <div className="stepbar__step-number">{index + 1}</div>
                            <div className="stepbar__step-name">
                                <span>{step}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

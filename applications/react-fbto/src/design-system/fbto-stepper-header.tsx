interface StepperHeaderProps {
    steps: string[];
    currentStep: number;
}

export default function StepperHeader({ steps, currentStep }: StepperHeaderProps) {
    return (
        <div className="xforms-repeat xforms-group xforms-ap-default">
            {steps?.map((step, index) => {
                const isPast = index < currentStep;
                const isActive = index === currentStep;
                const isFuture = index > currentStep;

                return <div key={step} className={"d-grid xforms-rc" + (isActive ? ' current' : '')}>
                    <button type="button" className={
                        "xforms-trigger xforms-control pagelist-page trg_right xforms-ap-minimal" +
                        (isPast ? ' btn-outline-primary' : '') +
                        (isActive ? ' btn-primary opacity-100' : '') +
                        (isFuture ? ' btn-dark opacity-75' : '')
                    }>
                        <span className="">
                            <span className="paging-number">{index + 1} - </span>{step}
                        </span>
                    </button>
                </div>
            })}
        </div>
    );
}

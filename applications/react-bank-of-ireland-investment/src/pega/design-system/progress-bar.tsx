export function BOIProgressBar(props: { currentStep: number, nSteps: number }) {
    return <div className="sc-bXdtCk fQaZZZ u-hide-for-print">
        <div className="sc-hKDTPf fjsVzo">
            <div className="sc-bCsDWz bmTpxf fade-enter-done">
                <div className="sc-bXdtCk bxkwPH application-stages-container-mobile">
                    {Array(props.nSteps).fill(undefined).map((_, idx) => <div key={idx} className="bar u-mx-1">
                        <span style={{ width: idx <= props.currentStep ? '100%' : '0%' }}>
                        </span>
                    </div>)}
                </div>
                <h5 color="monotoneMidDark" className="sc-dxPJFj HtnXm">Step {props.currentStep + 1} of {props.nSteps}</h5>
            </div>
        </div>
    </div>
}

export function BOIVerticalProgressBar(props: {
    steps: string[],
    currentStep: number
}) {
    const stepClass = (index: number) => {
        if (index == props.currentStep) return 'active';
        if (index < props.currentStep) return 'complete';
        return 'in-active';
    }

    return <div className="sc-hKDTPf dqCAsM u-hide-for-print">
        <div className="sc-cYqXxZ sc-fYSFmb sc-lfyWtT dVFhnh dYbMNj">
            <div className="sc-cYqXxZ jlEifH">
                <ol className="sc-bmbGwx hTvKSN application-stages-container-desktop">
                    {props.steps.map((step, index) => <li className={`sc-fDVtKM edRrWg ${stepClass(index)}`}>{step}</li>)}
                </ol>
            </div>
        </div>
    </div>
}
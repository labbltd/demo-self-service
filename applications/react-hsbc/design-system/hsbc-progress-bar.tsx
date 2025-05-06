export default function HsbcProgressBar(props: { 
    name: string,
    currentStep: number, 
    totalSteps: number 
}) {
    return <div className="container_YeVET marginBottom4_J3X2U">
        <header aria-hidden="true" role="header">
            <section className="stepCounter_cv97m fontBold_rQm33 fontSize2_QsxkM marginBottom2_EeogK marginTop2_JrTKO">
                <span>{props.name}
                    {props.currentStep != undefined && props.totalSteps != undefined && <span>
                        <span className="pipe_XhfVV"> | </span>
                        <span className="steps_K26hS fontRegular_RMvdW">Step {props.currentStep + 1} of {props.totalSteps}</span>
                    </span>}
                </span>
            </section>
        </header>
        <div className="progressBar_RUwa_">
            <div className="mercury_R5LIQ" style={{ width: (100 * (props.currentStep + 1) / props.totalSteps) + '%' }}></div>
        </div>
    </div>
}
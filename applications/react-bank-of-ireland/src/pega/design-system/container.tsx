import { ReactNode } from "react"

export function BOIContainer(props: {
    progress: React.ReactNode,
    children: React.ReactNode
}) {
    return <div className="sc-bXdtCk KqzMQ">
        <div className="sc-bXdtCk bbgAOl">
            {props.progress}
            <div className="sc-hKDTPf joSuBe formContent modalRenderer">
                <div className="sc-cYqXxZ sc-fYSFmb hwMfdx dYbMNj">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
}

export function BOIFormContainer(props: { title: string, children: ReactNode }) {
    return <div className="controls hide-title">
        <div className="sc-bhvsvk hfskxH field u-pb-0 medium" data-id="field_1880_65" >
            <div className="sc-hvjqFJ fRyVuv">
                <h1 color="monotoneDark" className="sc-dMIikG bFlgDJ">{props.title}</h1>
            </div>
        </div>
        {props.children}
    </div>
}
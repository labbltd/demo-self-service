import LvcError from "./lvc-error"

export default function LVCFormElement(props: {
    id: string,
    label?: string,
    hint?: string,
    error?: string
    children: JSX.Element | JSX.Element[]
}) {
    return <div className="formItem_P5zj_ marginTop2_JrTKO marginBottom3_cHPnK clearfix_hhLma">
        {props.label && <label className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0" htmlFor={props.id}>
            {props.label}
        </label>}
        {props.hint && <div className="hint_RGDKH fontSize2_QsxkM marginBottom1_fwI3m" id={props.id}
            dangerouslySetInnerHTML={{ __html: props.hint }}></div>}
        {props.children}
        {props.error && <LvcError error={props.error}/>}
    </div>
}
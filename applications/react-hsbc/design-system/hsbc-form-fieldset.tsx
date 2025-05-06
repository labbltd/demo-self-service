export default function HsbcFormFieldset(props: {
    id: string,
    label: string,
    hint?: string,
    error?: string,
    children: JSX.Element | JSX.Element[]
}) {
    return <div className="formItem_P5zj_ marginBottom3_cHPnK clearfix_hhLma">
        <fieldset className="fieldset_nSJlH">
            <legend className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0 noHint_dayKw marginBottom1_fwI3m">
                {props.label}
            </legend>
            {props.hint && <div className="hint_RGDKH fontSize2_QsxkM marginBottom1_fwI3m" data-testid="FormHint" id="personalDetails-firstName-describer-hint">
                {props.hint}
            </div>}
            <div>
                {props.children}
            </div>
            {props.error && <div className="error_sgf_5 fontSize2_QsxkM paddingTop1_Axzy3" data-type="Error">
                <span className="icon_yCkvc paddingRight1_lV5gn">
                    <span aria-hidden="true" role="presentation" className="icon_QFBvN alignMiddle_wxoAR error_j3LtY roundal_keXbk tiny_EmkPZ">
                        <svg focusable="false" viewBox="0 0 120 120">
                            <polygon points="99.598,31.716 88.285,20.401 60.001,48.688 31.716,20.403 20.402,31.717 48.687,60.001 20.403,88.284 31.716,99.599 60.001,71.313 88.283,99.599 99.598,88.285 71.314,60.001 "></polygon>
                        </svg>
                    </span>
                </span>
                <div className="content_wROh2">
                    <div>
                        <p aria-hidden="false" className="p_uRnMP default_WU9Y4 fontRegular_RMvdW fontSize3_hUHe0 marginBottom2_EeogK">
                            {props.error}
                        </p>
                    </div>
                </div>
            </div>}
        </fieldset>
    </div>
}
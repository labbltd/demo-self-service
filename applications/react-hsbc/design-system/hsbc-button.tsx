export default function HsbcButton(props: {
    label: string,
    type: 'primary' | 'secondary',
    onClick?: () => void
}) {
    if (props.type === "primary") {
        return <div className="buttonGroupItem_gF7Zn">
            <button className="button_CfI2j gridGutterSpacing_Msmdq bigFont_k9zgX fontSizeInput_iB7ra primary_MPrFX large_LB_rP gridGutterSpacing_Msmdq"
                onClick={() => props.onClick?.()}
                tabIndex={0}
                type="button">
                {props.label}
            </button>
        </div>
    }
    return <div className="buttonGroupItem_gF7Zn">
        <button className="button_CfI2j gridGutterSpacing_Msmdq bigFont_k9zgX fontSizeInput_iB7ra large_LB_rP gridGutterSpacing_Msmdq tertiary_UsCW_"
            type="button"
            onClick={() => props.onClick?.()}>
            <div role="presentation" className="icon_QFBvN alignMiddle_wxoAR navigation_REiKw small_liJq4 padRight_znmdG">
                <svg focusable="false" viewBox="0 0 465 465">
                    <polygon points="293.6097412,401.1834106 331.9074097,362.8890991 206.5081177,237.5170593 331.9074097,112.1142731 293.5960999,73.8165817 129.8785858,237.4965515 	"></polygon>
                </svg>
            </div>
            {props.label}
        </button>
    </div>
}
export default function LVCButton(props: {
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
                
            </div>
            {props.label}
        </button>
    </div>
}
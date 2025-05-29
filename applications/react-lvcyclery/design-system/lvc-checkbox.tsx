export default function LVCCheckbox(props: {
    id: string,
    label: string,
    value: boolean,
    onChange?: (v: boolean) => void
    readonly?: boolean
}) {
    return <div className="checkboxContainer_Rih25 checkboxContainerNoSpacing_YU1Ic checkboxContainerBase_Yi534 marginTopNegative2_gzGEG">
        <div className="container_bJdRs">
            <input className="checkboxInput_QktFC"
                id={props.id}
                name={props.id}
                type="checkbox"
                checked={props.value === true}
                disabled={props.readonly === true}
                onChange={e => {
                    return props.onChange?.(e.target.checked)
                }}
            />
            <label className="checkboxLabel_AQDU0 label_dQA2Y marginBottomHalf_HqntJ defaultCursor_vDq1c"
                htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    </div>
}
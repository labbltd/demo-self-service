export default function LVCRadio(props: {
    id?: string,
    options: { key: string, value: string }[],
    value?: string,
    onChange?: (v: string) => void
}) {
    return props.options.map(option => <div className="radioContainer_mCA9L" key={option.key}>
        <input className="radioInput_i7KYA"
            id={props.id + option.key}
            name={props.id + option.key}
            type="radio"
            value={option.key}
            checked={option.key === props.value}
            onChange={e => props.onChange?.(option.key)} />
        <label className="radioLabel_z6B1I label_dQA2Y marginBottomHalf_HqntJ paddingTop1_Axzy3 paddingRight1_lV5gn paddingBottom1_v2sBX paddingLeft2_8RvgZ"
            htmlFor={props.id + option.key}>
            {option.value}
        </label>
    </div>)
}
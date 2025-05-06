interface InputProps {
    id: string,
    type: string,
    value?: string,
    onChange?: (v: string) => void,
    onBlur?: (v: string) => void,
    invalid?: boolean
}

export default function HsbcInput(props: InputProps) {
    return props.type === 'number' ? <div className="container_he7NW">
        <div className="column_ycHBk width-1_RBepI">
            <TextInput {...props} />
        </div>
    </div> : TextInput(props);
}

function TextInput(props: InputProps) {
    return <input
        className={
            'input_cSOEz fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be'
            + (props.invalid ? ' invalid_Wd4pb' : '')
        }
        id={props.id}
        name={props.id}
        type={props.type}
        value={props.value ?? ''}
        onChange={e => props.onChange?.(e.target.value)}
        onBlur={e => props.onBlur?.(e.target.value)}
    />
}
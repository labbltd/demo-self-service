import { MutableRefObject } from "react";

interface InputProps {
    id: string,
    type: string,
    value?: string,
    onChange?: (v: string) => void,
    onBlur?: (v: string) => void,
    invalid?: boolean,
    reference?: MutableRefObject<HTMLInputElement | null>
    multiple?: boolean
}

export default function HsbcInput(props: InputProps) {
    return props.type === 'number' ? <div className="container_he7NW">
        <div className="column_ycHBk width-2_cYEL9">
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
        ref={props.reference}
        id={props.id}
        name={props.id}
        type={props.type}
        value={props.value ?? ''}
        onChange={e => props.onChange?.((props.type === 'file' ? e : e.target.value) as unknown as string)}
        onBlur={e => props.onBlur?.(e.target.value)}
    />
}
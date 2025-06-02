import { ChangeEventHandler, FocusEventHandler, RefObject } from "react";

export default function TextInput(props: {
    onChange?: ChangeEventHandler<HTMLElement> | undefined;
    onBlur?: FocusEventHandler<HTMLElement> | undefined;
    options?: string[];
    id: string;
    label: string;
    helperText?: string;
    type: string;
    value?: string;
    error?: string;
    multiple?: boolean;
    inputRef?: RefObject<HTMLInputElement>;
}) {
    const isSelect = props.type === 'select';
    const isTextarea = props.type === 'textarea';
    const isMasked = props.type === 'masked';
    const isInput = !isSelect && !isTextarea && !isMasked;
    return (
        <div className="input-group">
            <div className="input-text">
                {isInput && <input className="input-text__input input" id={props.id} type={props.type} multiple={props.multiple} onChange={props.onChange} onBlur={props.onBlur} />}
                {isMasked && <input className="input-text__input input" id={props.id} type={'text'} onBlur={props.onBlur} ref={props.inputRef} />}
                {isTextarea && <textarea className="input-text__input input" rows={15} value={props.value} onChange={props.onChange} onBlur={props.onBlur}></textarea>}
                {isSelect && <select className="input-text__input input" value={props.value} onChange={props.onChange}>
                    <option value={''}>Select {props.label}...</option>
                    {props.options?.map(option =>
                        <option key={option} value={option}>{option}</option>
                    )}
                </select>}
                <label className="input-text__label label" htmlFor={props.id}>
                    {props.label}
                </label>
                <div className="input-message input-message--error">
                    {props.error}
                </div>
                <div className="input-message input-message--note">
                    {props.helperText}
                </div>
            </div>
        </div>
    );
}

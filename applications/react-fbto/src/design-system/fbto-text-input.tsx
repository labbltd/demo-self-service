import { ChangeEventHandler } from "react";

interface TextInputProps {
    id?: string;
    label?: string;
    required?: boolean;
    type: string;
    errorMessage?: string;
    helperMessage?: string;
    placeholder?: string;
    value?: string;
    step?: number | string | undefined;
    inputmode?: any;
    options?: string[];
    onChange: ChangeEventHandler<HTMLElement>;
    onBlur?: ChangeEventHandler<HTMLElement>;
}

export default function TextInput(props: TextInputProps) {
    return (
        <>
            <div className={
                "d-flex row ml-0 xforms-cc xforms-ap-full ui-date-picker col-sm-4" +
                (props.errorMessage ? 'xforms-invalid' : 'xforms-valid')
            }>
                <label className="col-lg-3 col-form-label pl-lg-0" htmlFor={props.id}>
                    {props.label}
                    {props.required && <span className="required-indicator text-danger">*</span>}
                </label>
                <div className="col-lg-9">
                    {(props.type !== 'select' && props.type !== 'textarea') && <input name={props.label} id={props.id} type={props.type === 'date' ? 'text' : props.type}
                        value={props.value}
                        step={props.step}
                        inputMode={props.inputmode}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        placeholder={props.placeholder}
                        className={
                            "xforms-input xforms-control col-sm-4 xforms-ap-full"
                        } />}
                    {props.type === 'select' && <select className="xforms-input xforms-control col-sm-4 xforms-ap-full" onChange={props.onChange}>
                        <option value="">Select...</option>
                        {props.options?.map(option =>
                            <option key={option} value={option}>{option}</option>
                        )}
                    </select>}
                    {props.type === 'textarea' && <textarea
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        className="xforms-input xforms-control col-sm-4 xforms-ap-full" value={props.value}></textarea>}
                </div>
                {props.helperMessage && <div className="offset-lg-3 order-1 col-lg-9">
                    <small className="form-text text-muted xforms-field-info xforms-field-help ">
                        <span className="xforms-help-box">{props.helperMessage}</span>
                    </small>
                </div>}
                {props.errorMessage && <span className="xforms-field-info order-2 offset-lg-3 col-lg-9 xforms-field-alert text-danger small">
                    {props.errorMessage}
                    <ul className="wcag-alerts"></ul>
                </span>}
            </div>
        </>
    );
}

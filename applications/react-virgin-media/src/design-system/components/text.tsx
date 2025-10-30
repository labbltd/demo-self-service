import { ChangeEventHandler, FocusEventHandler } from "react"

export default function VmText(props: {
    onBlur: FocusEventHandler<HTMLInputElement> | undefined
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
    label: string,
    value?: string,
    type?: string,
    inputMode?: string,
    step?: string | number,
    errorMessage?: string,
    infoMessage?: string,
    disabled?: boolean
}) {
    return <div className="form-builder-input component">
        <div className={`form-group dyn-form-field has-info initialized${props.errorMessage ? ' has-error has-danger' : ''}`}>
            <input className={`form-control ace-form-field ace-placeholder dyn-form-input     initialized${props.value ? ' has-value' : ''}`}
                disabled={props.disabled}
                name="Mobile_Number"
                type={props.type}
                inputMode={props.inputMode as any}
                step={props.step}
                onChange={props.onChange}
                onBlur={props.onBlur} />
            {props.errorMessage && <div className="ace-form-info">
                <div className="ace-form-info-l">
                    <div className="help-block with-errors" aria-live="assertive">
                        <ul className="list-unstyled">
                            <li>{props.errorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>}
            {props.infoMessage && <div tabIndex={-1} className="ace-form-popover fa fa-info-circle dyn-form-popover" aria-label="More info" data-toggle="popover" data-content="Your contact number should be 11 digits long" data-original-title="" title=""></div>}
            <label className="form-control-label">
                {props.label}
            </label>
        </div>
    </div>
}
import CmCFormControl from "./cmc-form-control";

export default function CmCInput(props: {
    label: string, value: string, helperText?: string, errorMessage?: string,
    type?: string, inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined,
    step?: string | number | undefined, readOnly?: boolean, required?: boolean,
    changed: (target: EventTarget) => void,
    blurred: (target: EventTarget) => void,
    fullwidth?: boolean
}) {
    const { label, value, helperText, errorMessage,
        type, inputmode, step, readOnly, required,
        changed, blurred, fullwidth = false } = props;

    return <CmCFormControl label={label} helperText={helperText} errorMessage={errorMessage} fullwidth={fullwidth}>
        <div className="FieldGroup_fieldGroup__ts0Ri FieldGroup_default__r3eIu TextInput_container__nFl" style={{ height: '48px', width: '100%', maxWidth: '100%', margin: '0px' }}>
            <input className="TextInput_input__VF9Iv"
                name="firstName"
                maxLength={50}
                placeholder=""
                value={value}
                type={type}
                inputMode={inputmode}
                step={step}
                readOnly={readOnly}
                disabled={readOnly}
                required={required}
                onChange={(e) => changed(e.target)}
                onBlur={(e) => blurred(e.target)}
            />
        </div>
    </CmCFormControl>
}
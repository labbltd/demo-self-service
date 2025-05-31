import { PContainer } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef } from "react";
import IMask from 'imask';

export default function DxMaskedInput(props: { container: PContainer }) {
    const input = useRef(null);
    const { container } = props;

    useEffect(() => {
        if (input.current) {
            const maskOptions = {
                mask: container.config.mask,
                definitions: {
                    // defaults are '0', 'a', '*'
                    // You can extend by adding other characters
                    A: /[A-Z]/
                }
            }
            IMask(input.current, maskOptions);
        }
    }, [input.current])


    function getValue(event: ChangeEvent) {
        return (event.target as HTMLInputElement).value;
    }

    if (props.container.config.readOnly) {
        return <div className="nhsuk-summary-list__row">
            <dt className="nhsuk-summary-list__key">
                {props.container.config.label}
            </dt>
            <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: props.container.config.value }}>
            </dd>
        </div>
    }

    return <>
        <div className={"nhsuk-form-group" + (container.config.validatemessage ? " nhsuk-form-group--error" : "")}>
            <label className="nhsuk-label" htmlFor={container.id}>
                {container.config.label}{!container.config.required ? ' (Optional)' : ''}
            </label>
            {container.config.mask && <div className="nhsuk-hint">
                {container.config.mask}
            </div>}
            {container.config.validatemessage && <p className="nhsuk-error-message">
                <span className="nhsuk-visually-hidden">Error:</span> {container.config.validatemessage}
            </p>}
            <input className="nhsuk-input"
                ref={input}
                id={container.id}
                type="text"
                placeholder={container.config.placeholder}
                value={container.config.value}
                onChange={e => container.updateFieldValue(getValue(e))}
                onBlur={e => container.triggerFieldChange(getValue(e))}
            />
        </div>
    </>
}
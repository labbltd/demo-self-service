import { PContainer } from "@labb/dx-engine";
import IMask from 'imask';
import { ChangeEvent, useEffect, useRef } from "react";

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
            const mask = IMask(input.current, maskOptions);
            mask.value = container.config.value;
        }
    }, [input.current])


    function getValue(event: ChangeEvent) {
        return (event.currentTarget as HTMLInputElement).value;
    }

    if (props.container.config.readOnly) {
        return <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key govuk-body">
                {props.container.config.label}
            </dt>
            <dd className="govuk-summary-list__value govuk-body">
                {props.container.config.value}
            </dd>
        </div>
    }

    return <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
        <label className="govuk-label" htmlFor={container.id}>
            {container.config.label}{!container.config.required ? ' (Optional)' : ''}
        </label>
        {container.config.mask && <div className="govuk-hint">
            {container.config.mask}
        </div>}
        {container.config.validatemessage && <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
        </p>}
        <input
            className="govuk-input"
            ref={input}
            id={container.id}
            type="text"
            placeholder={container.config.placeholder}
            onBlur={e => {
                container.updateFieldValue(getValue(e));
                container.triggerFieldChange(getValue(e));
            }}
        />
    </div>
}
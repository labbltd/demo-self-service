import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";

export default function DxTextArea(props: { container: PContainer }) {
    const { container } = props;

    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }

    return <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
        <label className="govuk-label" htmlFor={container.id}>
            {container.config.label}{!container.config.required ? ' (Optional)' : ''}
        </label>
        {container.config.helperText && <div className="govuk-hint">
            {container.config.helperText}
        </div>}
        {container.config.validatemessage && <p className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
        </p>}
        <textarea
            className="govuk-textarea"
            rows={15}
            value={container.config.value}
            onChange={e => container.updateFieldValue(getValue(e))}
            onBlur={e => container.triggerFieldChange(getValue(e))}
        ></textarea>
    </div>
}
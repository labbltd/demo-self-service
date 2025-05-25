import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";

export default function DxTextArea(props: { container: PContainer }) {
    const { container } = props;

    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }

    return <label>{container.config.label}{container.config.required ? ' *' : ''}
        <textarea
            value={container.config.value}
            onChange={e => container.updateFieldValue(getValue(e))}
            onBlur={e => container.triggerFieldChange(getValue(e))}
        ></textarea>
        {container.config.helperText}
        {container.config.validatemessage}
    </label>
}
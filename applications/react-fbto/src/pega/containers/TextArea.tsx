import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";
import TextInput from "../../design-system/fbto-text-input";

export default function DxTextArea(props: { container: PContainer }) {
    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
    }
    return <>
        <TextInput id={props.container.id}
            errorMessage={props.container.config.validatemessage}
            helperMessage={props.container.config.helperText}
            placeholder={props.container.config.placeholder}
            type={'textarea'}
            label={props.container.config.label}
            required={props.container.config.required}
            value={props.container.config.value}
            onChange={(e) => props.container.updateFieldValue(getValue(e) ?? (e.target as any).value)}
            onBlur={(e) => props.container.triggerFieldChange(getValue(e) ?? (e.target as any).value)}
        />
    </>
}
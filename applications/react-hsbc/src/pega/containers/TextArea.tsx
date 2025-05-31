import { PContainer } from "@labb/dx-engine";
import HsbcFormElement from "applications/react-hsbc/design-system/hsbc-form-element";
import { ChangeEvent } from "react";

export default function DxTextArea(props: { container: PContainer }) {
    const { container } = props;

    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd dangerouslySetInnerHTML={{ __html: props.container.config.value }}></dd></>;
    }
    return <HsbcFormElement
        label={props.container.config.label}
        id={props.container.id}
        hint={props.container.config.helperText}
        error={props.container.config.validatemessage}>
        <textarea
            value={container.config.value}
            onChange={e => container.updateFieldValue(getValue(e))}
            onBlur={e => container.triggerFieldChange(getValue(e))}
        ></textarea>
    </HsbcFormElement>
}
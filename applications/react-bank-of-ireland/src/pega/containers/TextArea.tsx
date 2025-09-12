import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";
import { BOITextArea } from "../design-system/textarea";

export default function DxTextArea(props: { container: PContainer }) {
    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd dangerouslySetInnerHTML={{ __html: props.container.config.value }}></dd></>;
    }
    return <BOITextArea label={props.container.config.label} value={props.container.config.value}
        placeholder={props.container.config.placeholder}
        onChange={e => props.container.updateFieldValue(getValue(e))}
        onBlur={e => props.container.triggerFieldChange(getValue(e))}
    />;
}
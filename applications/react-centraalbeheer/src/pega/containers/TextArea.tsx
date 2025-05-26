import { PContainer } from "@labb/dx-engine";
import { ChangeEvent } from "react";
import TextInput from "../../design-system/cb-text-input";

export default function DxTextArea(props: { container: PContainer }) {
    const { container } = props;

    function getValue(event: ChangeEvent): string {
        return (event.target as HTMLInputElement).value;
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
    }
    return <>
        <TextInput id={props.container.id} label={props.container.config.label} type={'textarea'}
            onChange={(e) => props.container.updateFieldValue(getValue(e))}
            onBlur={(e) => props.container.triggerFieldChange(getValue(e))} />
    </>
}
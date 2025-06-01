import { PContainer } from "@labb/dx-engine";
import HsbcFormElement from "applications/react-hsbc/design-system/hsbc-form-element";
import HsbcInput from "applications/react-hsbc/design-system/hsbc-input";
import IMask from 'imask';
import { useEffect, useRef } from "react";

export default function DxMaskedInput(props: { container: PContainer }) {
    const input = useRef<HTMLInputElement | null>(null);
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

    return <>
        {container.config.readOnly && <>
            <dt>{container.config.label}</dt>
            <dd>{container.config.value ?? '--'}</dd>
        </>}
        {!container.config.readOnly &&
            <HsbcFormElement
                label={props.container.config.label}
                id={props.container.id}
                hint={props.container.config.mask}
                error={props.container.config.validatemessage}>
                <HsbcInput id={props.container.id}
                    reference={input}
                    type="text"
                    invalid={props.container.config.validatemessage}
                    onBlur={e => {
                        props.container.updateFieldValue(e.target.value);
                        props.container.triggerFieldChange(e.target.value);
                    }}
                />
            </HsbcFormElement>
        }
    </>
}
import { PContainer } from "@labb/dx-engine";
import LVCFormElement from "applications/react-lvcyclery/design-system/lvc-form-element";
import LVCInput from "applications/react-lvcyclery/design-system/lvc-input";
import IMask from 'imask';
import { useEffect, useRef } from "react";

export default function DxMaskedInput(props: { container: PContainer }) {
    const { container } = props;
    const input = useRef<HTMLInputElement | null>(null);

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
            <LVCFormElement
                label={props.container.config.label}
                id={props.container.id}
                hint={props.container.config.mask}
                error={props.container.config.validatemessage}>
                <LVCInput id={props.container.id}
                    reference={input}
                    type="text"
                    invalid={props.container.config.validatemessage}
                    onBlur={e => {
                        props.container.updateFieldValue(e.target.value);
                        props.container.triggerFieldChange(e.target.value);
                    }}
                />
            </LVCFormElement>
        }
    </>
}
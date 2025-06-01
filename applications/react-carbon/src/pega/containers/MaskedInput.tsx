import { TextInput } from "@carbon/react";
import { PContainer } from "@labb/dx-engine";
import IMask from 'imask';
import { useEffect, useRef } from "react";

export default function DxMaskedInput(props: { container: PContainer }) {
    const input = useRef<HTMLInputElement>(null);
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
            input.current.value = container.config.value;
        }
    }, [input.current])

    return <>
        <TextInput
            id={container.config.label}
            type={'text'}
            labelText={container.config.label}
            helperText={container.config.mask}
            invalid={!!container.config.validatemessage}
            invalidText={container.config.validatemessage}
            ref={input}
            onBlur={e => {
                container.updateFieldValue(e.target.value);
                container.triggerFieldChange(e.target.value);
            }}
        />
    </>
}
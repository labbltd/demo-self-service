import { PContainer } from "@labb/dx-engine";
import IMask from 'imask';
import { useEffect, useRef } from "react";
import TextInput from "../../design-system/fbto-text-input";

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
        }
    }, [input.current])

    if (container.config.readOnly) {
        return <>
            <dt>{container.config.label}</dt>
            <dd>{container.config.value ?? '--'}</dd>
        </>
    }
    return <>
        <TextInput id={container.id}
            errorMessage={container.config.validatemessage}
            helperMessage={container.config.mask}
            placeholder={container.config.placeholder}
            type={'masked'}
            label={container.config.label}
            required={container.config.required}
            inputRef={input}
            onBlur={() => {
                if (!input.current) return;
                container.updateFieldValue(input.current.value)
                container.updateFieldValue(input.current.value)
            }}
        />
    </>
}
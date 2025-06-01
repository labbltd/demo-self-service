import { PContainer } from "@labb/dx-engine";
import IMask from 'imask';
import { useEffect, useRef } from "react";
import TextInput from "../../design-system/cb-text-input";

export default function DxMaskedInput(props: { container: PContainer }) {
    const input = useRef(null);
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
        <TextInput id={container.id}
            label={container.config.label}
            helperText={container.config.mask}
            error={container.config.validatemessage}
            type={'masked'}
            inputRef={input}
            onBlur={(e) => {
                container.updateFieldValue((e.target as any).value);
                container.triggerFieldChange((e.target as any).value);
            }} />
    </>
}
import { PContainer } from "@labb/dx-engine";
import HsbcFormElement from "applications/react-hsbc/design-system/hsbc-form-element";
import { useEffect, useRef, useState } from "react";
import SignaturePad from 'signature_pad';

export default function DxSignatureCapture(props: { container: PContainer }) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const { container } = props;
    const [signature, setSignature] = useState<SignaturePad>();
    const [hasValueChanged, setHasValueChanged] = useState(false);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (!canvas.current) return;
        const signature = new SignaturePad(canvas.current, {
            penColor: '#056dae'
        });
        signature.addEventListener('endStroke', () => {
            onEndStroke();
        });
        resizeCanvas();
        signature.on();
    }, [canvas.current])

    function onClear() {
        signature?.clear();
        setHasValueChanged(false);
        setInfo('');
    }

    function onAccept() {
        const newValue = canvas.current?.toDataURL('image/svg+xml');
        if (newValue) {
            container.updateFieldValue(newValue);
            setHasValueChanged(false);
            setInfo('Signature captured');
        }
    }

    function resizeCanvas() {
        if (!canvas.current) return;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.current.width = canvas.current.offsetWidth * ratio;
        canvas.current.height = canvas.current.offsetHeight * ratio;
        canvas.current.getContext('2d')?.scale(ratio, ratio);
    }

    function onEndStroke() {
        setHasValueChanged(true);
    }

    return <>
        <HsbcFormElement
            label={props.container.config.label}
            id={props.container.id}
            hint={props.container.config.helperText}
            error={props.container.config.validatemessage}
        >
            {
                !container.config.readOnly && <>
                    <canvas style={{ width: '100%', height: '200px', border: '1px dashed' }} ref={canvas}></canvas>
                    <button type="button" onClick={() => onClear()}>
                        Clear
                    </button>
                    <button type="button" onClick={() => onAccept()}
                        disabled={!hasValueChanged}>
                        Accept
                    </button>
                    {info && <div>{info}</div>}
                </> || <></>
            }
        </HsbcFormElement>
    </>
}
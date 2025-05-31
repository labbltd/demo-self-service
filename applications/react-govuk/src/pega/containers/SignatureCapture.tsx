import { PContainer } from "@labb/dx-engine";
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

    const label = container.config.inheritedProps.find((prop: { prop: string, value: string }) => prop.prop === 'label')?.value || container.config.label;

    return <>
        <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
            <label className="govuk-label" htmlFor={container.id}>
                {label}{!container.config.required && ' (Optional)'}
            </label>
            {container.config.helperText && <div className="govuk-hint">
                {container.config.helperText}
            </div>}
            {container.config.validatemessage && <p className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
            </p>}
        </div>
        {container.config.readOnly && <img src={container.config.value} />}
        {
            !container.config.readOnly && <>
                <canvas style={{ width: '100%', height: '200px', border: '1px dashed' }} ref={canvas}></canvas>
                <div className="govuk-button-group">
                    <a className="govuk-link" onClick={(e) => { e.preventDefault(); onClear() }} href="#">Clear</a>
                    {hasValueChanged && <a onClick={(e) => { e.preventDefault(); onAccept() }} className="govuk-link" href="#">Accept</a>}
                </div>
                {info && <div className="govuk-body">{info}</div>}
            </>
        }
    </>
}
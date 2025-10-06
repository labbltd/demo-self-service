import { ChangeEventHandler, FocusEventHandler } from "react"

export function BOIRadioButtons(props: {
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
    onBlur: FocusEventHandler<HTMLInputElement> | undefined
    value: string
    id: string | undefined
    label: string,
    options: { key: string, value: string }[]
}) {
    return <div className="sc-bhvsvk hfskxH field u-radio-traditional medium" data-id="field_1831_1141">
        <div className="sc-dVAgQd gRHQTq">
            <label className="field-label ">{props.label}</label>
        </div>
        <div className="sc-QsWun cRqrFI">
            <div className="sc-ljKisr coXoGB">
                <div aria-label="RadioGroup label" data-testid="radio-group" role="radiogroup" aria-orientation="vertical" id="react-aria6498247520-:r6h5:" className="sc-dJjnMf iNpPEp" data-rac="" data-orientation="vertical">
                    {props.options.map(option => <label key={option.key} data-testid="radio" data-react-aria-pressable="true" className="react-aria-Radio" data-rac="" data-selected={props.value === option.key ? 'true' : null}>
                        <span style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(50%)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px', whiteSpace: 'nowrap' }}>
                            <input data-react-aria-pressable="true" tabIndex={0} type="radio"
                                onChange={props.onChange}
                                onBlur={props.onBlur}
                                checked={props.value === option.key}
                                name={props.id}
                                id={`${props.id}.${option.key}`}
                                value={option.key}
                            />
                        </span>
                        <div className="sc-exiKtA eJoscL">
                            <div className="sc-iMAVTd gouTjK">
                                <div className="sc-eFbPDA idULQP">
                                    {props.value === option.key && <div data-testid="radio-selected-icon" className="sc-bSKcBZ jpfpTP"></div>}
                                </div>
                            </div>
                            <div className="sc-ePKekS kvgwCF">
                                <span className="sc-kThouk kitHWm">{option.value}</span>
                            </div>
                        </div>
                    </label>)}
                </div>
            </div>
        </div>
    </div>
}
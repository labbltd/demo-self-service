import { ChangeEventHandler } from "react"

export function BOICheckbox(props: {
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
    checked: boolean,
    label: string,
    caption: string,
    errorMessage: string
}) {
    return <div className={"sc-bhvsvk hfskxH field medium" + (props.label ? " field-label-hide" : "")} data-id="field_1831_1078">
        <fieldset>
            <div className="sc-dVAgQd gRHQTq">
                <legend className="field-label ">{props.label}</legend>
            </div>
            <div className="checkbox">
                <label data-testid="checkbox" data-react-aria-pressable="true" className="react-aria-Checkbox" data-rac="" style={{ display: 'block', marginTop: '1rem', marginBottom: '1rem', userSelect: 'none' }}
                    data-selected={props.checked ? "true" : null}>
                    <span style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(50%)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px', whiteSpace: 'nowrap' }}>
                        <input name="input_1078" type="checkbox" data-react-aria-pressable="true" tabIndex={0}
                            checked={props.checked}
                            onChange={props.onChange} />
                    </span>
                    <div className="sc-exiKtA eJoscL">
                        <div className="sc-iMAVTd gouTjK">
                            <div className="sc-jQfdtf cDpIzy">
                                {props.checked && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-testid="checkbox-selected-icon">
                                    <path fill="currentColor" d="m9.55 15.515 8.639-8.638a.742.742 0 0 1 1.069 0 .735.735 0 0 1 .233.535c0 .2-.078.379-.233.534l-9.075 9.075a.867.867 0 0 1-.633.271.867.867 0 0 1-.632-.27l-4.175-4.176a.714.714 0 0 1-.22-.53.75.75 0 0 1 .235-.54.735.735 0 0 1 .535-.232c.201 0 .38.078.534.233l3.723 3.738Z">
                                    </path>
                                </svg>}
                            </div>
                        </div>
                        <div className="sc-ePKekS kvgwCF">
                            <span className="sc-kThouk kitHWm">{props.caption}</span>
                        </div>
                    </div>
                </label>
            </div>
        </fieldset>
    </div>
}
import { ChangeEvent } from "react"

export function BOITextInput(props: {
    id: string,
    label: string,
    hint: string,
    placeholder: string,
    errorMessage: string,
    type: string,
    prefix?: string,
    inputMode: | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined,
    step: string | number | undefined,
    value: string,
    disabled: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    return <div className="sc-bhvsvk hfskxH field u-currency-euro error" >
        <div className="sc-dVAgQd gRHQTq">
            <label htmlFor={props.id} className="field-label ">{props.label}</label>
        </div>
        {props.hint && <div className="sc-cXUDFq cqGMmD field-description-above" color="monotoneDark" >
            <div className="sc-hvjqFJ fRyVuv">
                <p color="monotoneDark" className="sc-gkhwGK hFYMkp">{props.hint}</p>
            </div>
        </div>}
        <div className="sc-ljKisr gqXwSY">
            <div className="sc-XIHKi czryDJ">
                <div className="sc-QsWun cRqrFI">
                    <div data-testid="text-input" className="u-currency-euro react-aria-TextField" data-rac="" data-required="true" data-invalid="true">
                        <div className="sc-fzUgvD bRSrhQ">
                            <div className="sc-jLJhrC byLSWz">
                                <div className="sc-ljAjJc mvqGF">
                                    {props.prefix && <div className="sc-kThouk jVCLQB sc-bLafmV gcqzPn">
                                        <div className="sc-fhsMEl fGZtMg">{props.prefix}</div>
                                    </div>}
                                    <input id={props.id} type={props.type} name={props.id} placeholder={props.placeholder} inputMode={props.inputMode} tabIndex={0} className="sc-jthNAk irKvNF" data-rac="" value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {props.errorMessage && <div className="sc-eOQiIf eNGrju field-error" color="alert" style={{ order: 5 }}>{props.errorMessage}</div>}
    </div>
}
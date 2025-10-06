import { ChangeEvent, FocusEvent } from "react";

export function BOITextArea(props: {
    onBlur(e: FocusEvent<HTMLTextAreaElement, Element>): void;
    value: string | number | readonly string[] | undefined;
    placeholder: string;
    errorMessage: string;
    onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
    label: string
}) {
    return <div className="sc-bhvsvk hfskxH field medium">
        <div className="sc-dVAgQd gRHQTq">
            <label htmlFor="field_1748_145" className="field-label">{props.label}</label>
        </div>
        <div className="sc-ljKisr gqXwSY">
            <div className="sc-SaBeI iMiUIz">
                <div>
                    <div>
                        <label htmlFor="field_1748_145">
                        </label>
                    </div>
                </div>
                <div>
                    <div className="sc-eKtKts bdsfKi">
                        <div className="sc-bKeIcL jVcLtC">
                            <div className="sc-eiiWHr XzcER">
                                <textarea placeholder={props.placeholder} id="field_1748_145" data-testid="textarea" className="sc-ibRMLl lnDvwG" style={{ height: '24px !important' }}
                                    value={props.value}
                                    onChange={e => props.onChange(e)}
                                    onBlur={e => props.onBlur(e)}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="sc-cYqXxZ fnFYgh">
            <div className="sc-cYqXxZ jlEifH">{props.value?.toString().length} of 1000 characters</div>
        </div>
        {props.errorMessage && <div className="sc-eOQiIf eNGrju field-error" color="alert" style={{ order: 5 }}>{props.errorMessage}</div>}
    </div>
}
import { useState } from "react";
import LVCButton from "./lvc-button";
import LVCButtonGroup from "./lvc-button-group";
import LVCContainer from "./lvc-container";
import LVCDate from "./lvc-date";
import LVCFormElement from "./lvc-form-element";
import LVCFormFieldset from "./lvc-form-fieldset";
import LVCInput from "./lvc-input";
import LVCProgressBar from "./lvc-progress-bar";
import LVCRadio from "./lvc-radio";
import LVCSelect from "./lvc-select";
import LVCTemplate from "./lvc-template";
import LVCCheckbox from "./lvc-checkbox";

export default function HsbcDesignSystem() {
    const [state, setState] = useState<Record<string, string>>({});
    const options = [
        { key: 'option1', value: 'Option 1' },
        { key: 'option2', value: 'Option 2' }
    ];
    return <>
        <LVCTemplate
            productName="Product Name"
            productImage="/public/HSBC_Premier_Debit_Header.png">
            <LVCContainer>
                <LVCProgressBar name='Step Name' currentStep={2} totalSteps={6}></LVCProgressBar>
            </LVCContainer>
            <LVCContainer
                title="Container title"
                instruction="Container instructions">
                <LVCFormElement label="Input" id="input" hint="Hint message">
                    <LVCInput id="input" type="text"
                        value={state['input']}
                        onChange={v => setState({ ...state, input: v })} />
                </LVCFormElement>
                <LVCFormElement label="Input Error" id="error" error="Error message">
                    <LVCInput id="error" type="text" invalid={true} />
                </LVCFormElement>
                <LVCFormElement
                    label="Select"
                    id="select"
                    hint="Hint message">
                    <LVCSelect id="select" options={options}
                        value={state['select']}
                        onChange={v => setState({ ...state, select: v })} />
                </LVCFormElement>
                <LVCFormElement label="Select Error"
                    id="select-error"
                    error="Error message">
                    <LVCSelect id="select-error"
                        options={options}
                        invalid={true}
                        value={state['select']}
                    />
                </LVCFormElement>
                <LVCFormFieldset label="Radio" id="radio" hint="Hint message">
                    <LVCRadio id="radio" options={options}
                        value={state['radio']}
                        onChange={v => setState({ ...state, radio: v })} />
                </LVCFormFieldset>
                <LVCFormFieldset label="Radio Error" id="radio-error" error="Error message">
                    <LVCRadio id="radio-error" options={options} />
                </LVCFormFieldset>
                <LVCFormFieldset label="Date" id="date" hint="Hint message">
                    <LVCDate id="date"
                        value={state['date']}
                        onChange={v => setState({ ...state, date: v })} />
                </LVCFormFieldset>
                <LVCFormFieldset label="Date Error" id="date-error" error="Error message">
                    <LVCDate id="date-error" invalid={true} />
                </LVCFormFieldset>
                <LVCFormElement label="Number" id="number" hint="Hint message">
                    <LVCInput id="number" type="number"
                        value={state['number']}
                        onChange={v => setState({ ...state, number: v })} />
                </LVCFormElement>
                <LVCFormElement id="checkbox" hint="Hint message">
                    <LVCCheckbox id="checkbox"
                        label="Checkbox"
                        value={state['checkbox'] === 'true'}
                        onChange={v => setState({ ...state, checkbox: v + '' })} />
                </LVCFormElement>
            </LVCContainer>
            <LVCContainer>
                <LVCButtonGroup>
                    <LVCButton type="primary" label="Continue" />
                    <LVCButton type="secondary" label="Back" />
                </LVCButtonGroup>
            </LVCContainer>
        </LVCTemplate>
        <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
}
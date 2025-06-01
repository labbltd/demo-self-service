import { useState } from "react";
import HsbcButton from "./hsbc-button";
import HsbcButtonGroup from "./hsbc-button-group";
import HsbcContainer from "./hsbc-container";
import HsbcDate from "./hsbc-date";
import HsbcFormElement from "./hsbc-form-element";
import HsbcFormFieldset from "./hsbc-form-fieldset";
import HsbcInput from "./hsbc-input";
import HsbcProgressBar from "./hsbc-progress-bar";
import HsbcRadio from "./hsbc-radio";
import HsbcSelect from "./hsbc-select";
import HsbcTemplate from "./hsbc-template";
import HsbcCheckbox from "./hsbc-checkbox";

export default function HsbcDesignSystem() {
    const [state, setState] = useState<Record<string, string>>({});
    const options = [
        { key: 'option1', value: 'Option 1' },
        { key: 'option2', value: 'Option 2' }
    ];
    return <>
        <HsbcTemplate
            productName="Product Name"
            productImage="/public/HSBC_Premier_Debit_Header.png">
            <HsbcContainer>
                <HsbcProgressBar name='Step Name' currentStep={2} totalSteps={6}></HsbcProgressBar>
            </HsbcContainer>
            <HsbcContainer
                title="Container title"
                instruction="Container instructions">
                <HsbcFormElement label="Input" id="input" hint="Hint message">
                    <HsbcInput id="input" type="text"
                        value={state['input']}
                        onChange={v => setState({ ...state, input: v.target.value })} />
                </HsbcFormElement>
                <HsbcFormElement label="Input Error" id="error" error="Error message">
                    <HsbcInput id="error" type="text" invalid={true} />
                </HsbcFormElement>
                <HsbcFormElement
                    label="Select"
                    id="select"
                    hint="Hint message">
                    <HsbcSelect id="select" options={options}
                        value={state['select']}
                        onChange={v => setState({ ...state, select: v })} />
                </HsbcFormElement>
                <HsbcFormElement label="Select Error"
                    id="select-error"
                    error="Error message">
                    <HsbcSelect id="select-error"
                        options={options}
                        invalid={true}
                        value={state['select']}
                    />
                </HsbcFormElement>
                <HsbcFormFieldset label="Radio" id="radio" hint="Hint message">
                    <HsbcRadio id="radio" options={options}
                        value={state['radio']}
                        onChange={v => setState({ ...state, radio: v })} />
                </HsbcFormFieldset>
                <HsbcFormFieldset label="Radio Error" id="radio-error" error="Error message">
                    <HsbcRadio id="radio-error" options={options} />
                </HsbcFormFieldset>
                <HsbcFormFieldset label="Date Error" id="date-error" error="Error message">
                    <HsbcDate id="date-error" invalid={true} />
                </HsbcFormFieldset>
                <HsbcFormElement label="Number" id="number" hint="Hint message">
                    <HsbcInput id="number" type="number"
                        value={state['number']}
                        onChange={v => setState({ ...state, number: v.target.value })} />
                </HsbcFormElement>
                <HsbcFormElement id="checkbox" hint="Hint message">
                    <HsbcCheckbox id="checkbox"
                        label="Checkbox"
                        value={state['checkbox'] === 'true'}
                        onChange={v => setState({ ...state, checkbox: v + '' })} />
                </HsbcFormElement>
            </HsbcContainer>
            <HsbcContainer>
                <HsbcButtonGroup>
                    <HsbcButton type="primary" label="Continue" />
                    <HsbcButton type="secondary" label="Back" />
                </HsbcButtonGroup>
            </HsbcContainer>
        </HsbcTemplate>
        <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
}
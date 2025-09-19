import { useState } from "react";
import CmCDropdown from "./cmc-dropdown";
import CmCFormControl from "./cmc-form-control";
import CmCInput from "./cmc-input";

export default function DesignSystem() {
    const [inputValue, setInputValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');

    const options = [{ key: '1', value: 'Optie 1' }];
    return <div>
        <div>
            <h2>Input</h2>
            <CmCInput label="Input" value={inputValue} changed={(v: any) => setInputValue(v.value)} blurred={(v: any) => setInputValue(v.value)} />
            <CmCInput label="Input Help text" helperText="Helper text" value={inputValue} changed={(v: any) => setInputValue(v.value)} blurred={(v: any) => setInputValue(v.value)} />
            <CmCInput label="Input Error" errorMessage="Error message" value={inputValue} changed={(v: any) => setInputValue(v.value)} blurred={(v: any) => setInputValue(v.value)} />
        </div>
        <div>
            <h2>Dropdown</h2>
            <CmCFormControl label="Dropdown">
                <CmCDropdown options={options} value={dropdownValue} selected={(v) => setDropdownValue(v)} />
            </CmCFormControl>
            <CmCFormControl label="Dropdown Help text" helperText="Helper text">
                <CmCDropdown options={options} value={dropdownValue} selected={(v) => setDropdownValue(v)} />
            </CmCFormControl>
            <CmCFormControl label="Dropdown Error" errorMessage="Error message">
                <CmCDropdown options={options} value={dropdownValue} selected={(v) => setDropdownValue(v)} />
            </CmCFormControl>
        </div>
    </div>
}
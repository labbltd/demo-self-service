export default function CmCCheckbox(props: { label: string, errorMessage: string, checked: boolean, toggled: (val: boolean) => void }) {
    return <div className="sc-jXbUNg kdpnEA" data-name="featuresRiskAgreementTextCheck" data-valid="true">
        <div className="sc-imWYAI jCqVct">
            <div className={`CheckboxWithBorder_checkboxWithBorder__mAl4T${props.errorMessage ? ' CheckboxWithBorder_error__o8aI0' : ''}${props.checked ? ' CheckboxWithBorder_checked__SJv55' : ''} sc-fyVfxW gfmrEe`}>
                <label className="sc-bddgXz hgjmhg sc-fyVfxW gfmrEe CheckboxWithBorder_label__pEO" htmlFor="checkboxWithBorder34" onClick={(e) => props.toggled(!props.checked)}>
                    <input id="checkboxWithBorder5" className="CheckboxWithBorder_input__A95B3" type="checkbox" defaultChecked={props.checked} />
                    {props.label}
                </label>
            </div>
        </div>
    </div>
}
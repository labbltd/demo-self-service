import { ChangeEventHandler } from 'react';
import MdsErrorMessage from '../mds-error-message/mds-error-message';
import './mds-text-input.css';

export default function MdsTextInput(props: {
    layout?: string,
    label?: string,
    name?: string,
    variant?: string,
    floatingLabel?: string,
    readOnly?: string,
    placeholder?: string,
    errorMessagePrefix?: string,
    multiline?: string,
    centered?: string,
    hero?: boolean,
    labelStyle?: string,
    previewFormatting?: string,
    characterCount?: boolean,
    inactive?: string,
    autocompleteValue?: string,
    id?: string,
    inputColumns?: string,
    labelColumns?: string,
    value?: string,
    errorMessages?: string,
    characterCountText?: string,
    currencySymbol?: string,
    errorMessage?: string,
    onChange?: ChangeEventHandler,
    onBlur?: ChangeEventHandler,
}) {
    return <div className="mds-text-input mds-text-input--vertical-label">
        <div className="mds-text-input__label-wrap mds-text-input__label-wrap--line">
            <label htmlFor={props.id} className="mds-text-input__label mds-text-input__label--line mds-text-input__label--error">{props.label}</label>
        </div>
        <div className="mds-text-input__input-wrap">
            <input className="mds-text-input__input mds-text-input__input--error mds-text-input__input--line" id="applicant-firstName-input" placeholder="" name="applicant.name.firstName" autoComplete="given-name" type="text" aria-describedby="applicant-firstName-error-text0 " aria-invalid="true" />
            <div className="mds-text-input__error-microcopy-container">
                <div className="mds-text-input__error-microcopy mds-error-message--cmb" >
                    <MdsErrorMessage variant="error" full-width="false" background={false} leadingPadding={0} trailing-padding={0} size="mini" heading-level="2" inverse={false} showsCloseButton={false} read-accessible-text-on-focus="false" hide-icon="false" accessibleTextIcon="text input error icon" alertTitle={props.errorMessage} />
                </div>
                <span id="applicant-firstName-error-text0" className="mds-text-input__error-microcopy-accessible-text--hidden">Error?: {props.errorMessage}</span>
            </div>
        </div>
    </div>
}
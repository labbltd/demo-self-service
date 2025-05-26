import { PContainer } from '@labb/dx-engine';
import { useState } from 'react';

export default function DxDate(props: {
  container: PContainer;
}): JSX.Element {
  const {
    label,
    required,
    value,
    validatemessage,
    helperText
  } = props.container.config;
  const id = props.container.getId();
  const [date, setDate] = useState((value && value.split('-')) || ['', '', '']);

  function updateDate() {
    if (date[0] && date[1] && date[2]) {
      props.container.updateFieldValue(new Date(date.join('-')).toISOString().split('T')[0]);
    }
  }

  if (props.container.config.readOnly) {
    return <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="govuk-summary-list__value">
        {props.container.config.value}
      </dd>
    </div>
  }

  return (
    <div className={"govuk-form-group" + (validatemessage ? " govuk-form-group--error" : "")}>
      <fieldset className="govuk-fieldset" role="group" aria-describedby={(helperText && `${id}-hint`) + (validatemessage && ` ${id}-error`)}>
        <legend className="govuk-fieldset__legend">
          {label}{!required ? ' (Optional)' : ''}
        </legend>
        {helperText && <div id={`${id}-hint`} className="govuk-hint">
          {helperText}
        </div>}
        {validatemessage && <p id={`${id}-error`} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {validatemessage}
        </p>}
        <div className="govuk-date-input" id={id}>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-day`}>
                Day
              </label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                id={`${id}-day`} name={`${id}-day`} type="text"
                value={date[2]} onChange={e => setDate([date[0], date[1], e.target.value])}
                onBlur={e => updateDate()} inputMode="numeric" />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-month`}>
                Month
              </label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                id={`${id}-month`} name={`${id}-month`} type="text"
                value={date[1]} onChange={e => setDate([date[0], e.target.value, date[2]])}
                onBlur={e => updateDate()} inputMode="numeric" />
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-year`}>
                Year
              </label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                id={`${id}-year`} name={`${id}-year`} type="text"
                value={date[0]} onChange={e => setDate([e.target.value, date[1], date[2]])}
                onBlur={e => updateDate()} inputMode="numeric" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

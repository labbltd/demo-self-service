import { PContainer } from '@labb/dx-engine';
import { useEffect, useState } from 'react';

export default function DxDate(props: {
  container: PContainer;
}): JSX.Element {
  const { container } = props;
  const id = props.container.getId();
  const [date, setDate] = useState((container.config.value && container.config.value.split('-')) || ['', '', '']);

  useEffect(() => {
    setDate(toDate());
  }, [container.config.value]);

  function toDate() {
    return (container.config.value && container.config.value.split('-')) || ['', '', '']
  }

  function updateDate() {
    if (date[0] && date[1] && date[2]) {
      const val = new Date(date.join('-')).toISOString().split('T')[0];
      props.container.updateFieldValue(val);
      props.container.triggerFieldChange(val);
    }
  }

  if (props.container.config.readOnly) {
    return <div className="nhsuk-summary-list__row">
      <dt className="nhsuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: props.container.config.value }}>
      </dd>
    </div>
  }

  return (
    <div className={"nhsuk-form-group" + (container.config.validatemessage ? " nhsuk-form-group--error" : "")}>
      <fieldset className="nhsuk-fieldset" role="group" aria-describedby={(container.config.helperText && `${id}-hint`) + (container.config.validatemessage && ` ${id}-error`)}>
        <legend className="nhsuk-fieldset__legend">
          {container.config.label}{!container.config.required ? ' (Optional)' : ''}
        </legend>
        {container.config.helperText && <div id={`${id}-hint`} className="nhsuk-hint">
          {container.config.helperText}
        </div>}
        {container.config.validatemessage && <p id={`${id}-error`} className="nhsuk-error-message">
          <span className="nhsuk-visually-hidden">Error:</span> {container.config.validatemessage}
        </p>}
        <div className="nhsuk-date-input" id={id}>
          <div className="nhsuk-date-input__item">
            <div className="nhsuk-form-group">
              <label className="nhsuk-label nhsuk-date-input__label" htmlFor={`${id}-day`}>
                Day
              </label>
              <input className="nhsuk-input nhsuk-date-input__input nhsuk-input--width-2"
                id={`${id}-day`} name={`${id}-day`} type="text"
                value={date[2]} onChange={e => setDate([date[0], date[1], e.target.value])}
                onBlur={e => updateDate()} inputMode="numeric" />
            </div>
          </div>
          <div className="nhsuk-date-input__item">
            <div className="nhsuk-form-group">
              <label className="nhsuk-label nhsuk-date-input__label" htmlFor={`${id}-month`}>
                Month
              </label>
              <input className="nhsuk-input nhsuk-date-input__input nhsuk-input--width-2"
                id={`${id}-month`} name={`${id}-month`} type="text"
                value={date[1]} onChange={e => setDate([date[0], e.target.value, date[2]])}
                onBlur={e => updateDate()} inputMode="numeric" />
            </div>
          </div>
          <div className="nhsuk-date-input__item">
            <div className="nhsuk-form-group">
              <label className="nhsuk-label nhsuk-date-input__label" htmlFor={`${id}-year`}>
                Year
              </label>
              <input className="nhsuk-input nhsuk-date-input__input nhsuk-input--width-4"
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

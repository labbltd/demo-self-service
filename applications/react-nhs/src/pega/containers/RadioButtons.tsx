import { PContainer } from '@labb/dx-engine';

export default function RadioButtons(props: { container: PContainer }) {
  const { label, required, datasource, value, readOnly, helperText, validatemessage, fieldMetadata } = props.container.config;
  const id = props.container.getId();
  const options = (datasource || fieldMetadata?.datasource.records) || [];
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  if (props.container.config.readOnly) {
    return <div className="nhsuk-summary-list__row">
      <dt className="nhsuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="nhsuk-summary-list__value">
        {props.container.config.value}
      </dd>
    </div>
  }

  return (
    <div className={"nhsuk-form-group" + (validatemessage ? " nhsuk-form-group--error" : "")}>
      <fieldset className="nhsuk-fieldset">
        <legend className="nhsuk-fieldset__legend">
          {label}{!required ? ' (Optional)' : ''}
        </legend>
        {helperText && <div className="nhsuk-hint">
          {helperText}
        </div>}
        {validatemessage && <p className="nhsuk-error-message">
          <span className="nhsuk-visually-hidden">Error:</span> {validatemessage}
        </p>}
        <div className="nhsuk-radios nhsuk-radios--inline" data-module="nhsuk-radios">
          {options.map(
            (option: { key: string; value: string }) => (
              <div className="nhsuk-radios__item" key={option.key} >
                <input
                  className="nhsuk-radios__input" id={`${id}.${option.key}`} name={id}
                  type="radio"
                  onChange={
                    (e) => {
                      props.container.updateFieldValue(getValue(e.target));
                      props.container.triggerFieldChange(getValue(e.target))
                    }
                  }
                  checked={value === option.key}
                  value={option.key}
                  readOnly={readOnly}
                  disabled={readOnly}
                />{' '}
                <label className="nhsuk-label nhsuk-radios__label" htmlFor={`${id}.${option.key}`}>
                  {option.value}
                </label>
              </div>
            )
          )}
        </div>
      </fieldset>
    </div>
  );
}

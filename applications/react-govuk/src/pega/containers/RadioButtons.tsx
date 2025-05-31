import { PContainer } from '@labb/dx-engine';

export default function RadioButtons(props: { container: PContainer }) {
  const { label, required, datasource, value, readOnly, helperText, validatemessage, fieldMetadata } = props.container.config;
  const id = props.container.getId();
  const options = (datasource || fieldMetadata?.datasource.records) || [];
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  } 

  return (
    <div className={"govuk-form-group" + (validatemessage ? " govuk-form-group--error" : "")}>
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend">
          {label}{!required ? ' (Optional)' : ''}
        </legend>
        {helperText && <div className="govuk-hint">
          {helperText}
        </div>}
        {validatemessage && <p className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {validatemessage}
        </p>}
        <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
          {options.map(
            (option: { key: string; value: string }) => (
              <div className="govuk-radios__item" key={option.key} >
                <input
                  className="govuk-radios__input" id={`${id}.${option.key}`} name={id}
                  type="radio"
                  onChange={(e) =>
                    props.container.updateFieldValue(getValue(e.target))
                  }
                  onBlur={(e) =>
                    props.container.triggerFieldChange(getValue(e.target))
                  }
                  checked={value === option.key}
                  value={option.key}
                  readOnly={readOnly}
                  disabled={readOnly}
                />{' '}
                <label className="govuk-label govuk-radios__label" htmlFor={`${id}.${option.key}`}>
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

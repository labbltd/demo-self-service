import { PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';

export default function TextInput(props: {
  container: PContainer;
}): JSX.Element {
  const {
    fieldMetadata,
    precision,
    label,
    required,
    value,
    readOnly,
    validatemessage,
    helperText
  } = props.container.config;
  const id = props.container.getId();

  function type(): HTMLInputTypeAttribute {
    switch (fieldMetadata?.type) {
      case 'Decimal':
        return 'number';
      case 'Integer':
        return 'number';
      case 'True-False':
        return 'checkbox';
      case 'Date Time':
        return 'datetime-local';
      case 'Date':
        return 'date';
      case 'TimeOfDay':
        return 'time';
      case 'Text':
        switch (fieldMetadata?.displayAs) {
          case 'pxEmail':
            return 'email';
          default:
            return 'text';
        }
      default:
        return 'text';
    }
  }

  function inputmode():
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined {
    switch (fieldMetadata?.type) {
      case 'Decimal':
        return 'decimal';
      case 'Percentage':
        return 'decimal';
      case 'Integer':
        return 'numeric';
      default:
        return undefined;
    }
  }

  function step(): string | number | undefined {
    switch (fieldMetadata?.type) {
      case 'Decimal':
      case 'Percentage':
        return '0.' + '1'.padStart(precision ?? 2, '0');
      case 'Integer':
        return 1;
      default:
        return undefined;
    }
  }

  function getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate;
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }

  return (
    <div className={"govuk-form-group" + (validatemessage ? " govuk-form-group--error" : "")}>
      <label className="govuk-label" htmlFor={id}>
        {label}{!required ? ' (Optional)' : ''}
      </label>
      {helperText && <div className="govuk-hint">
        {helperText}
      </div>}
      {validatemessage && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {validatemessage}
      </p>}
      <input className="govuk-input" name={id}
        type={type()}
        inputMode={inputmode()}
        step={step()}
        value={value}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
        onChange={(e) => props.container.updateFieldValue(getValue(e.target))}
        onBlur={(e) => props.container.triggerFieldChange(getValue(e.target))}
      />
    </div>
  );
}

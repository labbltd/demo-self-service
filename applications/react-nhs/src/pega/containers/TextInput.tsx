import { formatters, PContainer } from '@labb/dx-engine';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

export default function TextInput(props: {
  container: PContainer;
}): JSX.Element {
  const [value, setValue] = useState<any>(props.container.config.value);
  const {
    fieldMetadata,
    precision,
    label,
    required,
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
  function format(value: any) {
    if (type() === 'date') return formatters.Date(value);
    if (type() === 'datetime-local') return formatters.DateTime(value);
    if (type() === 'time') return formatters.Time(value);
    if (type() === 'number' && props.container.config.currencyISOCode) return formatters.Currency(value);
    return value;
  }

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (type() !== 'date') {
      props.container.updateFieldValue(getValue(event.target))
    }
    setValue(getValue(event.target));
  }

  function blur(event: ChangeEvent<HTMLInputElement>) {
    if (type() === 'date') {
      props.container.updateFieldValue(getValue(event.target))
    }
    props.container.triggerFieldChange(getValue(event.target))
  }

  if (props.container.config.readOnly) {
    return <div className="nhsuk-summary-list__row">
      <dt className="nhsuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: format(props.container.config.value) }}>
      </dd>
    </div>
  }
  return (
    <div className={"nhsuk-form-group" + (validatemessage ? " nhsuk-form-group--error" : "")}>
      <label className="nhsuk-label" htmlFor={id}>
        {label}{!required ? ' (Optional)' : ''}
      </label>
      {helperText && <div className="nhsuk-hint">
        {helperText}
      </div>}
      {validatemessage && <p className="nhsuk-error-message">
        <span className="nhsuk-visually-hidden">Error:</span> {validatemessage}
      </p>}
      <input className="nhsuk-input" name={id} id={id}
        type={type()}
        inputMode={inputmode()}
        step={step()}
        value={props.container.config.value}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
        onChange={e => change(e)}
        onBlur={e => blur(e)}
      />
    </div>
  );
}

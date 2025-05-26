import { PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';
import TextInput from '../../design-system/cb-text-input';

export default function DxTextInput(props: {
  container: PContainer;
}): JSX.Element {
  function type(): HTMLInputTypeAttribute {
    switch (props.container.config.fieldMetadata?.type) {
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
        switch (props.container.config.fieldMetadata?.displayAs) {
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
    switch (props.container.config.fieldMetadata?.type) {
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
    switch (props.container.config.fieldMetadata?.type) {
      case 'Decimal':
      case 'Percentage':
        return '0.' + '1'.padStart(props.container.config.precision ?? 2, '0');
      case 'Integer':
        return 1;
      default:
        return undefined;
    }
  }

  function getValue(
    target: EventTarget | null
  ): number | boolean | string | undefined {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate?.toISOString().split('T')[0];
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <>
    <TextInput id={props.container.id} label={props.container.config.label} type={type()}
      onChange={(e) => props.container.updateFieldValue(getValue(e.target))}
      onBlur={(e) => props.container.triggerFieldChange(getValue(e.target))} />
    {/* <label htmlFor={props.container.id}>
      {props.container.config.label}
      {props.container.config.required ? ' *' : ''}
      {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
    </label>
    <input
      id={props.container.id}
      type={type()}
      inputMode={inputmode()}
      step={step()}
      value={props.container.config.value}
      readOnly={props.container.config.readOnly}
      disabled={props.container.config.readOnly}
      required={props.container.config.required}
      onChange={(e) => props.container.updateFieldValue(getValue(e.target))}
      onBlur={(e) => props.container.triggerFieldChange(getValue(e.target))}
    />
    {props.container.config.validatemessage} */}
  </>;
}

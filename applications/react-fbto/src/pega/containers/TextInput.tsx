import { DefaultProps } from '@labb/constellation-core-types';
import { formatters, PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';
import TextInput from '../../design-system/fbto-text-input';

export default function DxTextInput(props: {
  container: PContainer<DefaultProps & { precision: number }>
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
        return t.value.split('-').reverse().join('-');
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
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{format(props.container.config.value) ?? '--'}</dd></>;
  }
  return <>
    <TextInput id={props.container.id}
      errorMessage={props.container.config.validatemessage}
      helperMessage={props.container.config.helperText}
      placeholder={type() === 'date' ? 'DD-MM-JJJJ' : props.container.config.placeholder}
      type={type()}
      step={step()}
      inputmode={inputmode()}
      label={props.container.config.label}
      required={props.container.config.required}
      value={props.container.config.value.split('-').reverse().join('-')}
      onChange={(e) => props.container.updateFieldValue(getValue(e.target) ?? (e.target as any).value)}
      onBlur={(e) => props.container.triggerFieldChange(getValue(e.target) ?? (e.target as any).value)}
    />
  </>
}

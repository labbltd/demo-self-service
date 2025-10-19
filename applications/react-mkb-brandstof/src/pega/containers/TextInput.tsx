import { formatters, PContainer } from '@labb/dx-engine';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import { TextInput } from '../../design-system/design';

export default function DxTextInput(props: {
  container: PContainer;
}): JSX.Element {
  const [value, setValue] = useState<any>(props.container.config.value);

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
  ): number | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate?.toISOString().split('T')[0] || '';
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
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
    <TextInput
      name={props.container.id}
      value={props.container.config.value}
      label={props.container.config.label}
      type={type()}
      onChange={(e) => { change(e) }}
      placeholder={props.container.config.placeholder}
      required={props.container.config.required}
      error={props.container.config.validatemessage}
      disabled={props.container.config.disabled}
      id={props.container.id}
    />
  </>;
}

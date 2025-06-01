import { formatters, PContainer } from '@labb/dx-engine';
import HsbcFormElement from 'applications/react-hsbc/design-system/hsbc-form-element';
import HsbcInput from 'applications/react-hsbc/design-system/hsbc-input';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

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

  return <HsbcFormElement
    label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}
  >
    <HsbcInput id={props.container.id}
      type={type()}
      invalid={props.container.config.validatemessage}
      value={value}
      onChange={e => change(e)}
      onBlur={e => blur(e)}
    />
  </HsbcFormElement>
}

import { formatters, PContainer } from '@labb/dx-engine';
import HsbcFormElement from 'applications/react-hsbc/design-system/hsbc-form-element';
import HsbcInput from 'applications/react-hsbc/design-system/hsbc-input';
import { HTMLInputTypeAttribute } from 'react';

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
      value={props.container.config.value}
      onChange={v => props.container.updateFieldValue(v)}
      onBlur={v => props.container.triggerFieldChange(v)}
    />
  </HsbcFormElement>
}

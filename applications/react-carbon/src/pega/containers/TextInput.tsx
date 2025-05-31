import { TextInput } from '@carbon/react';
import { formatters, PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';

export default function DxTextInput(props: { container: PContainer }): JSX.Element {
  const { container } = props;

  function onChange(value: number | Date | boolean | string | null) {
    props.container.updateFieldValue(value)
  }

  function onBlur(value: number | Date | boolean | string | null) {
    props.container.triggerFieldChange(value)
  }

  function type(): HTMLInputTypeAttribute {
    switch (container.config.fieldMetadata?.type) {
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
        switch (container.config.fieldMetadata?.displayAs) {
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
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate?.toISOString().split('T')[0] ?? null;
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
  return (
    <TextInput
      id={container.config.label}
      type={type()}
      labelText={container.config.label}
      helperText={container.config.helperText}
      invalid={!!container.config.validatemessage}
      invalidText={container.config.validatemessage}
      value={container.config.value}
      onChange={e => onChange(getValue(e.target))}
      onBlur={e => onBlur(getValue(e.target))}
    />
  );
}

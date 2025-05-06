import { PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';
import { TextInput } from '@carbon/react';

export default function DxTextInput(props: { container: PContainer }): JSX.Element {
  const { label, helperText, validatemessage, fieldMetadata } = props.container.config;

  function onChange(value: number | Date | boolean | string | null) {
    props.container.updateFieldValue(value)
  }

  function onBlur(value: number | Date | boolean | string | null) {
    props.container.triggerFieldChange(value)
  }

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

  return (
    <TextInput
      id={label}
      type={type()}
      labelText={label}
      helperText={helperText}
      invalid={!!validatemessage}
      invalidText={validatemessage}
      onChange={e => onChange(getValue(e.target))}
      onBlur={e => onBlur(getValue(e.target))}
    />
  );
}

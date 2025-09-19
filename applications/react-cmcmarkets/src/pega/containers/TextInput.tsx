import { PContainer } from '@labb/dx-engine';
import { HTMLInputTypeAttribute } from 'react';
import CmCInput from '../../cmc-design/cmc-input';

export default function TextInput(props: {
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

  return <CmCInput
    label={props.container.config.label}
    value={props.container.config.value}
    inputmode={inputmode()}
    step={step()}
    type={type()}
    fullwidth={props.container.config.fieldMetadata.classID === 'OWXZJQ-Workflow-Work-CMCEnquire'}
    readOnly={props.container.config.readOnly}
    required={props.container.config.required}
    helperText={props.container.config.helperText}
    errorMessage={props.container.config.validatemessage}
    blurred={t => props.container.triggerFieldChange(getValue(t))}
    changed={t => props.container.updateFieldValue(getValue(t))}
  />;
}

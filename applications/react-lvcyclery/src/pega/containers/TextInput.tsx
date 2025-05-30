import { PContainer } from '@labb/dx-engine';
import LVCFormElement from 'applications/react-lvcyclery/design-system/lvc-form-element';
import LVCInput from 'applications/react-lvcyclery/design-system/lvc-input';
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

  return <LVCFormElement
    label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}
  >
    <LVCInput id={props.container.id}
      type={type()}
      invalid={props.container.config.validatemessage}
      value={props.container.config.value}
      onChange={v => props.container.updateFieldValue(v)}
      onBlur={v => props.container.triggerFieldChange(v)}
      readonly={props.container.config.readOnly}
    />
  </LVCFormElement>
}

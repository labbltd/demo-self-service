import { PContainer } from '@labb/dx-engine';
import HsbcDate from 'applications/react-hsbc/design-system/hsbc-date';
import HsbcFormElement from 'applications/react-hsbc/design-system/hsbc-form-element';

export default function DxTextInput(props: {
  container: PContainer;
}): JSX.Element {
  return <HsbcFormElement
    label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}
  >
    <HsbcDate id={props.container.id}
      invalid={props.container.config.validatemessage}
      value={props.container.config.value}
      onChange={v => props.container.updateFieldValue(v)}
      onBlur={v => props.container.triggerFieldChange(v)} />
  </HsbcFormElement>
}

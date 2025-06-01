import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import HsbcFormElement from 'applications/react-hsbc/design-system/hsbc-form-element';
import HsbcSelect from 'applications/react-hsbc/design-system/hsbc-select';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <HsbcFormElement
    label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}
    >
    <HsbcSelect id={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      onChange={v => {
        props.container.updateFieldValue(v);
        props.container.triggerFieldChange(v);
      }} />
  </HsbcFormElement>
}

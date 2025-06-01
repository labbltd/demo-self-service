import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import LVCFormElement from 'applications/react-lvcyclery/design-system/lvc-form-element';
import LVCSelect from 'applications/react-lvcyclery/design-system/lvc-select';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  return <LVCFormElement
    label={props.container.config.label}
    id={props.container.id}
    error={props.container.config.validatemessage}
    hint={props.container.config.helperText}>
    <LVCSelect id={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      readonly={props.container.config.readOnly}
      onChange={v => {
        props.container.updateFieldValue(v);
        props.container.triggerFieldChange(v);
      }} />
  </LVCFormElement>
}

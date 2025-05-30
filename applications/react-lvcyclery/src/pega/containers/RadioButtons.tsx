import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import LVCFormFieldset from 'applications/react-lvcyclery/design-system/lvc-form-fieldset';
import LVCRadio from 'applications/react-lvcyclery/design-system/lvc-radio';

export default function DxRadioButtons(props: { container: PContainer<PicklistProps> }) {
  return <LVCFormFieldset label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}>
    <LVCRadio id={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      onChange={v => {
        props.container.updateFieldValue(v)
        props.container.triggerFieldChange(v)
      }} />
  </LVCFormFieldset>
}

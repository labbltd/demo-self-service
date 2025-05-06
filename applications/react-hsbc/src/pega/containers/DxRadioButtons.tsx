import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import HsbcFormFieldset from 'applications/react-hsbc/design-system/hsbc-form-fieldset';
import HsbcRadio from 'applications/react-hsbc/design-system/hsbc-radio';

export default function DxRadioButtons(props: { container: PContainer<PicklistProps> }) {
  return <HsbcFormFieldset label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}>
    <HsbcRadio id={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      onChange={v => {
        props.container.updateFieldValue(v)
        props.container.triggerFieldChange(v)
      }} />
  </HsbcFormFieldset>
}

import { PContainer } from '@labb/dx-engine';
import VmSelect from '../../design-system/components/select';

export default function DxDropdown(props: { container: PContainer }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <>
    <VmSelect
      options={props.container.config.datasource}
      label={props.container.config.label}
      value={props.container.config.value}
      disabled={props.container.config.disabled}
      errorMessage={props.container.config.validatemessage}
      infoMessage={props.container.config.helperText}
      onChange={value => {
        props.container.updateFieldValue(value)
        props.container.triggerFieldChange(value)
      }}
    />
  </>
}

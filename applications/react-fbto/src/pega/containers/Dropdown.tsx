import { PContainer } from '@labb/dx-engine';
import TextInput from '../../design-system/fbto-text-input';
import { PicklistProps } from '@labb/constellation-core-types';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <>
    <TextInput id={props.container.id}
      errorMessage={props.container.config.validatemessage}
      helperMessage={props.container.config.helperText}
      placeholder={props.container.config.placeholder}
      type={'select'}
      options={props.container.config.datasource.map(d => d.value)}
      label={props.container.config.label}
      required={props.container.config.required}
      value={props.container.config.value.split('-').reverse().join('-')}
      onChange={(e) => props.container.updateFieldValue((e.target as any).value)}
      onBlur={(e) => props.container.triggerFieldChange((e.target as any).value)}
    />
  </>
}

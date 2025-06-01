import { PContainer } from '@labb/dx-engine';
import TextInput from '../../design-system/cb-text-input';
import { PicklistProps } from '@labb/constellation-core-types';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  const { container } = props;
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <TextInput id={props.container.id}
    label={props.container.config.label} type={'select'}
    options={props.container.config.datasource.map(s => s.key)}
    error={props.container.config.validatemessage}
    value={container.config.value}
    onChange={(event) => {
      props.container.updateFieldValue((event.target as any).value);
      props.container.triggerFieldChange((event.target as any).value);
    }} />
}

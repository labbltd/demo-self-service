import { PContainer } from '@labb/dx-engine';

import {
  Select,
  SelectItem
} from '@carbon/react';
import { PicklistProps } from '@labb/constellation-core-types';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  const { container } = props;

  function onChange(value: string) {
    props.container.updateFieldValue(value);
    props.container.triggerFieldChange(value);
  }
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return (
    <Select
      id={container.config.label}
      defaultValue="Select..."
      value={container.config.value}
      labelText={container.config.label}
      helperText={container.config.helperText}
      invalid={!!container.config.validatemessage}
      invalidText={container.config.validatemessage}
      onChange={e => onChange(e.target.value)}>
      {container.config.datasource.map(option => (
        <SelectItem
          key={option.key}
          value={option.key}
          text={option.value}
        />
      ))}
    </Select>
  );
}

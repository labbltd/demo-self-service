import { PContainer } from '@labb/dx-engine';

import {
  Select,
  SelectItem
} from '@carbon/react';

interface DropdownConfig {
  label: string;
  helperText: string;
  validatemessage: string;
  datasource: { key: string, value: string }[];
  visibility: boolean;
}

export default function DxDropdown(props: { container: PContainer<DropdownConfig> }) {
  const { label, helperText, validatemessage, datasource } = props.container.config;

  function onChange(value: string) {
    props.container.updateFieldValue(value);
    props.container.triggerFieldChange(value);
  }

  return (
    <Select
      id={label}
      defaultValue="Select..."
      labelText={label}
      helperText={helperText}
      invalid={!!validatemessage}
      invalidText={validatemessage}
      onChange={e => onChange(e.target.value)}>
      {datasource.map(option => (
        <SelectItem
          key={option.key}
          value={option.key}
          text={option.value}
        />
      ))}
    </Select>
  );
}

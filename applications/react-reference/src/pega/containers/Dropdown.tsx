import { PContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: PContainer }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <label>
    {props.container.config.label}
    {props.container.config.required ? ' *' : ''}
    <select
      onChange={(e) => props.container.updateFieldValue(e.target.value)}
      onBlur={(e) => props.container.triggerFieldChange(e.target.value)}
      disabled={props.container.config.readOnly}
      value={props.container.config.value}
    >
      <option value="" disabled={props.container.config.required}>
        Select...
      </option>
      {props.container.config.datasource.map(
        (option: { key: string; value: string }) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        )
      )}
    </select>
    {props.container.config.helperText}
    {props.container.config.validatemessage}
  </label>
}

import { PContainer } from '@labb/dx-engine';

export default function Dropdown(props: { container: PContainer }) {
  return (
    <label>
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
      {/* <pre>{JSON.stringify(props.container.config)}</pre> */}
    </label>
  );
}

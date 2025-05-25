import { PContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: PContainer }) {
  // get properties as configured in Pega
  const {
    label,
    required,
    readOnly,
    value,
    datasource,
    helperText,
    validatemessage
  } = props.container.config;
  const id = props.container.getId();

  // return a component styled using the Gov UK Design system
  return (
    <div className="nhsuk-form-group">
      <label className="nhsuk-label" htmlFor={id}>
        {label}{!required ? ' (Optional)' : ''}
      </label>
      {helperText && <div id={`${id}-hint`} className="nhsuk-hint">
        {helperText}
      </div>}
      {validatemessage && <p className="nhsuk-error-message">
        <span className="nhsuk-visually-hidden">Error:</span> {validatemessage}
      </p>}
      <select className="nhsuk-select" id={id} name={id} aria-describedby={`${id}-hint`}
        onChange={(e) => props.container.updateFieldValue(e.target.value)}
        onBlur={(e) => props.container.triggerFieldChange(e.target.value)}
        disabled={readOnly}
        value={value}
      >
        <option value="" disabled={required}>
          Select...
        </option>
        {datasource.map(
          (option: { key: string; value: string }) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          )
        )}
      </select>
    </div>
  );
}  

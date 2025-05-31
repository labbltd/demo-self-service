import { PContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: PContainer }) {
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

  if (props.container.config.readOnly) {
    return <div className="nhsuk-summary-list__row">
      <dt className="nhsuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: props.container.config.value }}>
      </dd>
    </div>
  }

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

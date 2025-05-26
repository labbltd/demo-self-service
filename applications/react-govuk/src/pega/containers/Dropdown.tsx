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
    return <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="govuk-summary-list__value">
        {props.container.config.value}
      </dd>
    </div>
  }

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={id}>
        {label}{!required ? ' (Optional)' : ''}
      </label>
      {helperText && <div id={`${id}-hint`} className="govuk-hint">
        {helperText}
      </div>}
      {validatemessage && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {validatemessage}
      </p>}
      <select className="govuk-select" id={id} name={id} aria-describedby={`${id}-hint`}
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

import { PContainer } from '@labb/dx-engine';

export default function DxDropdown(props: { container: PContainer }) {
  const { container } = props;
  const id = container.getId();

  if (container.config.readOnly) {
    return <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key govuk-body">
        {container.config.label}
      </dt>
      <dd className="govuk-summary-list__value govuk-body">
        {container.config.value}
      </dd>
    </div>
  }

  return (
    <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
      <label className="govuk-label" htmlFor={id}>
        {container.config.label}{!container.config.required ? ' (Optional)' : ''}
      </label>
      {container.config.helperText && <div id={`${id}-hint`} className="govuk-hint">
        {container.config.helperText}
      </div>}
      {container.config.validatemessage && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
      </p>}
      <select className="govuk-select" id={id} name={id} aria-describedby={`${id}-hint`}
        onChange={(e) => {
          container.updateFieldValue(e.target.value);
          container.triggerFieldChange(e.target.value);
        }}
        value={container.config.value}
      >
        <option value="" disabled={container.config.required}>
          Select...
        </option>
        {container.config.datasource.map(
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

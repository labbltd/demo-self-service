import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  const { caption, label, required, helperText, validatemessage } = props.container.config;
  const id = props.container.getId();

  function onChange(val: boolean) {
    props.container.updateFieldValue(val);
    props.container.triggerFieldChange(val);
  }
  if (props.container.config.readOnly) {
    return <div className="nhsuk-summary-list__row">
      <dt className="nhsuk-summary-list__key">
        {props.container.config.label}
      </dt>
      <dd className="nhsuk-summary-list__value">
        {props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}
      </dd>
    </div>
  }
  return (
    <div className={"nhsuk-form-group" + (validatemessage ? " nhsuk-form-group--error" : "")}>
      <div className="nhsuk-checkboxes__item">
        {label}
        <input className="nhsuk-checkboxes__input" id={id} name={id} type="checkbox" value={caption} onChange={(e) => onChange(e.target.checked)} />
        <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={id}>
          {caption}
        </label>
        {helperText && <div className="nhsuk-hint">
          {helperText}
        </div>}
        {validatemessage && <p className="nhsuk-error-message">
          <span className="nhsuk-visually-hidden">Error:</span> {validatemessage}
        </p>}
      </div>
    </div>
  );
}

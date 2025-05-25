import { PContainer } from '@labb/dx-engine';

export default function TextArea(props: {
  container: PContainer;
}): JSX.Element {
  const {
    label,
    required,
    value,
    readOnly,
    validatemessage,
    helperText
  } = props.container.config;
  const id = props.container.getId();

  function getValue(
    target: EventTarget | null
  ): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    return t.value;
  }

  return (
    <div className={"nhsuk-form-group" + (validatemessage ? " nhsuk-form-group--error" : "")}>
      <label className="nhsuk-label" htmlFor={id}>
        {label}{!required ? ' (Optional)' : ''}
      </label>
      {helperText && <div className="nhsuk-hint">
        {helperText}
      </div>}
      {validatemessage && <p className="nhsuk-error-message">
        <span className="nhsuk-visually-hidden">Error:</span> {validatemessage}
      </p>}
      <textarea
        className="nhsuk-textarea"
        name={id}
        rows={5}
        aria-describedby="example-hint"
        value={value}
        readOnly={readOnly}
        disabled={readOnly}
        required={required}
        onChange={(e) => props.container.updateFieldValue(getValue(e.target))}
        onBlur={(e) => props.container.triggerFieldChange(getValue(e.target))}></textarea>
    </div>
  );
}

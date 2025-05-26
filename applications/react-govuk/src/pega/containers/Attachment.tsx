import { Attachment } from '@labb/dx-engine';

export default function DxAttachment(props: {
  container: Attachment;
}): JSX.Element {
  const error = props.container.config.validatemessage;
  return (
    <div className={"govuk-form-group" + (error ? ' govuk-form-group--error' : '')}>
      <label className="govuk-label" htmlFor={props.container.id}>
        {props.container.config.label}
      </label>
      {error && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error}
      </p>}
      <input className={"govuk-file-upload" + (error ? ' govuk-file-upload--error' : '')} id={props.container.id} name={props.container.id} type="file"
        onChange={(e) => props.container.uploadFile(e as unknown as Event)}
      />
      {props.container.config.helperText}
      {props.container.config.validatemessage}
    </div>
  );
}

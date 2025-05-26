import { Attachment } from '@labb/dx-engine';

export default function DxAttachment(props: {
  container: Attachment;
}): JSX.Element {
  const error = props.container.config.validatemessage;
  return (
    <div className={"nhsuk-form-group" + (error ? ' nhsuk-form-group--error' : '')}>
      <label className="nhsuk-label" htmlFor={props.container.id}>
        {props.container.config.label}
      </label>
      {error && <p className="nhsuk-error-message">
        <span className="nhsuk-visually-hidden">Error:</span> {error}
      </p>}
      <input className={"nhsuk-file-upload" + (error ? ' nhsuk-file-upload--error' : '')} id={props.container.id} name={props.container.id} type="file"
        onChange={(e) => props.container.uploadFile(e as unknown as Event)}
      />
      {props.container.config.helperText}
      {props.container.config.validatemessage}
    </div>
  );
}

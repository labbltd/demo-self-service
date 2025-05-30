import { Attachment } from '@labb/dx-engine';

export default function DxAttachment(props: {
  container: Attachment;
}): JSX.Element {
  return (
    <label>
      {props.container.config.caption}
      {props.container.config.required ? ' *' : ''}
      <input
        type="file"
        onChange={(e) => props.container.uploadFile(e as unknown as Event)}
      />
      {props.container.config.helperText}
      {props.container.config.validatemessage}
    </label>
  );
}

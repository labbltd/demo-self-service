import { Attachment as PAttachment } from '@labb/dx-engine';

export default function Attachment(props: {
  container: PAttachment;
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
      {props.container.config.validatemessages}
    </label>
  );
}

import { Attachment } from '@labb/dx-engine';
import { useState } from 'react';
import TextInput from '../../design-system/fbto-text-input';

export default function DxAttachment(props: {
  container: Attachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const { container } = props;
  return <>
    <TextInput id={props.container.id}
      errorMessage={props.container.config.validatemessage}
      helperMessage={props.container.config.helperText}
      placeholder={props.container.config.placeholder}
      type="file"
      label={props.container.config.label}
      required={props.container.config.required}
      onChange={async (e) => {
        await container.uploadFile(e as unknown as Event);
        setDownloadedImage(URL.createObjectURL((e.target as any).files[0]))
      }}
    />
    {
      downloadedImage &&
      <img width="100%" src={downloadedImage} />
    }
  </>;
}

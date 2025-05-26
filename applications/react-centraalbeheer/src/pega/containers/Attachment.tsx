import { Attachment as PAttachment } from '@labb/dx-engine';
import { useState } from 'react';
import TextInput from '../../design-system/cb-text-input';

export default function Attachment(props: {
  container: PAttachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const { container } = props;
  return <>
    <TextInput id={props.container.id}
      label={props.container.config.label}
      type={'file'}
      onChange={(e) => {
        container.uploadFile(e as unknown as Event);
        setDownloadedImage(URL.createObjectURL((e.target as any).files[0]))
      }}
    />
    {
      downloadedImage &&
      <img width="100%" src={downloadedImage} />
    }
  </>;
}

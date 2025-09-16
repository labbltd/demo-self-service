import { FileStatus, Attachment as PAttachment } from '@labb/dx-engine';
import { useRef, useState } from 'react';
import { BOIAttachment } from '../design-system/attachment';

export default function Attachment(props: {
  container: PAttachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const { container } = props;
  const dialog = useRef<HTMLDialogElement>(null);

  async function preview(file: FileStatus) {
    if (file.linked) {
      setDownloadedImage('data:image/png;base64,' + await container.downloadFile(file.id))
    } else {
      setDownloadedImage(file.src);
    }
    dialog.current?.showModal();
  }

  return <>
    <BOIAttachment id={container.id}
      label={props.container.config.label}
      errorMessage={props.container.config.validatemessage  }
      files={container.files.map(file => ({ id: file.id, name: file.name, size: container.formatBytes(file.size!), type: file.type }))}
      deleteFile={async file => await container.removeFile(file.id)}
      uploadFile={async event => await container.uploadFile(event as unknown as Event)} />
  </>;
}

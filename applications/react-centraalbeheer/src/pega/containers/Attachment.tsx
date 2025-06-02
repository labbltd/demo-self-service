import { FileStatus, Attachment as PAttachment } from '@labb/dx-engine';
import { useRef, useState } from 'react';
import TextInput from '../../design-system/cb-text-input';

export default function Attachment(props: {
  container: PAttachment;
}): JSX.Element {
   const { container } = props;
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
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
    <TextInput id={props.container.id}
      label={props.container.config.label}
      type={'file'}
      multiple={props.container.config.allowMultiple === 'true'}
      onChange={(e) => {
        container.uploadFile(e as unknown as Event);
      }}
    />
    {
      container.files.length > 0 &&
      <table>
        <tbody>
          {container.files.map(file =>
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{container.formatBytes(file.size!)}</td>
              <td>{file.type}</td>
              <td>{file.progress}%</td>
              <td>
                <button type="button" onClick={() => container.removeFile(file.id)}>Delete</button>
                {file.type.startsWith('image') && <button type="button" onClick={async () => preview(file)}>Preview</button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    }
    <dialog ref={dialog}>
      <button type="button" onClick={async () => dialog.current?.close()}>Close</button>
      <img width="100%" src={downloadedImage} />
    </dialog>
  </>;
}

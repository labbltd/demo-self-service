import { Attachment, FileStatus } from '@labb/dx-engine';
import { useRef, useState } from 'react';
import TextInput from '../../design-system/fbto-text-input';

export default function DxAttachment(props: {
  container: Attachment;
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
      errorMessage={props.container.config.validatemessage}
      helperMessage={props.container.config.helperText}
      placeholder={props.container.config.placeholder}
      type="file"
      multiple={props.container.config.allowMultiple === 'true'}
      label={props.container.config.label}
      required={props.container.config.required}
      onChange={async (e) => {
        await container.uploadFile(e as unknown as Event);
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

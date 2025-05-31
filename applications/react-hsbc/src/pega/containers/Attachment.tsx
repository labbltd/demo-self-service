import { Attachment, FileStatus } from '@labb/dx-engine';
import HsbcFormElement from 'applications/react-hsbc/design-system/hsbc-form-element';
import HsbcInput from 'applications/react-hsbc/design-system/hsbc-input';
import { useRef, useState } from 'react';

export default function DxAttachment(props: {
  container: Attachment;
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
    <HsbcFormElement
      label={props.container.config.label}
      id={props.container.id}
      hint={props.container.config.helperText}
      error={props.container.config.validatemessage}
    >
      {((container.config.allowMultiple === 'true' || !container.files.length) &&
        <HsbcInput id={props.container.id}
          type="file"
          invalid={!!props.container.config.validatemessage}
          multiple={container.config.allowMultiple === 'true'}
          onChange={(e) => props.container.uploadFile(e as unknown as Event)}
        />) || <></>
      }
    </HsbcFormElement>
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
  </>
}

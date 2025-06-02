import { FileStatus, Attachment as PAttachment } from '@labb/dx-engine';
import LVCButton from 'applications/react-lvcyclery/design-system/lvc-button';
import LVCButtonGroup from 'applications/react-lvcyclery/design-system/lvc-button-group';
import LVCFormElement from 'applications/react-lvcyclery/design-system/lvc-form-element';
import LVCInput from 'applications/react-lvcyclery/design-system/lvc-input';
import { useRef, useState } from 'react';

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
    <LVCFormElement
      label={props.container.config.label}
      id={props.container.id}
      hint={props.container.config.helperText}
      error={props.container.config.validatemessage}
    >
      {(container.config.allowMultiple === 'true' || !container.files.length) ?
        <LVCInput id={props.container.id}
          type={'file'}
          invalid={!!props.container.config.validatemessage}
          onChange={e => container.uploadFile(e as unknown as Event)}
          readonly={props.container.config.readOnly}
          multiple={container.config.allowMultiple === 'true'}
        /> : <div></div>}
    </LVCFormElement>
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
                <LVCButtonGroup>
                  <LVCButton
                    type="secondary"
                    label={'Delete'}
                    onClick={() => container.removeFile(file.id)}
                  />
                  {file.type.startsWith('image') ? <LVCButton
                    type="secondary"
                    label={'Preview'}
                    onClick={() => preview(file)}
                  /> : <div></div>}
                </LVCButtonGroup>
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

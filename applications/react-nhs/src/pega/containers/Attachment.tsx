import { Attachment, FileStatus } from '@labb/dx-engine';
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

  const error = props.container.config.validatemessage;
  return <>
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
    {
      container.files.length > 0 &&
      <table className="nhsuk-table">
        <tbody className="nhsuk-table__body">
          {container.files.map(file =>
            <tr key={file.id} className="nhsuk-table__row">
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

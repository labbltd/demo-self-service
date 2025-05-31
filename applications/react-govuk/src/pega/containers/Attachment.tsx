import { Attachment, FileStatus } from '@labb/dx-engine';
import { useRef, useState } from 'react';

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
    <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
      <label className="govuk-label" htmlFor={container.id}>
        {container.config.label}{!container.config.required ? ' (Optional)' : ''}
      </label>
      {container.config.helperText && <div className="govuk-hint">
        {container.config.helperText}
      </div>}
      {container.config.validatemessage && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
      </p>}
      <input className={"govuk-file-upload" + (container.config.validatemessage ? ' govuk-file-upload--error' : '')}
        id={container.id}
        name={container.id}
        type="file"
        onChange={(e) => container.uploadFile(e as unknown as Event)}
        multiple={container.config.allowMultiple === 'true'}
      />
    </div>
    {
      container.files.length > 0 &&
      <table className="govuk-table">
        <tbody className="govuk-table__body">
          {container.files.map(file =>
            <tr key={file.id} className="govuk-table__row">
              <td>{file.name}</td>
              <td>{container.formatBytes(file.size!)}</td>
              <td>{file.type}</td>
              <td>{file.progress}%</td>
              <td>
                <button type="button" className="govuk-button--secondary" onClick={() => container.removeFile(file.id)}>Delete</button>
                {file.type.startsWith('image') && <button type="button" className="govuk-button--secondary" onClick={async () => preview(file)}>Preview</button>}
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

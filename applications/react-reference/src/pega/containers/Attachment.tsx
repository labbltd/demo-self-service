import { Attachment as PAttachment } from '@labb/dx-engine';
import { useState } from 'react';

export default function Attachment(props: {
  container: PAttachment;
}): JSX.Element {
  const [downloadedImage, setDownloadedImage] = useState<string | undefined>();
  const { container } = props;
  return <>
    <label>
      {container.config.label}
      {container.config.required ? ' *' : ''}
      {(container.config.allowMultiple === 'true' || !container.files.length) &&
        <input
          type="file"
          onChange={(e) => container.uploadFile(e as unknown as Event)}
          multiple={container.config.allowMultiple === 'true'}
        />
      }
      {container.config.helperText}
      {container.config.validatemessage}
      {container.config.extensions}
    </label>
    {
      container.files.length > 0 &&
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
            <th>Uploaded</th>
            <th>Error</th>
            <th>Error Status</th>
            <th>Progress</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {container.files.map(file =>
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.size}</td>
              <td>{file.type}</td>
              <td>{file.uploaded}</td>
              <td>{file.error}</td>
              <td>{file.errorStatus}</td>
              <td>{file.progress}</td>
              <td>{file.id}</td>
              <td>
                <button type="button" onClick={() => container.removeFile(file.id)}>delete</button>
                {file.linked && <button onClick={async () => setDownloadedImage(await container.downloadFile(file.id))}>download</button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    }
    {
      downloadedImage &&
      <img width="100%" src={'data:image/png;base64,' + downloadedImage} />
    }
  </>;
}

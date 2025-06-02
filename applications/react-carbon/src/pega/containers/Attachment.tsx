import { FileUploader, FormItem } from '@carbon/react';
import { Attachment } from '@labb/dx-engine';

export default function DxAttachment(props: { container: Attachment }): JSX.Element {
  return (
    <>
      <FileUploader
        buttonLabel="Add file"
        filenameStatus="edit"
        iconDescription="Delete file"
        labelDescription={props.container.config.helperText}
        labelTitle={props.container.config.caption}
        multiple
        name=""
        onChange={(e: any) => props.container.uploadFile(e as unknown as Event)}
        size="md"
      />
      <p>
        {props.container.config.validatemessage}
      </p>
    </>
  );
}

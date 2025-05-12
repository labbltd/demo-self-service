import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { Attachment } from '@labb/dx-engine';
import { FileItem } from 'carbon-components-angular';

@Component({
  selector: 'dx-attachment-control',
  template: `
   <ibm-file-uploader
			[title]="container.config.label"
			[multiple]="false"
      [drop]="true"
			[(files)]="files"
      (filesChange)="uploadFile()">
		</ibm-file-uploader>
  `,
  standalone: false
})
export class AttachmentComponent extends PContainerComponent<Attachment> {
  public progress!: ProgressEvent<EventTarget>;
  public error!: boolean | File;
  public files = new Set<FileItem>();

  public async uploadFile(): Promise<void> {
    await this.container.uploadFile({ files: Array.from(this.files).map(f => f.file) } as any);
  }
}

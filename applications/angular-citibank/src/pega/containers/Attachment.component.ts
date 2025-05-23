import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { Attachment, FileStatus } from '@labb/dx-engine';

@Component({
  selector: 'dx-attachment-control',
  template: `
    <cds-form-field [label]="container.config.label" [for]="container.id"
        [tooltip]="{body: container.config.helperText}"
        [errorMessage]="container.config.validatemessage">
        @if(allowMultiple || !container.files.length) {
          <input cdsInput type="file" class="form-control"
            (change)="upload($event)"
            [multiple]="allowMultiple"
          />
        } @else {
          {{container.files[0].name}}
        }
        {{ container.config.extensions }}
        @for(file of container.files; track file.id) {
            @if (file.uploaded){ 
              <cds-icon name="checkmark"/>
              <cds-icon name="trash" (click)="remove(file)"/>
            }
            @else { {{file.progress}} }
            @if(file.linked) { <cds-icon name="eye" (click)="download(file)"/> }
        }
    </cds-form-field>
    @if(downloadedImage) {
      <img width="100%" [src]="'data:image/png;base64,' + downloadedImage" />
    }
  `,
  standalone: false
})
export class AttachmentComponent extends PContainerComponent<Attachment> {
  public downloadedImage?: string;

  public get allowMultiple(): boolean {
    return this.container.config.allowMultiple === 'true';
  }

  public async upload(e: Event): Promise<void> {
    await this.container.uploadFile(e);
  }

  public async remove(file: FileStatus): Promise<void> {
    await this.container.removeFile(file.id);
  }

  public async download(file: FileStatus): Promise<void> {
    this.downloadedImage = await this.container.downloadFile(file.id);
  }
}

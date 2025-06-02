import { Component, ElementRef, ViewChild } from '@angular/core';
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
        }
    </cds-form-field>
    @if (container.files.length) {
      <table class="cds-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
            <th>Progress</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @for (file of container.files; track file.id) {
            <tr>
              <td>{{file.name}}</td>
              <td>{{container.formatBytes(file.size!)}}</td>
              <td>{{file.type}}</td>
              <td>{{file.progress! < 100 ? file.progress : ''}}@if(file.progress === 100) { <cds-icon name="checkmark"/> }</td>
              <td>
                <cds-icon name="trash" (click)="remove(file)"/>
                @if (file.type.startsWith('image')) { <cds-icon name="eye" (click)="preview(file)"/> }
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
    <dialog #dialogRef>
      <button type="button" (click)="dialog.nativeElement.close()">Close</button>
      <img width="100%" [src]="downloadedImage" />
    </dialog>
  `,
  standalone: false
})
export class AttachmentComponent extends PContainerComponent<Attachment> {
  @ViewChild('dialogRef') dialog!: ElementRef<HTMLDialogElement>;
  public downloadedImage?: string;

  public get allowMultiple(): boolean {
    return this.container.config.allowMultiple === 'true';
  }

  public async preview(file: FileStatus) {
    if (file.linked) {
      this.downloadedImage = 'data:image/png;base64,' + await this.container.downloadFile(file.id);
    } else {
      this.downloadedImage = file.src;
    }
    this.dialog.nativeElement.showModal();
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

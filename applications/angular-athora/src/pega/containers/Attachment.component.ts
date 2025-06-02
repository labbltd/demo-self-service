import { Component, ElementRef, ViewChild } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { Attachment, FileStatus } from '@labb/dx-engine';

@Component({
  selector: 'dx-attachment-control',
  template: `
    <fieldset>
      <div class="file-upload highlight">
        <div class="mat-subheading-2"> {{ container.config.label }} </div>
          <div class="file-upload">
            <input id="upload"
            style="display: none"
            #upload name="upload" type="file" 
            aria-labelledby="uploadLabel" 
            [attr.multiple]="container.config.allowMultiple === 'true' ? true : null"
            (change)="uploadFile($event)"
            >
            <div class="file-upload__container file-upload__container--stacked">
              @if (allowMultiple || !container.files.length) {
                <mat-label id="uploadLabel"> Kies bestanden </mat-label>
                <div class="file-upload__container__button">
                  <button type="button" mat-stroked-button color="warn" (click)="openSelector()">
                      Bladeren... 
                      <mat-icon>file_upload</mat-icon>
                  </button>
                </div>
              }
              <div class="file-upload__container__files" *ngIf="container.files">
                <mat-list>
                  <mat-list-item *ngFor="let file of container.files">
                      <button mat-icon-button (click)="remove(file)" [color]="file.uploaded ? 'warn' : ''">
                        <mat-icon>delete</mat-icon>
                      </button>
                      @if (file.type.startsWith('image')) { <button mat-icon-button (click)="preview(file)"><mat-icon>visibility</mat-icon></button> }
                      {{file.name}}
                    </mat-list-item>
                  </mat-list>
                </div>
            </div>
          </div>
      </div>
      <dialog #dialogRef>
        <button type="button" (click)="dialog.nativeElement.close()">Close</button>
        <img width="100%" [src]="downloadedImage" />
      </dialog>
    </fieldset>
  `,
  host: {
    'class': 'dx-control'
  },
  standalone: false
})
export class AttachmentComponent extends PContainerComponent<Attachment> {
  @ViewChild('dialogRef') dialog!: ElementRef<HTMLDialogElement>;
  public downloadedImage?: string;
  public progress!: ProgressEvent<EventTarget>;
  public error!: boolean | File;

  @ViewChild('upload')
  private input!: ElementRef<HTMLInputElement>;

  public get allowMultiple(): boolean {
    return this.container.config.allowMultiple === 'true';
  }

  public async remove(file: FileStatus): Promise<void> {
    await this.container.removeFile(file.id);
    this.input.nativeElement.value = '';
  }

  public async uploadFile(e: Event): Promise<void> {
    await this.container.uploadFile(e);
  }

  public openSelector(): void {
    this.input.nativeElement.click();
  }

  public async preview(file: FileStatus) {
    if (file.linked) {
      this.downloadedImage = 'data:image/png;base64,' + await this.container.downloadFile(file.id);
    } else {
      this.downloadedImage = file.src;
    }
    this.dialog.nativeElement.showModal();
  }
}

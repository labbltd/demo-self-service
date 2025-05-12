import { Component, ElementRef, ViewChild } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { Attachment } from '@labb/dx-engine';

@Component({
  selector: 'dx-attachment-control',
  template: `
    <fieldset>
      <div class="file-upload highlight">
        <div class="mat-subheading-2"> {{ container.config.label }} </div>
          <div class="file-upload">
            <mat-label id="uploadLabel"> Kies bestanden </mat-label>
            <input id="upload" 
                #upload name="upload" type="file" 
                aria-labelledby="uploadLabel" 
                [attr.multiple]="container.config.allowMultiple === 'true' ? true : null"
                (change)="uploadFile($event)"
              >
            <div class="file-upload__container file-upload__container--stacked">
              <div class="file-upload__container__button">
                <button type="button" mat-stroked-button color="warn" (click)="openSelector()">
                    Bladeren... 
                    <mat-icon>file_upload</mat-icon>
                </button>
              </div>
              <div class="file-upload__container__files" *ngIf="container.files">
                <mat-list>
                  <mat-list-item *ngFor="let file of container.files">
                      <button mat-icon-button [color]="file.uploaded ? 'warn' : ''">
                        <mat-icon *ngIf="file.uploaded">delete</mat-icon>
                        <mat-icon *ngIf="!file.uploaded">file_upload</mat-icon>
                      </button>
                      {{file.name}}
                    </mat-list-item>
                  </mat-list>
                </div>
            </div>
          </div>
      </div>
    </fieldset>
  `,
  host: {
    'class': 'dx-control'
  },
  standalone: false
})
export class DxAttachmentComponent extends PContainerComponent<Attachment> {
  public progress!: ProgressEvent<EventTarget>;
  public error!: boolean | File;

  @ViewChild('upload')
  private input!: ElementRef;

  public async uploadFile(e: Event): Promise<void> {
    await this.container.uploadFile(e);
  }

  public openSelector(): void {
    this.input.nativeElement.click();
  }
}

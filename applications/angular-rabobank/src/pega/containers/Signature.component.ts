import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'dx-signature-capture',
  template: `
    <dx-input-wrapper
      [label]="container.config.label" 
      [labelEnd]="container.config.helperText"
      [errorMessage]="container.config.validatemessage">
    </dx-input-wrapper>
    @if (container.config.readOnly) {
      <img [src]="container.config.value">
    }
    @if (!container.config.readOnly) {
      <canvas style="width: 100%; height: 200px; border: 1px dashed" #canvas></canvas>
      <dx-toggle-button (click)="onClear()"
        [disabled]="!hasValueChanged">
        Clear
      </dx-toggle-button>
      <dx-toggle-button (click)="onAccept()"
        [disabled]="!hasValueChanged">
        Accept
      </dx-toggle-button>
      @if(info) {
        <div>{{info}}</div>
      }
    }
  `,
  styles: [
    `
    :host {
      display: block;
      margin-bottom: 15px;
    }
    `
  ],
  standalone: false
})
export class SignatureComponent extends PContainerComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  public signature!: SignaturePad;
  public hasValueChanged = false;
  public info = '';

  public ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.signature = new SignaturePad(canvas, {
      penColor: '#056dae'
    });
    this.signature.addEventListener('endStroke', () => {
      this.onEndStroke();
    });
    this.resizeCanvas();
    this.signature.on();
  }

  public onClear() {
    this.signature.clear();
    this.hasValueChanged = false;
    this.info = '';
  }

  public onAccept() {
    const newValue = this.canvas.nativeElement.toDataURL('image/svg+xml');
    if (newValue) {
      this.container.updateFieldValue(newValue);
      this.hasValueChanged = false;
      this.info = 'Signature captured';
    }
  }

  private resizeCanvas() {
    const canvas = this.canvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
  }

  private onEndStroke() {
    this.hasValueChanged = true;
  }
}

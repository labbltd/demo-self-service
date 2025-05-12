import { Component } from "@angular/core";

@Component({
    selector: 'dx-loader',
    template: `
        <div class="spinner-container">
            <mat-spinner></mat-spinner>
        </div>
    `,
    styles: [`
    .spinner-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #33333387;
    }`
    ],
    standalone: false
})
export class DxLoaderComponent {
}
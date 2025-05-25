import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dx-hint',
    template: `
        <div class="explanation">
            <button (click)="this.closed.emit()" type="button" mat-icon-button class="explanation-close-button">
                <mat-icon>close</mat-icon>
            </button>
            <div [innerHTML]="hint"></div>
        </div>
    `,
    standalone: false
})
export class DxHintComponent {
    @Input() hint!: string;
    @Output() closed = new EventEmitter<void>();
}

import { Component, Input } from "@angular/core";

@Component({
    selector: 'cds-radio',
    template: `
        <ng-content></ng-content>
        <label class="cds-radio-label" [for]="for">
            {{label}}
        </label>
    `,
    host: {
        class: 'cds-radio'
    }
})
export class CdsRadioComponent {
    @Input() for!: string;
    @Input() label!: string;
}
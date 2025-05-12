import { Component, ContentChild, ElementRef, HostListener, Input } from "@angular/core";
import { CdsInputDirective } from "../cds-input/cds-input.directive";

@Component({
    selector: 'cds-checkbox',
    template: `
        <ng-content></ng-content>
        <label class="cds-checkbox-label" [for]="for">{{label}}</label>
    `,
    host: {
        class: 'cds-checkbox'
    },
    standalone: false
})
export class CdsCheckboxComponent {
    @ContentChild(CdsInputDirective, { descendants: true, read: ElementRef }) inputElement!: ElementRef<HTMLInputElement>;
    @Input() for!: string;
    @Input() label!: string;

    @HostListener('click')
    public clicked() {
        const el = this.inputElement.nativeElement;
        el.checked = !el.checked;
    }
}
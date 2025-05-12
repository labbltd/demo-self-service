import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-input-wrapper',
    templateUrl: 'input-wrapper.component.html',
    styleUrl: 'input-wrapper.component.css',
    standalone: false
})
export class InputWrapperComponent {
    @Input() errorMessage!: string;
    @Input() label!: string;
    @Input() labelEnd!: string;
}
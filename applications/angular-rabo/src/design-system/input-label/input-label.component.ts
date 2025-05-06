import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-input-label',
    templateUrl: 'input-label.component.html',
    styleUrl: 'input-label.component.css'
})
export class InputLabelComponent {
    @Input() label!: string;
    @Input() labelEnd!: string;
}
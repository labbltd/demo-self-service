import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-input-label',
    templateUrl: 'input-label.component.html',
    styleUrl: 'input-label.component.css',
    standalone: false
})
export class InputLabelComponent {
    @Input() label!: string;
    @Input() labelEnd!: string;
}
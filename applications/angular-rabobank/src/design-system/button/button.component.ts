import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-button',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.css',
    standalone: false
})
export class ButtonComponent {
    @Input() type!: 'primary' | 'secondary' | 'tertiary';
    @Input() loading = false;
}
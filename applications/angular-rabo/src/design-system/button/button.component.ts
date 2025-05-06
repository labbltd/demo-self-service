import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-button',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.css'
})
export class ButtonComponent {
    @Input() type!: 'primary' | 'secondary' | 'tertiary';
    @Input() loading = false;
}
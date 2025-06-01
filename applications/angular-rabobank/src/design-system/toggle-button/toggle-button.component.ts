import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-toggle-button',
    templateUrl: './toggle-button.component.html',
    standalone: false,
    styleUrl: './toggle-button.component.css'
})
export class ToggleButton {
    @Input() disabled = false;
    @Input() icon!: string;
}
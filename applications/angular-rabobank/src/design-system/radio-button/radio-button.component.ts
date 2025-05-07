import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dx-radio-button',
    templateUrl: 'radio-button.component.html',
    styleUrl: 'radio-button.component.css'
})
export class RadioButtonComponent {
    @Input() key!: string;
    @Input() value!: string;
    @Input() selected!: boolean;
    @Input() hasErrors!: boolean;

    @Output() valueChanged = new EventEmitter();

    public isFocused = false;

    public emit(event: Event) {
        const input = event.target as HTMLInputElement;
        this.valueChanged.emit(input.value);
    }
}
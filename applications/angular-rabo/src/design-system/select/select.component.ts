import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dx-select',
    templateUrl: 'select.component.html',
    styleUrl: 'select.component.css'
})
export class SelectComponent {
    @Input() value!: string;
    @Input() label!: string;
    @Input() options!: { key: string, value: string }[];
    @Input() hasError!: boolean;

    @Output() valueChanged = new EventEmitter();

    public isFocused = false;

    public emit(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.valueChanged.emit(target.value);
    }
}
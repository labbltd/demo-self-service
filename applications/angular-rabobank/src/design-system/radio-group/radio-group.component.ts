import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dx-radio-group',
    templateUrl: 'radio-group.component.html',
    styleUrl: 'radio-group.component.css',
    standalone: false
})
export class RadioGroupComponent {
    @Input() value!: string;
    @Input() label!: string;
    @Input() options!: { key: string, value: string }[];
    @Input() hasErrors = false;

    @Output() valueChanged = new EventEmitter();


    public emit(value: string) {
        this.value = value;
        this.valueChanged.emit(value);
    }
}
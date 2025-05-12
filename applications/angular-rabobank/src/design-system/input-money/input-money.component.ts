import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dx-input-money',
    templateUrl: 'input-money.component.html',
    styleUrl: 'input-money.component.css',
    standalone: false
})
export class InputMoneyComponent {
    @Input() value!: string;
    @Input() prefix = '€';
    @Input() hasErrors!: boolean;

    @Output() valueChanged = new EventEmitter();
    @Output() valueCommited = new EventEmitter();

    public isFocused = false;

    public change(event: Event) {
        const target = event.target as HTMLInputElement;
        this.valueChanged.emit(target.value);
    }

    public focus() {
        this.isFocused = true;
    }

    public blur(event: Event) {
        this.isFocused = false;
        const target = event.target as HTMLInputElement;
        this.valueCommited.emit(target.value);
    }
}
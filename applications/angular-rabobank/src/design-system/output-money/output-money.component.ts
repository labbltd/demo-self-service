import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-output-money',
    templateUrl: 'output-money.component.html',
    styleUrl: 'output-money.component.css',
    standalone: false
})
export class OutputMoneyComponent {
    @Input() currency = '€';
    @Input() value!: string;
}
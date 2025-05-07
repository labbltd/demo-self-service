import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-output-money',
    templateUrl: 'output-money.component.html',
    styleUrl: 'output-money.component.css'
})
export class OutputMoneyComponent {
    @Input() currency = '€';
    @Input() value!: string;
}
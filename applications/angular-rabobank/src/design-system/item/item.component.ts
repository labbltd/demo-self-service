import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-item',
    templateUrl: 'item.component.html',
    styleUrl: 'item.component.css',
    standalone: false
})
export class ItemComponent {
    @Input() label!: string;
    @Input() value!: string;
    @Input() isAmount!: boolean;
}
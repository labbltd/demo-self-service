import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-icon',
    templateUrl: 'icon.component.html',
    styleUrl: 'icon.component.css'
})
export class IconComponent {
    @Input() name!: string;
    @Input() size!: 'xs' | 'sm';
}
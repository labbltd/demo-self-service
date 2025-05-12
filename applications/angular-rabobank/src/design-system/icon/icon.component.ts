import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-icon',
    templateUrl: 'icon.component.html',
    styleUrl: 'icon.component.css',
    standalone: false
})
export class IconComponent {
    @Input() name!: string;
    @Input() size: 'xs' | 'sm' = 'xs';
}
import { Component, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Component({
    selector: 'cds-radio-group',
    template: `
        <div class="radio-wrapper" [attr.style]="'flex-direction: '+this.direction">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        class: 'cds-radio-group'
    },
    standalone: false
})
export class CdsRadioGroupComponent implements OnInit {
    @Input() direction = 'row';
    @Input() hasError = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'flex-direction', this.direction);
        if (this.hasError) {
            this.renderer.addClass(this.elementRef.nativeElement, 'cds-radio-group-error');
        }
    }
}
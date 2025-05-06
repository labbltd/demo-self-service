import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[cdsButton]',
    host: {
        class: 'cds-button ml-left btnWidth'
    }
})
export class CdsButtonDirective implements OnInit {
    @Input() cdsButton!: string;
    @Input() size!: string;

    public constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    public ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'cds-button-' + this.cdsButton);
        if (this.size === 'large') {
            this.renderer.addClass(this.elementRef.nativeElement, 'cds-button-lg');
        }
    }
}
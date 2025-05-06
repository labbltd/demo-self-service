import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[cdsInput]'
})
export class CdsInputDirective {
    public constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    @HostListener('focus')
    public focus() {
        this.renderer.addClass(this.elementRef.nativeElement, 'cds-form-text-field-focus');
    }

    @HostListener('blur')
    public blur() {
        this.renderer.removeClass(this.elementRef.nativeElement, 'cds-form-text-field-focus');
    }
}
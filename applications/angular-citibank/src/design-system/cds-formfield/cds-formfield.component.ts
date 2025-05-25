import { AfterViewInit, Component, ContentChildren, ElementRef, Input, OnChanges, QueryList, Renderer2, SimpleChanges } from "@angular/core";
import { CdsInputDirective } from "../cds-input/cds-input.directive";

@Component({
    selector: 'cds-form-field',
    template: `
        @if (label){
            <label class="cds-label" [for]="for">{{label}}</label>
        }
        <div class="cds-form-field-infix cds-form-field-content"
            [ngClass]="{
                'cds-form-field-error': !!errorMessage,
                'cds-input-group-error': !!errorMessage,
                'cds-input-dd-group-error': !!errorMessage,
                'cds-form-field-input': type === 'input',
                'cds-form-field-checkbox': type === 'checkbox',
                'cds-form-field-radio': type === 'radio',
                'cds-form-field-dropdown': type === 'dropdown',
                'cds-form-field-textarea': type === 'textarea'
            }">
            <ng-content></ng-content>
            @if (tooltip && tooltip.body) {
                <div role="tooltip" tabindex="0" class="toolTipWrapper" (click)="tooltip.active = true">
                    <div class="tool-tip-directive">
                        <span >?</span>
                        <div class="tool-tip" [ngClass]="{
                            'active': tooltip.active
                            }">
                            @if (tooltip.title) {
                                <span class="title">
                                    <b>{{tooltip.title}}</b>
                                </span>
                            }
                            <span [innerHTML]="tooltip.body.substring(0,300)"></span>
                            <div class="arrow-down"></div>
                            <div tabindex="0" class="close-tool-tip" (click)="tooltip.active=false; $event.stopPropagation()">
                                <div>X</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        @if (errorMessage) {
            <div>
                <div class="cds-warning-icon"></div>
                <cds-error>{{errorMessage}}</cds-error>
            </div>
        }
    `,
    host: {
        'class': 'cds-form-field'
    },
    standalone: false
})
export class CdsFormfieldComponent implements AfterViewInit, OnChanges {
    @ContentChildren(CdsInputDirective, { descendants: true, read: ElementRef })
    inputField!: QueryList<ElementRef<HTMLInputElement>>;

    @Input() label!: string;
    @Input() errorMessage!: string;
    @Input() tooltip!: { title?: string, body: string, active?: boolean };
    @Input() for!: string;

    public constructor(private renderer: Renderer2) { }

    public get type() {
        const t = this.inputField?.first?.nativeElement.type;
        switch (t) {
            case 'number': return 'text';
            case 'date': return 'text';
            case 'datetime-local': return 'text';
            case 'time': return 'text';
            case 'email': return 'text';
            default: return t;
        }
    }

    public get typeClass() {
        switch (this.type) {
            case 'text': return 'cds';
            case 'textarea': return 'cds-textarea';
            case 'checkbox': return 'cds-checkbox';
            case 'radio': return 'cds-radio';
            case 'dropdown': return 'cds-dd';
            default: return 'cds-input'
        }
    }

    ngAfterViewInit(): void {
        this.inputField.forEach(field => {
            this.renderer.addClass(field.nativeElement, this.typeClass + '-input');
            this.toggleError();
        });
    }

    ngOnChanges(): void {
        this.toggleError();
    }

    toggleError(): void {
        this.inputField?.forEach(field => {
            if (this.errorMessage) {
                this.renderer.addClass(field.nativeElement, this.typeClass + (this.typeClass === 'cds' ? '-input' : '') + '-error')
            } else {
                this.renderer.removeClass(field.nativeElement, this.typeClass + (this.typeClass === 'cds' ? '-input' : '') + '-error')
            }
        });
    }
}
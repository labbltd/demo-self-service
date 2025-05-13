import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { CdkPortal } from "@angular/cdk/portal";
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { CdsDropdownService } from "./cds-dropdown.service";

@Component({
    selector: 'cds-dropdown',
    template: `
        <input role="combobox" class="cds-dd-input" #selectInput [value]="value" (click)="showDropdown()" [disabled]="disabled">
        <span aria-hidden="true" disabled="false"><svg version="1.1" width="14px" height="9px" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" class="dropdown-arrow ng-tns-c981122031-0 ng-trigger ng-trigger-rotatedState" style="transform: rotate(0deg);"><g fill="none" fill-rule="evenodd" class="ng-tns-c981122031-0"><path fill="#056DAE" d="m7 8.6724c-0.531 0-1.046-0.227-1.413-0.62l-5.319-5.719c-0.376-0.404-0.353-1.037 0.051-1.413 0.406-0.375 1.037-0.352 1.413 0.052l5.268 5.662 5.268-5.662c0.378-0.404 1.009-0.426 1.413-0.052 0.405 0.376 0.427 1.009 0.051 1.413l-5.318 5.718c-0.368 0.394-0.883 0.621-1.414 0.621" class="ng-tns-c981122031-0"></path></g></svg></span>
        <ng-template cdkPortal> 
            <div class="cbolui-cds">
                <div class="cds-dropdown-overlay-panel">
                    <ng-content></ng-content>
                </div>
            </div>
        </ng-template>
    `,
    host: {
        class: 'cds-dropdown'
    },
    standalone: false
})
export class CdsDropdownComponent implements OnInit {
    @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
    @ViewChild('selectInput') public select!: ElementRef;
    @Input() public disabled = false;
    @Input() public value!: string;
    @Output() public selected = new EventEmitter();

    private overlayRef!: OverlayRef;

    constructor(private overlay: Overlay, private dropdownService: CdsDropdownService) { }

    public ngOnInit(): void {
        this.dropdownService.onChange().subscribe(val => {
            this.select.nativeElement.value = val;
            this.selected.emit(val);
            this.hide();
        })
    }

    public showDropdown(): void {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.attach(this.contentTemplate);
        this.syncWidth();
        this.overlayRef.backdropClick().subscribe(() => this.hide());
    }

    private hide(): void {
        this.overlayRef.detach();
    }

    private syncWidth(): void {
        if (!this.overlayRef) {
            return;
        }
        const refRectWidth = this.select.nativeElement.getBoundingClientRect().width;
        this.overlayRef.updateSize({ width: refRectWidth });
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.select.nativeElement)
            .withPush(true)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: 4,
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetY: -4,
                },
            ]);

        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        return new OverlayConfig({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }
}
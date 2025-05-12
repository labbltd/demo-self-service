import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'dx-input',
    template: `
    <div class="sfc-input__input-container">
        <div class="sfc-input__input">
            <ng-content></ng-content>
        </div>
    </div>
    `,
    styles: [
        `
        :host {
            display: block;
        }
        @media (min-width: 320px) {
            .sfc-input__input-container {
                height: var(--sfc-input-field-height, var(--sfc-input-container-height, 48px));
                flex-wrap: unset;
            }
        }
        .sfc-input__input-container {
            align-items: center;
            background-color: var(--sfc-form-elements-color-background, white);
            border-width: var(--sfc-input-border-width, var(--sfc-form-elements-border-width, 1px));
            border-style: var(--sfc-form-elements-border-style, solid);
            border-color: var(--sfc-form-elements-color-border, #737578);
            border-radius: var(--sfc-input-border-radius, var(--sfc-form-elements-border-radius, 4px));
            height: var(--sfc-input-field-height, var(--sfc-form-elements-height, 48px));
            font-size: var(--sfc-form-elements-font-size, 18px);
            display: flex;
            overflow: var(--sfc-form-elements-container-overflow, visible);
        }
        .sfc-input__input {
            font-family: Myriad, "Segoe UI", "Helvetica Neue", arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            background: var(--sfc-form-elements-input-color-background, transparent);
            border: var(--sfc-form-elements-border, none);
            color: var(--sfc-form-elements-color-text, #202122);
            font-size: var(--sfc-form-elements-font-size, 18px);
            min-height: 100%;
            width: 100%;
            min-width: 0px;
            flex: 1 1 auto;
            height: 100%;
        }
        .sfc-input__input input {
            font-family: Myriad, "Segoe UI", "Helvetica Neue", arial, sans-serif !important;
            -webkit-font-smoothing: antialiased !important;
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            padding: var(--sfc-form-elements-padding-block, 0) var(--sfc-form-elements-padding-inline, 16px) !important;
            color: inherit !important;
            font-size: inherit !important;
            background: inherit !important;
            border: none !important;
            box-sizing: border-box !important;
            outline: 0px !important;
        }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class InputComponent { }
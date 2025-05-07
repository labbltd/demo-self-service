import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'dx-checkbox-control',
    template: `
        <div class="sfc-checkbox" [ngClass]="{'sfc-checkbox--state-checked': checked}">
            <div class="sfc-checkbox__container">
                <div class="sfc-checkbox__input">
                    <ng-content></ng-content>
                </div>
                <div class="sfc-checkbox__box">
                    <dx-icon class="sfc-checkbox__checked-icon" name="rds-icon-check-alt"></dx-icon>
                </div>
                <div class="sfc-checkbox__label">
                    <dx-input-label [label]="label" [labelEnd]="labelEnd"></dx-input-label>
                </div>
            </div>
            <div class="sfc-input-wrapper__errors"
                *ngIf="errorMessage">
                <div class="sfc-input-error-root">
                    <div class="sfc-input-error">
                        <dx-icon class="sfc-input-error__icon"
                            name="exclamation-circle-fill"
                            size="xs">
                        </dx-icon>
                        <span>{{errorMessage}}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
      :host {
        display: block;
      }
      .sfc-checkbox {
          font-family: Myriad, "Segoe UI", "Helvetica Neue", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
          margin: var(--sfc-input-margin, var(--sfc-checkbox-margin, 0 0 25px));
      }
      .sfc-checkbox__container {
          position: relative;
          display: flex;
          align-items: center;
          user-select: none;
          line-height: var(--sfc-checkbox-label-line-height, 1.6);
      }
      .sfc-checkbox:not(.sfc-checkbox--state-disabled) input,
      .sfc-checkbox:not(.sfc-checkbox--state-disabled) label {
          cursor: var(--sfc-checkbox-cursor, pointer) !important;
          --sfc-input-label-cursor: token($ checkbox, cursor);
      }
      .sfc-checkbox input {
          appearance: none !important;
          position: absolute !important;
          opacity: 0 !important;
          top: calc(var(--sfc-checkbox-hitbox-area-padding, 12px) * -1) !important;
          left: calc(var(--sfc-checkbox-hitbox-area-padding, 12px) * -1) !important;
          width: calc(var(--sfc-checkbox-box-size, 20px) + 2 * var(--sfc-checkbox-hitbox-area-padding, 12px)) !important;
          height: calc(var(--sfc-checkbox-box-size, 20px) + 2 * var(--sfc-checkbox-hitbox-area-padding, 12px)) !important;
          min-height: calc(100% + var(--sfc-checkbox-hitbox-area-padding, 12px)) !important;
          margin: 0px !important;
          z-index: 1 !important;
      }
      .sfc-checkbox__box {
          position: relative;
          border: var(--sfc-checkbox-border-width, 1px) var(--sfc-checkbox-border-style, solid) var(--sfc-checkbox-color-border, #737578);
          border-radius: var(--sfc-checkbox-border-radius, 4px);
          color: var(--sfc-checkbox-color-text-checked, #fa6400);
          flex-shrink: 0;
          align-self: baseline;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--sfc-checkbox-box-size, 20px);
          width: var(--sfc-checkbox-box-size, 20px);
          margin-right: calc(var(--sfc-checkbox-box-margin-inline-end, 12px) - var(--sfc-checkbox-border-width, 1px) * 2);
      }
      .sfc-checkbox__box .sfc-checkbox__checked-icon, .sfc-checkbox__box .sfc-checkbox__indeterminate-icon {
          display: none;
          color: var(--sfc-checkbox-check-mark-icon-color, white);
      }
      .sfc-checkbox__label {
          margin-top: var(--sfc-checkbox-label-line-height-offset, -2px);
      }
      .sfc-checkbox--state-checked .sfc-checkbox__box {
            background-color: var(--sfc-checkbox-color-background-checked, currentcolor);
            border-color: var(--sfc-checkbox-color-border-checked, currentcolor);
        }
        .sfc-checkbox__box .sfc-checkbox__checked-icon, .sfc-checkbox__box .sfc-checkbox__indeterminate-icon {
            display: none;
            color: var(--sfc-checkbox-check-mark-icon-color, white);
        }
        .sfc-checkbox--state-checked .sfc-checkbox__checked-icon {
            display: block;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent {
    @Input() label: string = '';
    @Input() labelEnd: string = '';
    @Input() errorMessage: string = '';
    @Input() checked: boolean = false;
}
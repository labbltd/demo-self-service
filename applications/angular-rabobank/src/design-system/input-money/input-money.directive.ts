import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DxAmountsService } from './input-money.service';

/** Directive that formats amounts */
@Directive({
  selector: '[dxInputMoney]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DxInputAmountDirective,
      multi: true,
    },
  ],
  standalone: false
})
export class DxInputAmountDirective implements ControlValueAccessor {
  /** allow a maximum number of digits in the input */
  @Input()
  public set maxDigits(maxDigits: number) {
    this._maxDigits = maxDigits;
    this.onInput();
    this.interpretValue(this.getValue());
  }
  public get maxDigits(): number {
    return this._maxDigits;
  }

  /** the amount of decimals used */
  @Input()
  public set numberOfDecimals(numberOfDecimals: number) {
    this._numberOfDecimals = numberOfDecimals;
    this.onInput();
    this.interpretValue(this.getValue());
  }
  public get numberOfDecimals(): number {
    return this._numberOfDecimals;
  }

  private touch!: () => void;
  private change!: (_: any) => void;
  private _numberOfDecimals = 2;
  private _maxDigits!: number;

  public constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private amountsService: DxAmountsService,
  ) {
  }

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string): void {
    this.interpretValue(value);

    if (
      this.numberOfDecimals === 0 &&
      this.amountsService.hasDotPositionChanged(value, this.getValue())
    ) {
      console.error()
    }

    if (this.change) {
      this.change(
        this.amountsService.getValue(this.getValue(), this.numberOfDecimals)
      );
    }

    if (this.touch) {
      this.touch();
    }
  }

  @HostListener('input', ['$event'])
  public onInput(): void {
    this.setValue(
      this.amountsService.limitValue(
        this.getValue(),
        this.maxDigits,
        this.numberOfDecimals
      )
    );
    if (this.change) {
      this.change(
        this.amountsService.getValue(this.getValue(), this.numberOfDecimals)
      );
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.change = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touch = fn;
  }

  public writeValue(value: number): void {
    this.setValue(
      this.amountsService.getViewValue(
        value == null ? null : String(value),
        this.numberOfDecimals
      )
    );
    this.onInput();
    this.interpretValue(this.getValue());
  }

  public setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  private interpretValue(value: string): void {
    this.setValue(
      this.amountsService.getViewValue(value, this.numberOfDecimals)
    );
  }

  private getValue(): string {
    return this.elementRef.nativeElement.value;
  }

  private setValue(value: string): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }
}

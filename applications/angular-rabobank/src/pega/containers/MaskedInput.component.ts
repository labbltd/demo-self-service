import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import IMask from 'imask';

@Component({
  selector: 'dx-masked-input-control',
  template: `
    @if(container.config.readOnly) {
    <dx-input-wrapper
      [label]="container.config.label" 
      [labelEnd]="container.config.helperText"
      [errorMessage]="container.config.validatemessage">
      {{container.config.value}}
    </dx-input-wrapper>
  } @else {
    <dx-input-wrapper
      [label]="container.config.label" 
      [labelEnd]="container.config.mask"
      [errorMessage]="container.config.validatemessage">
      <dx-input>
        <input
          [id]="container.id"
          #input
          type="text"
          [attr.placeholder]="container.config.placeholder"
          [value]="container.config.value"
          (change)="container.updateFieldValue(getValue($event.target))"
          (blur)="container.triggerFieldChange(getValue($event.target))"
        />
      </dx-input>
    </dx-input-wrapper>
  }
  `,
  standalone: false
})
export class MaskedInputComponent extends PContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  public control = new FormControl('');

  public ngAfterViewInit(): void {
    const maskOptions = {
      mask: this.container.config.mask,
      definitions: {
        // defaults are '0', 'a', '*'
        // You can extend by adding other characters
        A: /[A-Z]/
      }
    }
    IMask(this.input.nativeElement, maskOptions);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.container.config.value);
    this.container.updates.subscribe(() => {
      this.control.setValue(this.container.config.value);
    });
  }

  public getValue(target: EventTarget | null) {
    return (target as HTMLInputElement).value;
  }
}

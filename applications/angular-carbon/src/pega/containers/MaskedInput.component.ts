import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import IMask from 'imask';

@Component({
  selector: 'dx-masked-input-control',
  template: `
  @if (container.config.readOnly) {
    <dt>{{ container.config.label }}</dt><dd>{{container.config.value ?? '--'}}</dd>
  } @else {
    <ibm-label
        [disabled]="container.config.readOnly"
        [helperText]="container.config.mask"
        [invalid]="!!container.config.validatemessage"
        [invalidText]="container.config.validatemessage">
        {{container.config.label}}
        <input ibmText
          #input
          [type]="'text'"
          [formControl]="control"
          (blur)="blur($event)"
          [invalid]="!!container.config.validatemessage"
          [placeholder]="container.config.placeholder ?? ''">
      </ibm-label>
  }
  `,
  standalone: false
})
export class MaskedInputComponent extends PContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  public control = new FormControl();

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
    this.control.setValue(this.container.config.value);
  }

  public blur(event: FocusEvent) {
    if (!event.target) return;
    this.container.updateFieldValue((event.target as any).value);
    this.container.triggerFieldChange((event.target as any).value);
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

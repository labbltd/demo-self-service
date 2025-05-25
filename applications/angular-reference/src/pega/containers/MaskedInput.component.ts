import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import IMask from 'imask';

@Component({
  selector: 'dx-masked-input-control',
  template: `
  @if (container.config.readOnly) {
    <dt>{{ container.config.label }}</dt><dd>{{container.config.value ?? '--'}}</dd>
  }
  @if (!container.config.readOnly) {
    <label [for]="container.id">
      {{ container.config.label }}{{ container.config.required ? ' *' : '' }} ({{ container.config.mask }})
      @if(container.config.helperText) {
        <span [attr.data-tooltip]="container.config.helperText">?</span>
      }
    </label>
    <input
      #input
      [id]="container.id"
      type="text"
      [attr.placeholder]="container.config.placeholder"
      [formControl]="control"
      (change)="container.updateFieldValue(getValue($event.target))"
      (blur)="container.triggerFieldChange(getValue($event.target))"
    />
    @if(container.config.validatemessage) { <span>{{ container.config.validatemessage }}</span> }
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

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import IMask from 'imask';

@Component({
  selector: 'dx-masked-input-control',
  template: `
    <cds-form-field [label]="container.config.label" [for]="container.id"
        [tooltip]="{body: container.config.mask}"
        [errorMessage]="container.config.validatemessage">
        @if(this.container.config.readOnly) {
          {{container.config.value}}
        } @else {
          <input cdsInput
            #input
            [value]="container.config.value"
            type="text"
            [name]="container.id"
            (blur)="update($event.target)">
        }
    </cds-form-field>
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

  public update(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      this.container.updateFieldValue(target.value);
      this.container.triggerFieldChange(target.value);
    }
  }
}

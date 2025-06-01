import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PContainerComponent } from '@labb/angular-adapter';
import IMask from 'imask';

@Component({
  selector: 'dx-masked-input-control',
  template: `
    @if(container.config.readOnly) {
        <div class="dx-control">
          <mat-label>
            {{ container.config.label }}
          </mat-label>
          {{container.config.value ?? '--'}}
        </div>
      } @else  {
    <div class="dx-control">
      <mat-label>
          {{ container.config.label }}
          <button type="button" mat-icon-button (click)="helperTextOpen = true" *ngIf="container.config.helperText"><mat-icon>info_outline</mat-icon></button>
        </mat-label>
      <mat-form-field>
        <input matInput #input
        [placeholder]="container.config.mask"
        [value]="container.config.value"
        [formControl]="control"/>
        @if(container.config.validatemessage) { <mat-error>{{container.config.validatemessage}}</mat-error> }
      </mat-form-field>
    </div>
    <dx-hint *ngIf="container.config.helperText && helperTextOpen"
        (closed)="helperTextOpen = false"
        [hint]="container.config.helperText"></dx-hint>
  }
  `,
  standalone: false
})
export class MaskedInputComponent extends PContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  public control = new FormControl('', { updateOn: 'blur' });
  public helperTextOpen = false;

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
    this.control.valueChanges.subscribe(() => {
      this.container.updateFieldValue(this.control.value);
      this.container.triggerFieldChange(this.control.value);
    })
    this.container.updates.subscribe(() => {
      this.control.setValue(this.container.config.value);
    });
  }

  public getValue(target: EventTarget | null) {
    return (target as HTMLInputElement).value;
  }
}

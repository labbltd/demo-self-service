import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';

@Component({
  selector: 'dx-radio-buttons-control',
  template: `
    <fieldset>
      <legend>
        {{ container.config.label }}{{ container.config.required ? ' *' : '' }}
      </legend>
      @for (option of container.config.datasource; track option.key) {
        <label>
          <input
            type="radio"
            (change)="container.updateFieldValue(getValue($event.target))"
            (blur)="container.triggerFieldChange(getValue($event.target))"
            [checked]="container.config.value === option.key"
            [name]="container.id"
            [value]="option.key"
          />{{ option.value }}
        </label>
      }
      {{ container.config.helperText }}
      {{ container.config.validatemessage }}
    </fieldset>
  `,
  standalone: false
})
export class RadioButtonsComponent extends PContainerComponent implements OnInit {
  public override ngOnInit(): void {
    super.ngOnInit();
    const listType = this.container.config.listType;
    const isDatapage = listType === 'datapage';
    const configProps = this.container.pconnect.getConfigProps() as any;
    const datasource = this.container.config.datasource;
    const listSource = isDatapage ? configProps.listOutput : datasource;
    // console.log('ngOnInit', this.container.id);
    // console.log('listSource', listSource);

    // const stateProps = this.container.pconnect.getStateProps();
    // if (stateProps.value) {
    //   console.log(stateProps.value, JSON.stringify(this.container.pconnect.getFieldMetadata(stateProps.value), null, 2));
    // } else {
    //   console.log('No value');
    // }
  }

  public getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }
}

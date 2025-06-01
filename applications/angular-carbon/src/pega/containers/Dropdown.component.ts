import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ListItem } from 'carbon-components-angular';

@Component({
  selector: 'dx-dropdown-control',
  template: `
    @if(container.config.readOnly) {
      <span>{{container.config.value}}</span>
    } @else {
      <ibm-dropdown
        [label]="container.config.label"
        [helperText]="container.config.helperText"
        [invalid]="!!container.config.validatemessage"
        [invalidText]="container.config.validatemessage"
        [placeholder]="container.config.placeholder"
        (selected)="selected($event)"
        >
          <ibm-dropdown-list [items]="items"></ibm-dropdown-list>
      </ibm-dropdown>
    }`,
  standalone: false
})
export class DropdownComponent extends PContainerComponent implements OnInit {
  public items: ListItem[] = [];

  public override ngOnInit(): void {
    super.ngOnInit()
    this.items = this.container.config.datasource.map((item: { key: string, value: string }) => ({
      content: item.value,
      key: item.key,
      selected: item.key === this.container.config.value
    }));
  }

  public selected(val: Object): void {
    this.container.updateFieldValue((val as any).item.key);
  }
}

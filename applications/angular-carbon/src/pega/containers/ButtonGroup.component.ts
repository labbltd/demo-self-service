import { Component, OnInit } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { ListItem } from 'carbon-components-angular';

@Component({
    selector: 'dx-button-group',
    template: `
    <ibm-label
			[disabled]="container.config.readOnly"
			[helperText]="container.config.helperText"
			[invalid]="!!container.config.validatemessage"
			[invalidText]="container.config.validatemessage">
			{{container.config.label}}
        <div>
            <button *ngFor="let item of container.config.datasource"
                (click)="selected(item)"
                [ngClass]="{'bx--btn': true, 'bx--btn--field': true, 'bx--btn--secondary': item.key === container.config.value}">
                {{item.value}}
            </button>
        </div>
    </ibm-label>`,
    styles: [
        `.bx--btn {
            border-width: 1px;
            border-style: solid;
            border-color: transparent;
            margin-right: 5px;
            margin-top: 5px;
        }`
    ],
    standalone: false
})
export class ButtonGroupComponent extends PContainerComponent implements OnInit {
    public items: ListItem[] = [];

    public override ngOnInit(): void {
        super.ngOnInit()
        this.items = this.container.config.datasource.map((item: { key: string, value: string }) => ({
            content: item.value,
            selected: item.key === this.container.config.value
        }));
    }

    public selected(item: ListItem | ListItem[]): void {
        this.container.updateFieldValue((item as any).key);
        this.container.triggerFieldChange((item as any).key);
    }
}
import { Component, OnInit } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { PContainer, PContainerFactory } from "@labb/dx-engine";

@Component({
    selector: 'dx-scalar-list',
    template: `
        @for (child of items; track child.id) {
            <ng-container dxContainer [container]="child"/>
        }
    `,
    standalone: false
})
export class ScalarListComponent extends PContainerComponent implements OnInit {
    items!: PContainer[];

    public override async ngOnInit(): Promise<void> {
        super.ngOnInit();
        const scalarValues = this.container.config.value as any[];
        const restProps = this.container.config.restProps;
        this.items = await Promise.all(scalarValues?.map(scalarValue => {
            const pconnect = this.container.pconnect.createComponent(
                {
                    type: this.container.config.componentType,
                    config: {
                        value: scalarValue,
                        displayMode: 'LABELS_LEFT',
                        label: this.container.config.label,
                        ...restProps,
                        readOnly: true
                    }
                },
                '',
                '',
                {}
            ).props.getPConnect();
            return PContainerFactory.create(pconnect.getComponentName(), pconnect);
        }));
    }

}
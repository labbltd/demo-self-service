import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PContainerComponent } from '@labb/angular-adapter';
import { PContainer, PContainerFactory } from '@labb/dx-engine';

export interface CompareTableLayoutComponentScalarList {
    label: string;
    id: string;
    children?: PContainer[];
}

@Component({
    selector: 'dx-compare-table-layout',
    template: `
        <ng-container>
            @if (container.config.heading) {
                <h3>{{ container.config.heading }}</h3>
            }
        </ng-container>
        <ng-container>
            <div class="ap-selection-card-container">
                @if (selectionCards) {
                    @for (selectionCardItem of selectionCards; track selectionCardItem) {
                        <div class="ap-selection-card">
                            <pre>value="{{selectionCardItem.id}}" selectionLabel="{{selectionCardItem.label}}"</pre>
                            @for (child of selectionCardItem.children; track $index) {
                                <ng-template dxContainer [container]="child"]></ng-template>
                            }
                        </div>
                    }
                }
            </div>
        </ng-container>
    `,
    standalone: false
})
export class CompareTableLayoutContainerComponent extends PContainerComponent implements OnInit {
    public control = new FormControl();

    public selectionCards: CompareTableLayoutComponentScalarList[] = [];

    public override ngOnInit(): void {
        super.ngOnInit();
        this.createSelectionCards();
        this.control.setValue(this.container.config.value);
        this.control.valueChanges.subscribe((val) => this.change(val));
    }

    public change(e: any): void {
        this.container.pconnect.getActionsApi().updateFieldValue(this.container.pconnect.getStateProps().selectionProperty, e);
        this.container.pconnect.getActionsApi().triggerFieldChange(this.container.pconnect.getStateProps().selectionProperty, e);
    }

    private async createSelectionCards(): Promise<void> {
        const cardContentChildren = this.container.children[0].children || [];

        const labels: string[] = cardContentChildren.shift()?.config.value;
        if (!labels) {
            console.error('No labels found');
            return;
        }

        const idField = cardContentChildren.find((element) => element.config.label === 'ID');
        if (!idField) {
            console.error('No IDs found');
            return;
        }
        const ids: string[] = idField.config.value;

        for (const selectionCard of ids) {
            const selectionCardIndex = ids.indexOf(selectionCard);
            const components: PContainer[] = [];
            const childComponents = cardContentChildren;
            for (const child of childComponents) {
                if (child.config.label !== 'ID') {
                    components.push(await PContainerFactory.create(child.pconnect.getComponentName(), child.pconnect));
                }
            }

            this.selectionCards.push({
                label: labels[selectionCardIndex],
                id: ids[selectionCardIndex],
                children: components
            });
        }
    }
}

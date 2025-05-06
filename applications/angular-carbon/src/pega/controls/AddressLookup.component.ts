import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { TableHeaderItem, TableItem, TableModel } from "carbon-components-angular";
import { take } from "rxjs";

interface Address {
    OrganisationName: string;
    BuildingNumber: number;
    AddressLine: string;
    Postcode: string;
    Town: string;
    pyGUID: string;
}

@Component({
    selector: 'dx-address-lookup',
    template: `
    <ibm-label *ngIf="!searchResults && !address"> Zipcode
        <input ibmText type="text" [formControl]="control">
    </ibm-label>
    <ibm-table *ngIf="searchResults" [model]="model" [showSelectionColumn]="false" (rowClick)="selectAddress($event)"></ibm-table>
    <ibm-tile *ngIf="address">
        {{address.OrganisationName}} {{address.BuildingNumber}} {{address.AddressLine}} {{address.Postcode}} {{address.Town}}
    </ibm-tile>
    `
})
export class AddressLookupComponent extends PContainerComponent implements OnInit {
    public control = new FormControl('', { updateOn: 'blur' });
    public searchResults: Address[] | null = null;
    public address: Address | null = null;

    public model = new TableModel();

    public ngOnInit(): void {
        this.control.valueChanges.pipe(take(1)).subscribe(async () => {
            this.searchResults = (await window.PCore.getDataApiUtils().getData<Address>('D_AddressesList', {})).data.data;
            if (this.searchResults) {
                const data = ['OrganisationName', 'BuildingNumber', 'AddressLine', 'Postcode', 'Town'];
                this.model.header = data.map(d => new TableHeaderItem({ data: d }));
                this.model.data = this.searchResults.map(item => [
                    new TableItem({ data: item.OrganisationName }),
                    new TableItem({ data: item.BuildingNumber }),
                    new TableItem({ data: item.AddressLine }),
                    new TableItem({ data: item.Postcode }),
                    new TableItem({ data: item.Town })
                ]);
            }
        })
    }

    public selectAddress(index: number): void {
        if (this.searchResults) {
            this.address = this.searchResults[index];
            this.searchResults = null;
            this.container.updateFieldValue(this.address.pyGUID);
        }
    }
}
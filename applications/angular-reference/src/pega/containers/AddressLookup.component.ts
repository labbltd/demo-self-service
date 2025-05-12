import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
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
  template: `@if (!searchResults && !address) {
      <label > Zipcode
        <input type="text" [formControl]="control">
      </label>
  }
  @if (searchResults) {
    <table>
      <thead>
        <tr>
          @for (h of model.header; track h) {
            <th>{{h}}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of model.data; track $index; let i = $index) {
          <tr (click)="selectAddress(i)">
            @for (col of row; track col) {
              <td>{{col}}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  }
  @if (address) {
    <div>
      {{address.OrganisationName}} {{address.BuildingNumber}} {{address.AddressLine}} {{address.Postcode}} {{address.Town}}
    </div>
  }`,
  standalone: false
})
export class AddressLookupComponent extends PContainerComponent implements OnInit {
  public control = new FormControl('', { updateOn: 'blur' });
  public searchResults: Address[] | null = null;
  public address: Address | null = null;

  public model = {
    header: [] as string[],
    data: [] as (number | string)[][],
  };


  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.valueChanges.pipe(take(1)).subscribe(async () => {
      this.searchResults = (await window.PCore.getDataApiUtils().getData<Address>('D_AddressesList', {})).data.data;
      if (this.searchResults) {
        const data = ['OrganisationName', 'BuildingNumber', 'AddressLine', 'Postcode', 'Town'];
        this.model.header = data;
        this.model.data = this.searchResults.map(item => [
          item.OrganisationName,
          item.BuildingNumber,
          item.AddressLine,
          item.Postcode,
          item.Town
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

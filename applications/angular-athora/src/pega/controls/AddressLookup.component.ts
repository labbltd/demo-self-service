import { Component, OnInit } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { PContainer } from "@labb/dx-engine";

@Component({
  selector: 'dx-address-lookup',
  template: `
    <ng-container dxContainer [container]="zipcode" *ngIf="zipcode"></ng-container>
    <ng-container dxContainer [container]="houseNumber" *ngIf="houseNumber"></ng-container>
    <ng-container dxContainer [container]="addition" *ngIf="addition"></ng-container>
    <ng-container *ngIf="addressFound !== undefined && !addressFound">
      <mat-label>Adres niet gevonden</mat-label>
      <div class="found_address found_address_unknown">
        We hebben geen adres gevonden met deze gegevens. Vul hieronder je straatnaam en
        woonplaats in.
      </div>
      <ng-container dxContainer [container]="city" *ngIf="city"></ng-container>
      <ng-container dxContainer [container]="street" *ngIf="street"></ng-container>
    </ng-container>
    <ng-container *ngIf="addressFound !== undefined && addressFound">
      <mat-label>Gevonden Adres</mat-label>
      <div class="found_address">
          {{street.config.value}} {{houseNumber.config.value}} {{addition.config.value}}, {{city.config.value}}
      </div>
    </ng-container>
  `,
  host: {
    'class': 'dx-control'
  },
  styles: [
    `.found_address {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.75rem 1rem;
      font-style: italic;
      background-color: #e4e7e9;
      border-radius: 0.25rem;
      margin: 0.5rem 0 2.5rem;
    }
    .found_address_unknown {
      background-color: #fbf8e3;
    }`
  ]
})
export class AddressLookupComponent extends PContainerComponent implements OnInit {
  public addressFound!: boolean;
  public zipcode!: PContainer;
  public houseNumber!: PContainer;
  public addition!: PContainer;
  public street!: PContainer;
  public city!: PContainer;

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.zipcode = await this.container.createChild('TextInput', 'Postcode');
    this.houseNumber = await this.container.createChild('TextInput', 'Huisnummer');
    this.addition = await this.container.createChild('TextInput', 'Toevoeging');
    this.street = await this.container.createChild('TextInput', 'Straat');
    this.city = await this.container.createChild('TextInput', 'Plaats');

    this.zipcode.updates.subscribe(() => this.findAddress())
    this.houseNumber.updates.subscribe(() => this.findAddress())
  }

  private async findAddress(): Promise<void> {
    const zipcode = this.zipcode.config.value?.replaceAll(/\s/g, '').toUpperCase();
    const houseNumber = this.houseNumber.config.value?.replaceAll(/\s/g, '');
    if (zipcode?.match(/\d{4}[A-Z]{2}/) && houseNumber?.match(/\d+/)) {
      const resp = await fetch(
        `http://localhost:8001/Common.WebApi/api/v2/HomeObject/Address?zipCode=${zipcode}&houseNumber=${houseNumber}`
      );
      if (resp.ok) {
        const retrievedAddress = await resp.json();
        await this.street.updateFieldValue(retrievedAddress.Street);
        await this.street.triggerFieldChange(retrievedAddress.Street);
        await this.city.updateFieldValue(retrievedAddress.City);
        await this.city.triggerFieldChange(retrievedAddress.City);
      } else {
        await this.street.updateFieldValue('');
        await this.street.triggerFieldChange('');
        await this.city.updateFieldValue('');
        await this.city.triggerFieldChange('');
      }

      const address = [
        zipcode,
        houseNumber,
        this.addition.config.value,
        this.street.config.value,
        this.city.config.value
      ].join(',');
      await this.container.updateFieldValue(address);
      await this.container.triggerFieldChange(address);
      this.addressFound = resp.ok;
    }
  }
}

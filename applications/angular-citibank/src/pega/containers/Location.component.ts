import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { Location } from "@labb/dx-engine";
import { CdsDropdownService } from "../../design-system/cds-dropdown/cds-dropdown.service";

@Component({
    selector: 'dx-location',
    template: `
        <cds-form-field [label]="container.config.label" [for]="container.id">
            @if(this.container.config.readOnly) {
                {{container.config.value}}
            } @else {
            <input cdsInput
                #input
                type="text"
                [formControl]="searchControl"
                [name]="container.id"
                (blur)="updateSearch()">
            }
        </cds-form-field>
        @if(suggestions.length > 0) {
            <cds-form-field [label]="container.config.label" [errorMessage]="container.config.validatemessage">
                <cds-dropdown (selected)="select($event)" [value]="container.config.value" [disabled]="container.config.readOnly">
                    @for(suggestion of suggestions; track suggestion) {
                        <cds-option (click)="submit(suggestion)" [value]="suggestion"></cds-option>
                    }
                </cds-dropdown>
            </cds-form-field>
        }
        <div #map style="height: 25rem"></div>
    `,
    providers: [CdsDropdownService],
    standalone: false
})
export class LocationComponent extends PContainerComponent<Location> implements AfterViewInit {
    @ViewChild('map') map!: ElementRef;
    public searchControl = new FormControl();
    public selectControl = new FormControl('');
    public suggestions: string[] = [];

    public constructor(private dropdownService: CdsDropdownService) {
        super();
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.container.loadMap(this.map.nativeElement);
        this.searchControl.setValue(this.container.config.value);
    }

    public async updateSearch() {
        this.suggestions = await this.container.getPlacePredictions(this.searchControl.value);
    }

    public submit(value: string) {
        this.dropdownService.submit(value);
    }

    public async select(value: string) {
        this.container.updateFieldValue(value);
        this.container.triggerFieldChange(value);
    }
}
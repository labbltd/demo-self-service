import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { Location } from "@labb/dx-engine";

@Component({
    selector: 'dx-location',
    template: `
        <label> {{container.config.label}}
            <input type="text" [formControl]="searchControl" (change)="updateSearch($event)">
        </label>
        @if(suggestions.length > 0) {
            <select [formControl]="selectControl" (change)="select($event)">
                <option value selected>Select {{container.config.label}}...</option>
                @for(suggestion of suggestions; track suggestion) {
                    <option [value]="suggestion">{{suggestion}}</option>
                }
             </select>
        }
        <div #map style="height: 25rem"></div>
    `,
    standalone: false
})
export class LocationComponent extends PContainerComponent<Location> implements AfterViewInit {
    @ViewChild('map') map!: ElementRef;
    public searchControl = new FormControl('');
    public selectControl = new FormControl('');
    public suggestions: string[] = [];

    public async ngAfterViewInit(): Promise<void> {
        await this.container.loadMap(this.map.nativeElement);
    }

    public async updateSearch(event: Event) {
        this.suggestions = await this.container.getPlacePredictions((event.target as HTMLInputElement)?.value);
    }

    public async select(event: Event) {
        this.container.updateFieldValue((event.target as HTMLSelectElement).value);
        this.container.triggerFieldChange((event.target as HTMLSelectElement).value);
    }
}
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { Location } from "@labb/dx-engine";
import { ListItem } from "carbon-components-angular";

@Component({
    selector: 'dx-location',
    template: `
        @if (container.config.readOnly) {
            <dt>{{ container.config.label }}</dt><dd>{{container.config.value ?? '--'}}</dd>
        } @else {
            <ibm-label
                [helperText]="container.config.helperText"
                [invalid]="!!container.config.validatemessage"
                [invalidText]="container.config.validatemessage">
                {{container.config.label}}
                <input ibmText
                    [type]="'text'"
                    [formControl]="searchControl"
                    (change)="updateSearch($event)">
            </ibm-label>
        @if(suggestions.length > 0) {
            <ibm-dropdown (selected)="select($event)">
                <ibm-dropdown-list [items]="suggestions"></ibm-dropdown-list>
            </ibm-dropdown>
        }
        <div #map [attr.style]="'height: 25rem; margin-bottom: 1.5rem; display: ' + (container.config.value ? 'block' : 'none')"></div>
    }
    `,
    standalone: false
})
export class LocationComponent extends PContainerComponent<Location> implements AfterViewInit {
    @ViewChild('map') map!: ElementRef;
    public searchControl = new FormControl('');
    public selectControl = new FormControl('');
    public suggestions: ListItem[] = [];

    public async ngAfterViewInit(): Promise<void> {
        if (this.container.config.readOnly) return;
        await this.container.loadMap(this.map.nativeElement);
    }

    public async updateSearch(event: Event) {
        const list = await this.container.getPlacePredictions((event.target as HTMLInputElement)?.value);
        this.suggestions = list.map((item: string) => ({
            content: item,
            key: item,
            selected: item === this.container.config.value
        }));
    }

    public async select(value: any) {
        // IBM does not properly type the event object
        await this.container.setLocation(value.item.key);
    }
}
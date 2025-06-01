import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { Location } from "@labb/dx-engine";

@Component({
    selector: 'dx-location',
    template: `
    @if (container.config.readOnly) {
        <dx-input-wrapper
            [label]="container.config.label" 
            [labelEnd]="container.config.helperText"
            [errorMessage]="container.config.validatemessage">
            {{container.config.value}}
        </dx-input-wrapper>
    } @else {
        <dx-input-wrapper
            [label]="container.config.label" 
            [labelEnd]="container.config.helperText"
            [errorMessage]="container.config.validatemessage">
            <dx-input>
                <input
                    [id]="container.id"
                    [type]="'text'"
                    [formControl]="searchControl"
                    (change)="updateSearch($event)"
                />
            </dx-input>
        </dx-input-wrapper>
        @if(suggestions.length > 0) {
            <dx-input-wrapper
                [errorMessage]="container.config.validatemessage | translate:'dropdown'">
                <dx-select
                    [value]="container.config.value"
                    [options]="suggestions"
                    (valueChanged)="select($event)"></dx-select>
            </dx-input-wrapper>
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
    public suggestions: { key: string, value: string }[] = [];

    public async ngAfterViewInit(): Promise<void> {
        await this.container.loadMap(this.map.nativeElement);
        if (this.container.config.value && !this.searchControl.value) {
            await this.prefill();
        }
        this.container.updates.subscribe(() => {
            if (this.container.config.value) {
                this.prefill();
            }
        });
    }

    private async prefill() {
        const event = { target: { value: this.container.config.value } } as any;
        this.searchControl.setValue(this.container.config.value);
        await this.updateSearch(event);
        this.selectControl.setValue(this.container.config.value);
        await this.select(this.container.config.value);
        await this.container.putMarker(this.container.config.value);
    }

    public async updateSearch(event: Event) {
        const list = await this.container.getPlacePredictions((event.target as HTMLInputElement)?.value);
        this.suggestions = list.map(suggestion => ({ key: suggestion, value: suggestion }));
    }

    public async select(value: string) {
        this.container.updateFieldValue(value);
        this.container.triggerFieldChange(value);
    }
}
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PContainerComponent } from "@labb/angular-adapter";
import { Location } from "@labb/dx-engine";

@Component({
    selector: 'dx-location',
    template: `
    @if(container.config.readOnly) {
        <div class="dx-control">
          <mat-label>
            {{ container.config.label }}
          </mat-label>
          {{container.config.value}}
        </div>
    } @else  {
     <div class="dx-control">
        <mat-label>
            {{ container.config.label ?? '--'}}
        </mat-label>
        <mat-form-field [floatLabel]="'always'">
            <input
                matInput
                [value]="container.config.value"
                [formControl]="searchControl"
                (change)="updateSearch($event)"
            />
            @if(container.config.validatemessage) { <mat-error>{{container.config.validatemessage}}</mat-error> }
        </mat-form-field>
        </div>
        @if(suggestions.length > 0) {
            <div class="dx-control">
                <mat-label></mat-label>
                <mat-form-field [floatLabel]="'always'">
                    <mat-select [formControl]="selectControl">
                        @for(suggestion of suggestions; track suggestion) {
                            <mat-option [value]="suggestion">
                                {{suggestion}}
                            </mat-option>
                        }
                    </mat-select>
                </mat-form-field>
            </div>
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
    public suggestions: string[] = [];

    public async ngAfterViewInit(): Promise<void> {
        if (this.container.config.readOnly) return;
        await this.container.loadMap(this.map.nativeElement);
        this.selectControl.valueChanges.subscribe(() => {
            this.select(this.selectControl.value);
        })
    }

    public async updateSearch(event: Event) {
        this.suggestions = await this.container.getPlacePredictions((event.target as HTMLInputElement)?.value);
    }

    public async select(value: string | null) {
        if (value) {
            this.container.setLocation(value);
        }
    }
}
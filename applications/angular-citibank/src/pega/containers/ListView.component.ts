import { Component, OnInit } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";

@Component({
    selector: 'dx-list-view',
    template: `
        <h1>{{container.config.title}}</h1>
        @if (loading) { <h2>{{'Loading data...'}}</h2> }
        <table class="cds-table">
            <thead>
                <tr>
                    @for (header of headers; track header) {
                        <th [attr.data-track]="header">{{header}}</th>
                    }
                </tr>
            </thead>
            <tbody>
                @for (row of data; track (row.pzInsKey || row.pyGUID)) {
                    <tr (click)="select(row)" [attr.data-track]="(row.pzInsKey || row.pyGUID)">
                        @for(cell of columns; track cell) {
                            <td [attr.data-track]="cell">{{row[cell]}}</td>
                        }
                    </tr>
                }
            </tbody>
        </table>
        @if (container.config.value && container.config.referenceList === 'D_BikesList') {
            <h4>Selected bike: {{selectedBike.TypeOfBike}}</h4>
            <img width="300px" [src]="selectedBike?.DisplayImage"/>
        }
    `,
    standalone: false,
    styles: [
        `
            tbody tr:hover {
                background-color: #f8f9fa;
            }
            tbody tr {
                cursor: pointer;
            }
        `
    ]
})
export class ListViewComponent extends PContainerComponent implements OnInit {
    public loading = true;
    public data!: any[];
    public headers!: string[];
    public columns!: string[];

    public get selectedBike() {
        return this.data.find(bike => bike.pyGUID === this.container.config.value);
    }

    override async ngOnInit(): Promise<void> {
        super.ngOnInit();
        this.columns = this.getColumns(this.container.pconnect.getRawMetadata().config)
            .map(col => col.config.value.replace('@P .', ''));
        this.headers = this.getHeaders();
        const datapage = await window.PCore.getDataApiUtils().getData(this.container.config.referenceList, {})
        this.data = datapage.data.data;
        this.loading = false;
    }

    public select(row: any) {
        if (this.container.config.rowClickAction === "openAssignment") {
            this.openAssignment(row);
        } else {
            this.container.updateFieldValue(row.pyGUID);
            this.container.triggerFieldChange(row.pyGUID);
        }
    }

    public openAssignment(row: any) {
        const { pxRefObjectClass, pzInsKey } = row;
        const sTarget = this.container.pconnect.getContainerName();
        const options: any = { containerName: sTarget };
        this.container.pconnect.getActionsApi().openAssignment(pzInsKey, pxRefObjectClass, options);
    }

    private getHeaders() {
        return this.getColumns(this.container.config)
            .map((option, idx) => option.config.label || this.columns[idx]);
    }

    private getColumns(config: any): { config: { labelOption: string, label: string, value: string } }[] {
        return config.presets?.[0].children[0].children || [];
    }
}
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
                        <th>{{header}}</th>
                    }
                </tr>
            </thead>
            <tbody>
                @for (row of data; track row.pzInsKey) {
                    <tr (click)="openAssignment(row)">
                        @for(cell of columns; track cell) {
                            <td>{{row[cell]}}</td>
                        }
                    </tr>
                }
            </tbody>
        </table>
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

    override async ngOnInit(): Promise<void> {
        super.ngOnInit();
        this.headers = this.getColumns(this.container.config)
            .map(col => col.config.label);
        this.columns = this.getColumns(this.container.pconnect.getRawMetadata().config)
            .map(col => col.config.value.replace('@P .', ''));
        const datapage = await window.PCore.getDataApiUtils().getData(this.container.config.referenceList, {})
        this.data = datapage.data.data;
        this.loading = false;
    }

    public openAssignment(row: any) {
        const { pxRefObjectClass, pzInsKey } = row;
        const sTarget = this.container.pconnect.getContainerName();
        const options: any = { containerName: sTarget };
        this.container.pconnect.getActionsApi().openAssignment(pzInsKey, pxRefObjectClass, options);
    }

    private getColumns(config: any): { config: { label: string, value: string } }[] {
        return config.presets?.[0].children[0].children || [];
    }
}
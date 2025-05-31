import { Component, OnInit } from "@angular/core";
import { PContainerComponent } from "@labb/angular-adapter";
import { ListView } from "@labb/dx-engine";

@Component({
    selector: 'dx-list-view',
    template: `
        <cds-form-field [label]="container.config.label" [for]="container.id"
          [tooltip]="{body: container.config.helperText}"
          [errorMessage]="container.config.validatemessage"></cds-form-field>
        <table class="cds-table">
            <thead>
                <tr>
                    @if(container.singleSelectionMode || container.multiSelectionMode) {
                        <th>Select</th>
                    }
                    @for(col of container.fields; track col.config.name) {
                        <th>{{col.config.label}}</th>
                    }
                </tr>
            </thead>
            <tbody>
                @for(row of container.updatedRefList; track row.id) {
                    <tr>
                        @if(container.singleSelectionMode) {
                        <td>
                            <cds-form-field>
                                <cds-radio-group>
                                    <cds-radio [for]="row.id">
                                        <input cdsInput type="radio" 
                                            [id]="row.id"
                                            [value]="row[container.rowID]"
                                            [checked]="row[container.rowID] === container.config.value"
                                            (change)="selectRow(row)"
                                            >
                                    </cds-radio>
                                </cds-radio-group>
                            </cds-form-field>
                        </td>
                        }
                        @if(container.multiSelectionMode) {
                        <td>
                            <input type="checkbox"
                            [name]="container.id"
                            [value]="row[container.rowID]"
                            [checked]="row[container.rowID] === container.config.value"
                            (change)="selectRow(row, $event)"/>
                        </td>
                        }
                        @for(col of container.fields; track col.config.name) {
                            @if(container.showButton(col.config.name, col)) {
                                <td>
                                    <a (click)="container.listViewClick(col.config, row)"
                                        [innerHTML]="row[col.config.name] || '---'"></a>
                                </td>
                            } @else {
                                <td [innerHTML]="row[col.config.name] || '---'"></td>
                            }
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
export class ListViewComponent extends PContainerComponent<ListView> implements OnInit {
    public selectRow(row: any, event?: Event) {
        this.container.selectRow(row, event && (event.target as HTMLInputElement).checked);
    }
}
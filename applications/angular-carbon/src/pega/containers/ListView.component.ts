import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ListView } from '@labb/dx-engine';

@Component({
  selector: 'dx-list-view-container',
  template: `
    <ibm-label
        [helperText]="container.config.helperText"
        [invalid]="!!container.config.validatemessage"
        [invalidText]="container.config.validatemessage">
        {{container.config.label}}
    </ibm-label>
    <table cdsTable>
      <thead cdsTableHead>
        <tr>
          @if(container.singleSelectionMode || container.multiSelectionMode) {
            <th>Select</th>
          }
          @for(col of container.fields; track col.config.name) {
            <th>{{col.config.label}}</th>
          }
        </tr>
      </thead>
      <tbody cdsTableBody>
        @for(row of container.updatedRefList; track row.id) {
          <tr >
            @if(container.singleSelectionMode) {
              <td >
                <input type="radio" 
                  [name]="container.id" 
                  [value]="row[container.rowID]" 
                  [checked]="row[container.rowID] === container.config.value" 
                  (change)="selectRow(row)"/>
              </td>
            }
            @if(container.multiSelectionMode) {
              <td >
                <input type="checkbox"
                  [name]="container.id"
                  [value]="row[container.rowID]"
                  [checked]="row[container.rowID] === container.config.value"
                  (change)="selectRow(row, $event)"/>
              </td>
            }
            @for(col of container.fields; track col.config.name) {
              @if(container.showButton(col.config.name, col)) {
                  <td >
                      <a (click)="container.listViewClick(col.config, row)"
                          [innerHTML]="row[col.config.name] || '---'"></a>
                  </td>
              } @else {
                  <td  [innerHTML]="row[col.config.name] || '---'"></td>
              }
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  standalone: false
})
export class ListViewComponent extends PContainerComponent<ListView> {
  public selectRow(row: any, event?: Event) {
    this.container.selectRow(row, event && (event.target as HTMLInputElement).checked);
  }
}

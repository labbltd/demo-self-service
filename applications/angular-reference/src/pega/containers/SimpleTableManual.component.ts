import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { SimpleTableManual } from '@labb/dx-engine';

@Component({
  selector: 'dx-simple-table-manual-container',
  template: `
    @if(container.config.label) {
      <h3>{{container.config.label}}</h3>
    }
    @if(container.readOnlyMode) {
      <table>
        <thead>
          @for(col of container.processedFields; track col.config.name) {
            <th>{{col.config.name}}</th>
          }
        </thead>
        <tbody>
          @for(row of container.rowData; track row.id) {
            <tr>
              @for(col of container.processedFields; track col.config.name) {
                <td [innerHTML]="row[col.config.name] || '---'"></td>
              }
            </tr>
          }
        </tbody>
      </table>
    }
    @if(container.editableMode) {
      <table>
        <thead>
          @for(col of container.fieldDefs; track col.name) {
            <th>{{col.label}}</th>
          }
        </thead>
        <tbody>
          @for(row of container.elementsData; track $index) {
            <tr>
              @for(col of row; track $index) {
                <td>
                  <ng-container dxContainer [container]="col"/>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  standalone: false
})
export class SimpleTableManualComponent extends PContainerComponent<SimpleTableManual> {
}

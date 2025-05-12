import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { SimpleTable } from '@labb/dx-engine';

@Component({
  selector: 'dx-simple-table-container',
  template: `
    <table>
      <thead>
        <tr>
          @for (col of headers; track col) {
            <th>{{col}}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of cells; track $index) {
          <tr>
            @for (col of row; track col) {
              <td>{{col}}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  standalone: false
})
export class SimpleTableComponent extends PContainerComponent<SimpleTable> {

  public get headers() {
    return (this as any).container.children?.[0].headers;
  }

  public get cells() {
    return (this as any).container.children?.[0].cells;
  }
}

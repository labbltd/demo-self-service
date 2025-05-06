import { Component } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { SimpleTable } from '@labb/dx-engine';

@Component({
  selector: 'dx-simple-table-container',
  template: `
    <table>
      <thead>
        <tr><th *ngFor="let col of headers">{{col}}</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of cells">
          <td *ngFor="let col of row">{{col}}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class SimpleTableComponent extends PContainerComponent<SimpleTable> {

  public get headers() {
    return (this as any).container.children?.[0].headers;
  }

  public get cells() {
    return (this as any).container.children?.[0].cells;
  }
}

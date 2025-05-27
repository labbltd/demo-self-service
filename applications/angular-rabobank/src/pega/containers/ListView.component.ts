import { Component, OnInit } from '@angular/core';
import { PContainerComponent } from '@labb/angular-adapter';
import { ListView } from '@labb/dx-engine';

@Component({
  selector: 'dx-list-view-container',
  template: `
    <table class="sfc-table">
      @if(container.label) {
        <caption>{{container.label}}</caption>
      }
      <thead>
        <tr>
          @if(container.singleSelectionMode || container.multiSelectionMode) {
            <th class="column-width"></th>
          }
          @for(col of container.fields; track col.config.name) {
            <th class="column-width">{{col.config.label}}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for(row of container.updatedRefList; track row.id) {
          <tr>
            @if(container.singleSelectionMode) {
              <td class="column-width">
                <input type="radio" 
                  [name]="container.id" 
                  [value]="row[container.rowID]" 
                  [checked]="row[container.rowID] === container.config.value" 
                  (change)="selectRow(row)"/>
              </td>
            }
            @if(container.multiSelectionMode) {
              <td class="column-width">
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
    @if(container.config.validatemessage) {
      <div class="sfc-input-error-root">
          <div class="sfc-input-error">
              <dx-icon class="sfc-input-error__icon"
                  name="exclamation-circle-fill"
                  size="xs">
              </dx-icon>
              <span>{{container.config.validatemessage}}</span>
          </div>
      </div>
    }
  `,
  styles: [
    `
    .sfc-input-error-root {
        font-family: var(--sfc-paragraph-font-family);
        line-height: var(--sfc-paragraph-font-line-height);
        font-size: var(--sfc-paragraph-font-size);
        font-style: var(--sfc-paragraph-font-style);
        font-weight: var(--sfc-paragraph-font-weight);
        margin: var(--sfc-paragraph-margin);
        -webkit-font-smoothing: var(--sfc-paragraph-font-smoothing);
        display: block;
        color: var(--sfc-input-error-color-text, #e03100);
    }

    .sfc-input-error {
        display: flex;
        align-items: flex-start;
    }

    [class^="sfc-input-error"] {
        line-height: normal;
        box-sizing: border-box;
        overflow-wrap: anywhere;
    }

    .sfc-input-error__icon {
        margin-top: 1px;
        margin-right: var(--sfc-input-error-icon-margin-block-end, 4px);
        color: var(--sfc-input-error-icon-color, #e03100);
        display: inline-block;
        fill: currentcolor;
    }
    `
  ],
  standalone: false
})
export class ListViewComponent extends PContainerComponent<ListView> implements OnInit {
  public selectRow(row: any, event?: Event) {
    this.container.selectRow(row, event && (event.target as HTMLInputElement).checked);
  }
}

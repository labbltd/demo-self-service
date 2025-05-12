import { Component } from "@angular/core";

@Component({
    selector: 'cds-error',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        'class': 'cds-error'
    },
    styles: [
        `:host {
            display: block;
        }`
    ],
    standalone: false
})
export class CdsErrorComponent { }
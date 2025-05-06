import { Component, Input } from "@angular/core";
import { CdsDropdownService } from "../cds-dropdown/cds-dropdown.service";

@Component({
    selector: 'cds-option',
    template: `
        <span class="select-option" (click)="submit(value)">{{value}}</span>
    `,
    host: {
        class: 'cds-option'
    },
    styles: [
        `
            :host{
                display:block;
                cursor:pointer;
                font-size:16px;
                font-weight:300;
                letter-spacing:0;
                padding-top:10px;
                padding-bottom:10px;
                line-height:24px;
                padding-left:20px;color:#333
            }
            :host:hover{
                color:#056dae;
                font-weight:700
            }
            .active{
                color:#056dae;
                font-weight:700
            }
        `
    ]
})
export class CdsOptionComponent {
    @Input() value!: string;

    public constructor(private dropdownService: CdsDropdownService) { }

    public submit(value: string) {
        this.dropdownService.submit(value);
    }
}
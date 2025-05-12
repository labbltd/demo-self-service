import { Component, Input } from "@angular/core";

@Component({
    selector: 'cds-option',
    template: `
        <span class="select-option">{{value}}</span>
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
    ],
    standalone: false
})
export class CdsOptionComponent {
    @Input() value!: string;
}
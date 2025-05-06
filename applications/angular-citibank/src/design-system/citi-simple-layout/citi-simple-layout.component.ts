import { Component, Input } from "@angular/core";

@Component({
    selector: 'citi-simple-layout',
    templateUrl: './citi-simple-layout.component.html'
})
export class CitiSimpleLayout {
    @Input() steps!: { name: string, active?: boolean }[];

    public get progression() {
        if (!this.steps) {
            return 0;
        }
        return Math.max(this.steps.findIndex(step => step.active) * 100 / this.steps.length, 0);
    }
}
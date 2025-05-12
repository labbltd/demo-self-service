import { Pipe, PipeTransform } from "@angular/core";

import { translations } from './translations';

@Pipe({
    name: 'translate',
    pure: true,
    standalone: false
})
export class TranslatePipe implements PipeTransform {
    public transform(value: string): string {
        return translations[value.trim()] ?? value;
    }
}
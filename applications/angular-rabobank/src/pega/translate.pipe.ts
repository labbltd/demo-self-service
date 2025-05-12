import { Pipe, PipeTransform } from "@angular/core";

import { translations } from './translations';

@Pipe({
    name: 'translate',
    pure: true,
    standalone: false
})
export class TranslatePipe implements PipeTransform {
    public transform(value: string, arg?: string): string {
        if (!value) return value;
        if (translations[arg + ' ' + value.trim()]) return translations[arg + ' ' + value.trim()];
        if (translations[value.trim()]) return translations[value.trim()];
        return value;
    }
}
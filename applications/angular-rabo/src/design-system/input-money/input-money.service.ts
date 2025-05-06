import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import '@angular/common/locales/global/nl';

@Injectable({ providedIn: 'root' })
export class DxAmountsService {
    public constructor(private decimalPipe: DecimalPipe) {
    }

    public getViewValue(value: string | null, numberOfDecimals: number): string {
        let modifiedValue = '';

        if (value && value !== '-') {
            const digitsInfo = `1.${numberOfDecimals}-${numberOfDecimals}`;
            const locale = 'nl';
            const interpretedValue = this.getValue(value, numberOfDecimals);
            modifiedValue = this.decimalPipe.transform(interpretedValue, digitsInfo, locale) || '';
        }

        return modifiedValue;
    }

    public getValue(value: string, numberOfDecimals: number): number | null {
        if (!value) {
            return null;
        }
        const parts = value.split(/[,.]/g);
        if (parts.length === 1) {
            return Number(parts[0]);
        }
        if (parts[0] === '' || parts[0] === '0') {
            return Number(`0.${parts[parts.length - 1]}`);
        }
        if (parts[parts.length - 1].length <= numberOfDecimals) {
            return Number(`${parts.slice(0, parts.length - 1).join('')}.${parts[parts.length - 1]}`);
        }
        return Number(value.replace(/[,.]/g, ''));
    }

    public limitValue(value: string, maxDigits: number, numberOfDecimals: number): string {
        const parts = this.translate(value.replace(/[^\d.,]/g, '')).split(',');
        const digits = this.limitDigits(parts[0], maxDigits);
        if (parts.length > 1 && numberOfDecimals > 0) {
            return `${digits},${parts[1].replace(/[^\d]/g, '').substring(0, numberOfDecimals)}`;
        }
        return digits;
    }

    public hasDotPositionChanged(oldValue: string, newValue: string): boolean {
        if (oldValue.indexOf('.') > -1 && oldValue !== newValue) {
            return true;
        }
        return false;
    }

    private translate(value: string): string {
        // normal values are entered in dutch locale
        // however, on paste american notation should be translated to dutch
        if (!this.isDutch(value)) {
            return value.replace(/,/g, '@').replace(/\./g, ',').replace(/@/g, '.');
        }
        return value;
    }

    private isDutch(value: string): boolean {
        return !value.match(/(,\d{3}){2,}(\.\d+)?/g);
    }

    private limitDigits(value: string, maxDigits: number): string {
        // if maxDigits is n, then we should return the substring upto the nth digit
        // i.e. non-digit characters do not count in the substring length
        let digitCount = 0;
        let limitedValue = '';
        for (const char of value) {
            limitedValue += char;
            if (char.match(/\d/)) {
                digitCount++;
            }
            if (digitCount === maxDigits) {
                return limitedValue;
            }
        }
        return limitedValue;
    }
}

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdsButtonDirective } from './cds-button/cds-button.directive';
import { CdsCheckboxComponent } from './cds-checkbox/cds-checkbox.component';
import { CdsDropdownComponent } from './cds-dropdown/cds-dropdown.component';
import { CdsErrorComponent } from './cds-error/cds-error.component';
import { CdsFormfieldComponent } from './cds-formfield/cds-formfield.component';
import { CdsInputDirective } from './cds-input/cds-input.directive';
import { CdsOptionComponent } from './cds-option/cds-option.component';
import { CdsRadioGroupComponent } from './cds-radio-group/cds-radio-group.component';
import { CdsRadioComponent } from './cds-radio/cds-radio.component';
import { CitiHeaderComponent } from './citi-header/citi-header.component';
import { CitiSimpleLayout } from './citi-simple-layout/citi-simple-layout.component';
import { CdsDesignSystemComponent } from './design-system.component';
import { CdsIcon } from './cds-icon/cds-icon.component';

const components: any[] = [
    CdsButtonDirective,
    CdsCheckboxComponent,
    CdsErrorComponent,
    CdsFormfieldComponent,
    CdsInputDirective,
    CitiHeaderComponent,
    CitiSimpleLayout,
    CdsRadioComponent,
    CdsRadioGroupComponent,
    CdsDesignSystemComponent,
    CdsDropdownComponent,
    CdsOptionComponent,
    CdsIcon
]

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    declarations: components,
    exports: components
})
export class CdsDesignSystemModule { }
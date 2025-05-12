import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdsFormfieldComponent } from './cds-formfield/cds-formfield.component';
import { CdsErrorComponent } from './cds-error/cds-error.component';
import { CdsInputDirective } from './cds-input/cds-input.directive';
import { CdsCheckboxComponent } from './cds-checkbox/cds-checkbox.component';
import { CitiHeaderComponent } from './citi-header/citi-header.component';
import { CitiSimpleLayout } from './citi-simple-layout/citi-simple-layout.component';
import { CdsRadioComponent } from './cds-radio/cds-radio.component';
import { CdsRadioGroupComponent } from './cds-radio-group/cds-radio-group.component';
import { CdsDesignSystemComponent } from './design-system.component';
import { CdsDropdownComponent } from './cds-dropdown/cds-dropdown.component';
import { CdsOptionComponent } from './cds-option/cds-option.component';
import { CdsButtonDirective } from './cds-button/cds-button.directive';
import { CdsDropdownService } from './cds-dropdown/cds-dropdown.service';

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
    CdsOptionComponent
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
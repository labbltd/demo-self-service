import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PContainerModule } from '@labb/angular-adapter';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PegaComponent } from './pega.component';
import { PegaMappingModule } from './pega.mapping.module';

@NgModule({
  imports: [CommonModule, PContainerModule, PegaMappingModule],
  declarations: [
    PegaComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        hideRequiredMarker: true,
        floatLabel: 'never',
        subscriptSizing: 'fixed'
      }
    }
  ],
  exports: [PegaComponent],
})
export class PegaModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PContainerModule } from '@labb/angular-adapter';

import { PegaComponent } from './pega.component';
import { PegaMappingModule } from './pega.mapping.module';
import { DesignSystemModule } from '../design-system/design-system.module';

@NgModule({
  imports: [
    CommonModule,
    PContainerModule,
    PegaMappingModule,
    DesignSystemModule
  ],
  declarations: [
    PegaComponent
  ],
  exports: [PegaComponent],
})
export class PegaModule { }

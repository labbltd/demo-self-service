import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PContainerModule } from '@labb/angular-adapter';

import { UtilsModule, UIShellModule, GridModule } from 'carbon-components-angular';

import { PegaComponent } from './pega.component';
import { PegaMappingModule } from './pega.mapping.module';

@NgModule({
  imports: [
    CommonModule,
    PContainerModule,
    PegaMappingModule,
    UtilsModule,
    UIShellModule,
    GridModule
  ],
  declarations: [PegaComponent],
  exports: [PegaComponent],
})
export class PegaModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PContainerModule } from '@labb/angular-adapter';

import { PegaCaseComponent } from './pega-case.component';
import { PegaPortalComponent } from './pega-portal.component';
import { PegaComponent } from './pega.component';
import { PegaMappingModule } from './pega.mapping.module';
import { CdsDesignSystemModule } from '../design-system/design-system.module';
import { CdsDesignSystemComponent } from '../design-system/design-system.component';

@NgModule({
  imports: [
    CommonModule,
    PContainerModule,
    PegaMappingModule,
    CdsDesignSystemModule,
    RouterModule.forRoot([
      { path: 'design', component: CdsDesignSystemComponent },
      { path: 'portal', component: PegaPortalComponent },
      { path: '', component: PegaCaseComponent }
    ])
  ],
  declarations: [PegaComponent, PegaCaseComponent, PegaPortalComponent],
  exports: [PegaComponent],
})
export class PegaModule { }

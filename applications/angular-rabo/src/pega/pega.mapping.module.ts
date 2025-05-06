import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  DYNAMIC_CONTAINERS,
  PContainerModule,
} from '@labb/angular-adapter';

import { AppShellComponent } from './container-mapping/AppShell.component';
import { AttachmentComponent } from './container-mapping/Attachment.component';
import { CaseViewComponent } from './container-mapping/CaseView.component';
import { CurrencyComponent } from './container-mapping/Currency.component';
import { DefaultComponent } from './container-mapping/Default.component';
import { DefaultFormComponent } from './container-mapping/DefaultForm.component';
import { DetailsComponent } from './container-mapping/Details.component';
import { DropdownComponent } from './container-mapping/Dropdown.component';
import { FlowContainerComponent } from './container-mapping/FlowContainer.component';
import { ModalViewContainerComponent } from './container-mapping/ModalViewContainer.component';
import { OneColumnComponent } from './container-mapping/OneColumn.component';
import { RadioButtonsComponent } from './container-mapping/RadioButtons.component';
import { DesignSystemModule } from '../design-system/design-system.module';
import { TranslatePipe } from './translate.pipe';
import { ViewContainerComponent } from './container-mapping/ViewContainer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignSystemModule,
    PContainerModule
  ],
  declarations: [
    TranslatePipe,
    DropdownComponent,
    RadioButtonsComponent,
    OneColumnComponent,
    DefaultComponent,
    DefaultFormComponent,
    FlowContainerComponent,
    CaseViewComponent,
    ModalViewContainerComponent,
    AttachmentComponent,
    AppShellComponent,
    DetailsComponent,
    CurrencyComponent,
    ViewContainerComponent
  ],
  providers: [
    {
      provide: DYNAMIC_CONTAINERS,
      useValue: {
        default: DefaultComponent,
        Child: DefaultComponent,

        // layouts
        AppShell: AppShellComponent,
        CaseView: CaseViewComponent,
        Details: DetailsComponent,
        DefaultForm: DefaultFormComponent,
        FlowContainer: FlowContainerComponent,
        ModalViewContainer: ModalViewContainerComponent,
        OneColumn: OneColumnComponent,
        PreviewViewContainer: DefaultComponent,
        reference: DefaultComponent,
        Region: DefaultComponent,
        RootContainer: DefaultComponent,
        View: DefaultComponent,
        ViewContainer: ViewContainerComponent,
        Group: DefaultComponent,

        // controls
        Currency: CurrencyComponent,
        Dropdown: DropdownComponent,
        RadioButtons: RadioButtonsComponent,
      },
      multi: true,
    },
  ],
})
export class PegaMappingModule { }

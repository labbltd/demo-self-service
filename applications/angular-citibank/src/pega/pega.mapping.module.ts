import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DYNAMIC_CONTAINERS,
  PContainerModule,
} from '@labb/angular-adapter';
import { ActionableButtonComponent } from './containers/ActionableButton.component';
import { AddressLookupComponent } from './containers/AddressLookup.component';
import { AppShellComponent } from './containers/AppShell.component';
import { AttachmentComponent } from './containers/Attachment.component';
import { CaseViewComponent } from './containers/CaseView.component';
import { CheckboxComponent } from './containers/Checkbox.component';
import { CompareTableLayoutContainerComponent } from './containers/compare-table-layout.container.component';
import { DefaultComponent } from './containers/Default.component';
import { DefaultFormComponent } from './containers/DefaultForm.component';
import { DetailsComponent } from './containers/Details.component';
import { DetailsThreeColumnComponent } from './containers/DetailsThreeColumns';
import { DropdownComponent } from './containers/Dropdown.component';
import { FlowContainerComponent } from './containers/FlowContainer.component';
import { ModalViewContainerComponent } from './containers/ModalViewContainer.component';
import { MultiselectComponent } from './containers/Multiselect.component';
import { OneColumnComponent } from './containers/OneColumn.component';
import { RadioButtonsComponent } from './containers/RadioButtons.component';
import { RichTextComponent } from './containers/RichText.component';
import { ScalarListComponent } from './containers/ScalarList.component';
import { SimpleTableComponent } from './containers/SimpleTable.component';
import { TextAreaComponent } from './containers/TextArea.component';
import { TextInputComponent } from './containers/TextInput.component';
import { ViewComponent } from './containers/View.component';
import { CdsDesignSystemModule } from '../design-system/design-system.module';
import { SignatureComponent } from './containers/Signature.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PContainerModule,
    CdsDesignSystemModule
  ],
  declarations: [
    DropdownComponent,
    TextInputComponent,
    RadioButtonsComponent,
    OneColumnComponent,
    DefaultComponent,
    DefaultFormComponent,
    FlowContainerComponent,
    CaseViewComponent,
    ModalViewContainerComponent,
    AttachmentComponent,
    AppShellComponent,
    TextAreaComponent,
    RichTextComponent,
    DetailsComponent,
    AddressLookupComponent,
    DetailsThreeColumnComponent,
    CheckboxComponent,
    SimpleTableComponent,
    ViewComponent,
    CompareTableLayoutContainerComponent,
    ScalarListComponent,
    ActionableButtonComponent,
    MultiselectComponent,
    SignatureComponent
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
        View: ViewComponent,
        ViewContainer: DefaultComponent,
        DetailsThreeColumn: DetailsThreeColumnComponent,
        SimpleTable: SimpleTableComponent,
        SimpleTableSelect: SimpleTableComponent,
        Pega_Extensions_CompareTableLayout: CompareTableLayoutContainerComponent,
        // controls
        Attachment: AttachmentComponent,
        Checkbox: CheckboxComponent,
        Currency: TextInputComponent,
        Date: TextInputComponent,
        DateTime: TextInputComponent,
        Decimal: TextInputComponent,
        Dropdown: DropdownComponent,
        Email: TextInputComponent,
        Integer: TextInputComponent,
        Percentage: TextInputComponent,
        Phone: TextInputComponent,
        RadioButtons: RadioButtonsComponent,
        RichText: RichTextComponent,
        TextArea: TextAreaComponent,
        TextInput: TextInputComponent,
        Time: TextInputComponent,
        Multiselect: MultiselectComponent,
        ScalarList: ScalarListComponent,
        // custom controls
        Labb_dx_ButtonGroup: RadioButtonsComponent,
        Labb_dx_Address: AddressLookupComponent,
        Pega_Extensions_ActionableButton: ActionableButtonComponent,
        Pega_Extensions_SignatureCapture: SignatureComponent
      },
      multi: true,
    },
  ],
})
export class PegaMappingModule { }

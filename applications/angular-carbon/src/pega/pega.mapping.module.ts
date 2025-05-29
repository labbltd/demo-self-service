import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DYNAMIC_CONTAINERS,
  PContainerModule,
} from '@labb/angular-adapter';
import { ActionableButtonComponent } from './containers/ActionableButton.component';
import { AttachmentComponent } from './containers/Attachment.component';
import { CaseSummaryComponent } from './containers/CaseSummary.component';
import { CheckboxComponent } from './containers/Checkbox.component';
import { DefaultComponent } from './containers/Default.component';
import { DefaultFormComponent } from './containers/DefaultForm.component';
import { DetailsComponent } from './containers/Details.component';
import { DetailsThreeColumnComponent } from './containers/DetailsThreeColumns';
import { DetailsTwoColumnComponent } from './containers/DetailsTwoColumns';
import { DropdownComponent } from './containers/Dropdown.component';
import { FlowContainerComponent } from './containers/FlowContainer.component';
import { ListViewComponent } from './containers/ListView.component';
import { LocationComponent } from './containers/Location.component';
import { MaskedInputComponent } from './containers/MaskedInput.component';
import { ModalViewContainerComponent } from './containers/ModalViewContainer.component';
import { MultiselectComponent } from './containers/Multiselect.component';
import { RadioButtonsComponent } from './containers/RadioButtons.component';
import { SignatureComponent } from './containers/Signature.component';
import { SimpleTableManualComponent } from './containers/SimpleTableManual.component';
import { TextAreaComponent } from './containers/TextArea.component';
import { TextInputComponent } from './containers/TextInput.component';
import { ViewComponent } from './containers/View.component';

import {
  ButtonModule,
  CheckboxModule,
  ComboBoxModule,
  DatePickerModule,
  DropdownModule,
  FileUploaderModule,
  GridModule,
  InputModule,
  NotificationModule,
  ProgressIndicatorModule,
  RadioModule,
  TableModule,
  TilesModule,
} from 'carbon-components-angular';

@NgModule({
  imports: [
    ButtonModule,
    CheckboxModule,
    ComboBoxModule,
    CommonModule,
    DatePickerModule,
    DropdownModule,
    FileUploaderModule,
    GridModule,
    InputModule,
    NotificationModule,
    PContainerModule,
    ProgressIndicatorModule,
    RadioModule,
    ReactiveFormsModule,
    TableModule,
    TilesModule,
  ],
  declarations: [
    DropdownComponent,
    TextInputComponent,
    RadioButtonsComponent,
    DefaultComponent,
    DefaultFormComponent,
    FlowContainerComponent,
    ModalViewContainerComponent,
    AttachmentComponent,
    TextAreaComponent,
    DetailsComponent,
    DetailsThreeColumnComponent,
    CheckboxComponent,
    ViewComponent,
    ActionableButtonComponent,
    MultiselectComponent,
    ListViewComponent,
    SimpleTableManualComponent,
    DetailsTwoColumnComponent,
    CaseSummaryComponent,
    SignatureComponent,
    LocationComponent,
    MaskedInputComponent
  ],
  providers: [
    {
      provide: DYNAMIC_CONTAINERS,
      useValue: {
        default: DefaultComponent,

        // layouts
        CaseSummary: CaseSummaryComponent,
        DefaultForm: DefaultFormComponent,
        Details: DetailsComponent,
        DetailsThreeColumn: DetailsThreeColumnComponent,
        DetailsTwoColumn: DetailsTwoColumnComponent,
        FlowContainer: FlowContainerComponent,
        ListPage: ListViewComponent,
        ListView: ListViewComponent,
        ModalViewContainer: ModalViewContainerComponent,
        SimpleTableManual: SimpleTableManualComponent,
        View: ViewComponent,

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
        Location: LocationComponent,
        Multiselect: MultiselectComponent,
        Percentage: TextInputComponent,
        Phone: TextInputComponent,
        RadioButtons: RadioButtonsComponent,
        RichText: TextAreaComponent,
        TextArea: TextAreaComponent,
        TextInput: TextInputComponent,
        Time: TextInputComponent,

        // custom controls
        Pega_Extensions_ActionableButton: ActionableButtonComponent,
        Pega_Extensions_MaskedInput: MaskedInputComponent,
        Pega_Extensions_SignatureCapture: SignatureComponent,
      },
      multi: true,
    },
  ],
})
export class PegaMappingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PContainerModule,
  DYNAMIC_CONTAINERS
} from '@labb/angular-adapter';
import { AppShellComponent } from './containers/AppShell.component';
import { CaseViewComponent } from './containers/CaseView.component';
import { DefaultComponent } from './containers/Default.component';
import { DefaultFormComponent } from './containers/DefaultForm.component';
import { DetailsComponent } from './containers/Details.component';
import { FlowContainerComponent } from './containers/FlowContainer.component';
import { ModalViewContainerComponent } from './containers/ModalViewContainer.component';
import { OneColumnComponent } from './containers/OneColumn.component';
import { AttachmentComponent } from './controls/Attachment.component';
import { CheckboxComponent } from './controls/Checkbox.component';
import { DateComponent } from './controls/Date.component';
import { DropdownComponent } from './controls/Dropdown.component';
import { RadioButtonsComponent } from './controls/RadioButtons.component';
import { RichTextComponent } from './controls/RichText.component';
import { TextAreaComponent } from './controls/TextArea.component';
import { TextInputComponent } from './controls/TextInput.component';
import { ButtonGroupComponent } from './controls/ButtonGroup.component';

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
import { AddressLookupComponent } from './controls/AddressLookup.component';

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
    AddressLookupComponent,
    AppShellComponent,
    AttachmentComponent,
    ButtonGroupComponent,
    CaseViewComponent,
    CheckboxComponent,
    DateComponent,
    DefaultComponent,
    DefaultFormComponent,
    DetailsComponent,
    DropdownComponent,
    FlowContainerComponent,
    ModalViewContainerComponent,
    OneColumnComponent,
    RadioButtonsComponent,
    RichTextComponent,
    TextAreaComponent,
    TextInputComponent,
  ],
  providers: [
    {
      provide: DYNAMIC_CONTAINERS,
      useValue: {
        AppShell: AppShellComponent,
        Attachment: AttachmentComponent,
        CaseView: CaseViewComponent,
        Checkbox: CheckboxComponent,
        Currency: TextInputComponent,
        Date: DateComponent,
        DateTime: TextInputComponent,
        Decimal: TextInputComponent,
        default: DefaultComponent,
        DefaultForm: DefaultFormComponent,
        Details: DetailsComponent,
        Dropdown: DropdownComponent,
        Email: TextInputComponent,
        FlowContainer: FlowContainerComponent,
        Group: DefaultComponent,
        Integer: TextInputComponent,
        Labb_dx_Address: AddressLookupComponent,
        Labb_dx_ButtonGroup: ButtonGroupComponent,
        ModalViewContainer: ModalViewContainerComponent,
        OneColumn: OneColumnComponent,
        Percentage: TextInputComponent,
        Phone: TextInputComponent,
        PreviewViewContainer: DefaultComponent,
        RadioButtons: RadioButtonsComponent,
        reference: DefaultComponent,
        Region: DefaultComponent,
        RichText: RichTextComponent,
        RootContainer: DefaultComponent,
        TextArea: TextAreaComponent,
        TextInput: TextInputComponent,
        Time: TextInputComponent,
        View: DefaultComponent,
        ViewContainer: DefaultComponent,
      },
      multi: true,
    },
  ],
})
export class PegaMappingModule { }

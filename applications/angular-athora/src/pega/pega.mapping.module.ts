import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import {
  DYNAMIC_CONTAINERS,
  PContainerModule,
} from '@labb/angular-adapter';
import { AppShellComponent } from './containers/AppShell.component';
import { CaseViewComponent } from './containers/CaseView.component';
import { DefaultComponent } from './containers/Default.component';
import { DefaultFormComponent } from './containers/DefaultForm.component';
import { DetailsComponent } from './containers/Details.component';
import { FlowContainerComponent } from './containers/FlowContainer.component';
import { ModalViewContainerComponent } from './containers/ModalViewContainer.component';
import { OneColumnComponent } from './containers/OneColumn.component';
import { AddressLookupComponent } from './controls/AddressLookup.component';
import { DxAttachmentComponent } from './controls/Attachment.component';
import { DxCheckboxComponent } from './controls/Checkbox.component';
import { DxDateComponent } from './controls/Date.component';
import { DxDropdownComponent } from './controls/Dropdown.component';
import { DxRadioButtonsComponent } from './controls/RadioButtons.component';
import { DxSlideComponent } from './controls/Slide.component';
import { DxTextAreaComponent } from './controls/TextArea.component';
import { DxInputComponent } from './controls/Input.component';
import { DxHintComponent } from './controls/Hint.component';
import { TranslatePipe } from './translate.pipe';
import { GroupComponent } from './containers/Group.component';
import { DxLoaderComponent } from './controls/Loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDialogModule,
    PContainerModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddressLookupComponent,
    AppShellComponent,
    DxAttachmentComponent,
    CaseViewComponent,
    DxCheckboxComponent,
    DxDateComponent,
    DefaultComponent,
    DefaultFormComponent,
    DetailsComponent,
    DxDropdownComponent,
    DxHintComponent,
    DxLoaderComponent,
    FlowContainerComponent,
    GroupComponent,
    ModalViewContainerComponent,
    OneColumnComponent,
    DxRadioButtonsComponent,
    DxSlideComponent,
    DxTextAreaComponent,
    DxInputComponent,
    TranslatePipe,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl'
    },
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
        Group: GroupComponent,
        ViewContainer: DefaultComponent,
        // controls
        Attachment: DxAttachmentComponent,
        Checkbox: DxCheckboxComponent,
        Currency: DxInputComponent,
        Date: DxDateComponent,
        DateTime: DxInputComponent,
        Decimal: DxInputComponent,
        Dropdown: DxDropdownComponent,
        Email: DxInputComponent,
        Integer: DxInputComponent,
        Percentage: DxInputComponent,
        Phone: DxInputComponent,
        RadioButtons: DxRadioButtonsComponent,
        RichText: DxTextAreaComponent,
        TextArea: DxTextAreaComponent,
        TextInput: DxInputComponent,
        Text: DxInputComponent,
        Time: DxInputComponent,
        // custom controls
        Labb_Extensions_LabbAddressLookup: AddressLookupComponent,
        Labb_dx_Switch: DxSlideComponent
      },
      multi: true,
    }
  ],
  exports: [
    DxLoaderComponent
  ]
})
export class PegaMappingModule { }

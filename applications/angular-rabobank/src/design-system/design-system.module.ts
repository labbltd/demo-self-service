import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";

import { IconComponent } from "./icon/icon.component";
import { InputLabelComponent } from "./input-label/input-label.component";
import { InputMoneyComponent } from "./input-money/input-money.component";
import { DxInputAmountDirective } from "./input-money/input-money.directive";
import { InputWrapperComponent } from "./input-wrapper/input-wrapper.component";
import { ItemComponent } from "./item/item.component";
import { OutputMoneyComponent } from "./output-money/output-money.component";
import { RadioButtonComponent } from "./radio-button/radio-button.component";
import { RadioGroupComponent } from "./radio-group/radio-group.component";
import { SelectComponent } from "./select/select.component";
import { TicketComponent } from "./ticket/ticket.component";
import { ButtonComponent } from "./button/button.component";
import { PageHeaderFooterComponent } from "./page-header-footer/page-header-footer.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { InputComponent } from "./input/input.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        DecimalPipe
    ],
    declarations: [
        ButtonComponent,
        SpinnerComponent,
        DxInputAmountDirective,
        IconComponent,
        InputLabelComponent,
        InputMoneyComponent,
        InputWrapperComponent,
        ItemComponent,
        OutputMoneyComponent,
        PageHeaderFooterComponent,
        RadioButtonComponent,
        RadioGroupComponent,
        SelectComponent,
        TicketComponent,
        InputComponent,
        CheckboxComponent
    ],
    exports: [
        ButtonComponent,
        SpinnerComponent,
        IconComponent,
        InputMoneyComponent,
        InputWrapperComponent,
        OutputMoneyComponent,
        PageHeaderFooterComponent,
        RadioGroupComponent,
        SelectComponent,
        TicketComponent,
        InputComponent,
        CheckboxComponent
    ]
})
export class DesignSystemModule { }
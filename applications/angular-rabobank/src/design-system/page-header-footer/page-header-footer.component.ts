import { Component } from "@angular/core";
import { DemoBootstrap } from "@labb/demo-utilities";

@Component({
    selector: 'dx-page-header-footer',
    templateUrl: 'page-header-footer.component.html',
    styleUrl: 'page-header-footer.component.css',
    standalone: false
})
export class PageHeaderFooterComponent {
    public get logo() {
        return DemoBootstrap.getLabbLogo() || 'https://media.rabobank.com/m/5c0d2c496819b02f/original/Rabobank-text-logo.png'
    }
}
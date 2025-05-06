import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PegaModule } from './pega/pega.module';
import { PegaComponent } from './pega/pega.component';

@NgModule({
  imports: [PegaModule, BrowserModule],
  bootstrap: [PegaComponent],
})
export class PegaBootstrapModule { }

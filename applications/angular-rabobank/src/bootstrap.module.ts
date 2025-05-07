import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PegaComponent } from './pega/pega.component';
import { PegaModule } from './pega/pega.module';

@NgModule({
  imports: [PegaModule, BrowserModule],
  bootstrap: [PegaComponent],
})
export class PegaBootstrapModule { }

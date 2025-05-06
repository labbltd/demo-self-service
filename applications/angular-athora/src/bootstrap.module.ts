import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PegaComponent } from './pega/pega.component';
import { PegaModule } from './pega/pega.module';

@NgModule({
  imports: [PegaModule, BrowserModule, BrowserAnimationsModule],
  bootstrap: [PegaComponent],
})
export class PegaBootstrapModule { }

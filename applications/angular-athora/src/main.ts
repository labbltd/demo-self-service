import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';

import { PegaBootstrapModule } from './bootstrap.module';
import { environment } from './environments/environment';

registerLocaleData(localeNl, 'nl');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(PegaBootstrapModule, {
    providers: [{ provide: LOCALE_ID, useValue: 'nl-EN' }]
  })
  .catch((err) => console.error(err));

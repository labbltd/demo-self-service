import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PegaBootstrapModule } from './bootstrap.module';
import { environment } from './environments/environment';

// console.error = () => {/**/};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(PegaBootstrapModule)
  .catch((err) => console.error(err));

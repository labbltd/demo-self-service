import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PegaBootstrapModule } from './bootstrap.module';

platformBrowserDynamic()
  .bootstrapModule(PegaBootstrapModule)
  .catch((err) => console.error(err));

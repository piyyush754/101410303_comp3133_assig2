import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// Only enable production mode if explicitly set in environment
if (environment.production) {
  enableProdMode();
} else {
  console.log('Running in development mode');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    console.log('Application successfully bootstrapped');
  })
  .catch((err) => console.error('Application bootstrap failed:', err));

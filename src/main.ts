import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableMonitoring } from '@core/monitoring/monitoring.main';
import { environment } from '@env';
import { AppModule } from './app/app.module';

if (environment.monitoring.enabled) {
    enableMonitoring();
}

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

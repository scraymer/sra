import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AnalyticsModule } from './analytics/analytics.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { onAppInit as RedditServiceRun } from './reddit/reddit.run';
import { RedditService } from './reddit/reddit.service';

@NgModule({
  declarations: [],
  imports: [
    AnalyticsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MonitoringModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageServiceModule
  ],
  exports: [
    AnalyticsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MonitoringModule,
    ServiceWorkerModule,
    StorageServiceModule
  ],
  providers: [
    RedditService,
    {
      provide: APP_INITIALIZER,
      useFactory: RedditServiceRun,
      deps: [RedditService],
      multi: true
    }
  ]
})
export class CoreModule { }

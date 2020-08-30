import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AnalyticsModule } from './analytics/analytics.module';
import { MonitoringModule } from './monitoring/monitoring.module';

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
  ]
})
export class CoreModule { }

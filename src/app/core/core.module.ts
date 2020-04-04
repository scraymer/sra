import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'ngx-webstorage-service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StorageServiceModule
  ]
})
export class CoreModule { }

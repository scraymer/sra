import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as Cdk from '@shared/cdk';
import * as Layout from '@shared/layout';
import * as Material from '@shared/material';

@NgModule({
  declarations: [
    Layout.Components,
    Layout.Directives
  ],
  imports: [
    CommonModule,
    RouterModule,
    Cdk.Modules,
    Material.Modules
  ],
  exports: [
    Layout.Components,
    Layout.Directives,
    Cdk.Modules,
    Material.Modules
  ]
})
export class SharedModule { }

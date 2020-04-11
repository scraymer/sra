import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    Material.Modules
  ],
  exports: [
    Layout.Components,
    Layout.Directives,
    Material.Modules
  ]
})
export class SharedModule { }

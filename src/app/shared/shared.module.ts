import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Material from '@shared/material';
import * as Layout from '@shared/layout';

@NgModule({
  declarations: [
    Layout.Components,
    Layout.Directives
  ],
  imports: [
    CommonModule,
    Material.Modules
  ],
  exports: [
    Layout.Components,
    Layout.Directives,
    Material.Modules
  ]
})
export class SharedModule { }

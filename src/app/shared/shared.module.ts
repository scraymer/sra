import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as Analytics from '@shared/analytics';
import * as Cdk from '@shared/cdk';
import * as Layout from '@shared/layout';
import * as Material from '@shared/material';
import * as Viewport from '@shared/viewport';

@NgModule({
    declarations: [
        Analytics.Directives,
        Layout.Components,
        Layout.Directives,
        Viewport.Directives
    ],
    imports: [
        CommonModule,
        RouterModule,
        Cdk.Modules,
        Material.Modules
    ],
    exports: [
        Analytics.Directives,
        Layout.Components,
        Layout.Directives,
        Viewport.Directives,
        Cdk.Modules,
        Material.Modules
    ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
    declarations: [],
    imports: [
        Angulartics2Module.forRoot()
    ],
    exports: [
        Angulartics2Module
    ]
})
export class AnalyticsModule { }

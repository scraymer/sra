import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as MockLayout from '@shared/layout/testing';
import * as MockMaterial from '@shared/material/testing';
import { Angulartics2Module } from 'angulartics2';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                Angulartics2Module.forRoot()
            ],
            declarations: [
                AppComponent,
                MockLayout.Components,
                MockMaterial.Components
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});

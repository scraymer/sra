import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
    let service: AnalyticsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                Angulartics2Module.forRoot()
            ]
        });
        service = TestBed.inject(AnalyticsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

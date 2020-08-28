import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { CoreService } from './core.service';

describe('CoreService', () => {
    let service: CoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                Angulartics2Module.forRoot()
            ]
        });
        service = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

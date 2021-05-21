import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as MockMaterial from '@shared/material/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let snackbarService: MatSnackBar;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule
            ],
            declarations: [
                HeaderComponent,
                MockMaterial.Components
            ]
        })
        .compileComponents();

        snackbarService = TestBed.inject(MatSnackBar);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

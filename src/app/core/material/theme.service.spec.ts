import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;
    let snackbarService: MatSnackBar;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule
            ]
        });

        snackbarService = TestBed.inject(MatSnackBar);
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

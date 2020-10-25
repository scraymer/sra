import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemeService } from '@core/material/theme.service';
import * as MockMaterial from '@shared/material/testing';
import { ArticleService } from '../article.service';
import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
    let component: ArticleListComponent;
    let fixture: ComponentFixture<ArticleListComponent>;

    let articleService: ArticleService;
    let themeService: ThemeService;
    let route: ActivatedRoute;
    let snackbarService: MatSnackBar;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatSnackBarModule
            ],
            declarations: [
                ArticleListComponent,
                MockMaterial.Components
            ]
        })
        .compileComponents();

        articleService = TestBed.inject(ArticleService);
        themeService = TestBed.inject(ThemeService);
        route = TestBed.inject(ActivatedRoute);
        snackbarService = TestBed.inject(MatSnackBar);

        // mock method used on init
        spyOn(articleService, 'getArticles').and.returnValue(Promise.resolve([]));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as MockMaterial from '@shared/material/testing';
import { ArticleService } from '../article.service';
import { ArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
    let component: ArticleListComponent;
    let fixture: ComponentFixture<ArticleListComponent>;

    let service: ArticleService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ArticleListComponent,
                MockMaterial.Components
            ]
        })
        .compileComponents();

        // mock method used on init
        service = TestBed.inject(ArticleService);
        spyOn(service, 'getArticles').and.returnValue(Promise.resolve([]));
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

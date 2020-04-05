import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article';
import { ARTICLES } from './article.mock';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    getArticles(): Observable<Article[]> {
        return of(ARTICLES);
    }
}

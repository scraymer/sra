import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@core/material/theme.service';
import { Subscription } from 'rxjs';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ArticleListConstent } from './article-list.constent';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription;

    articles: Article[];
    constructionImage: string;

    constructor(private articleService: ArticleService, private themeService: ThemeService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        this.subscriptions.add(this.getArticles());
        this.subscriptions.add(this.getConstructionImage());
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private getArticles(): Subscription {
        return this.articleService.getArticles()
            .subscribe(articles => this.setArticles(articles));
    }

    private getConstructionImage(): Subscription {
        return this.themeService.isDark
            .subscribe(t => this.setConstructionImage(t));
    }

    private setArticles(articles: Article[]): void {
        this.articles = articles;
    }

    private setConstructionImage(isDarkTheme: boolean): void {
        this.constructionImage = isDarkTheme
            ? ArticleListConstent.IMG_CONSTRUCTION.DARK
            : ArticleListConstent.IMG_CONSTRUCTION.LIGHT;
    }
}

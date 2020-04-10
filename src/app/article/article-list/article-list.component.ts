import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThemeService } from '@core/material/theme.service';
import { Subscription } from 'rxjs';
import { Article } from '../article';
import { ArticleSort } from '../article.enum';
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

    sort: ArticleSort;
    subreddit: string;

    constructor(private articleService: ArticleService, private themeService: ThemeService,
                private route: ActivatedRoute) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {

        // subscribe to theme, article, and route param changes
        this.subscriptions.add(this.themeService.isDark.subscribe(t => this.setConstructionImage(t)));
        this.subscriptions.add(this.articleService.articles.subscribe(t => this.setArticles(t)));
        this.subscriptions.add(this.route.paramMap.subscribe(t => this.getArticles(t)));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getArticles(params: ParamMap): void {

        this.sort = params.get('sort') ? params.get('sort').toLowerCase() as ArticleSort : null;
        this.subreddit = params.get('subreddit') || null;

        this.articleService.getArticles(this.sort, this.subreddit);
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

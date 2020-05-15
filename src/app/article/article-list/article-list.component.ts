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

    private subscriptions: Subscription = new Subscription();

    articles: Article[];
    constructionImage: string;

    sort: ArticleSort;
    subreddit: string;

    loading: boolean;

    constructor(private articleService: ArticleService, private themeService: ThemeService,
                private route: ActivatedRoute) {}

    get redditStatus(): { [key: string]: boolean } {
        return this.articleService.redditStatus;
    }

    ngOnInit(): void {

        // set loading flag to try, this will be set to false on first article subscription fufilled
        this.loading = true;

        // subscribe to theme, article, and route param changes
        this.subscriptions.add(this.themeService.isDark.subscribe(t => this.setConstructionImage(t)));
        this.subscriptions.add(this.articleService.articles.subscribe(t => this.setArticles(t)));
        this.subscriptions.add(this.route.paramMap.subscribe(t => this.getArticles(t)));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getArticles(params: ParamMap): void {

        // set loading flag to try, this will be set to false on first article subscription fufilled
        this.loading = true;

        this.sort = params.get('sort') ? params.get('sort').toLowerCase() as ArticleSort : null;
        this.subreddit = params.get('subreddit') || null;

        this.articleService.getArticles(this.sort, this.subreddit)
            .catch((e) => this.loading = false);
    }

    toggleRedditStatus(articleId: string, isRead?: boolean): void {
        if (isRead === undefined) {
            isRead = !this.redditStatus[articleId];
        }

        if (isRead) {
            this.redditStatus[articleId] = true;
        } else {
            delete this.redditStatus[articleId];
        }
    }

    private setArticles(articles: Article[]): void {
        this.articles = articles;

        // set loading flag to false, this completes getArticle and ngOnInit
        this.loading = false;
    }

    private setConstructionImage(isDarkTheme: boolean): void {
        this.constructionImage = isDarkTheme
            ? ArticleListConstent.IMG_CONSTRUCTION.DARK
            : ArticleListConstent.IMG_CONSTRUCTION.LIGHT;
    }
}

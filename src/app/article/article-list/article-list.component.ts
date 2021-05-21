import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TitleService } from '@core/layout/title.service';
import { ThemeService } from '@core/material/theme.service';
import { WindowService } from '@core/window/window.service';
import { Clipboard } from '@shared/cdk';
import { Subscription } from 'rxjs';
import { Article, ArticleOptions, ArticlePagination } from '../article';
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

    articleOptions: ArticleOptions;

    constructionImage: string;

    loading: boolean;

    redditStatus: { [key: string]: boolean } = {};

    constructor(private articleService: ArticleService, private themeService: ThemeService,
                private route: ActivatedRoute, private snackBarService: MatSnackBar,
                private titleService: TitleService, private window: WindowService,
                private clipboard: Clipboard) {}

    ngOnInit(): void {
        this.subscriptions.add(this.themeService.isDark.subscribe(t => this.setConstructionImage(t)));
        this.subscriptions.add(this.articleService.articles.subscribe(t => this.setArticles(t)));
        this.subscriptions.add(this.route.paramMap.subscribe(t => this.onRouteParamChange(t)));
        this.subscriptions.add(this.articleService.lastAccessDates.subscribe(t => this.setRedditStatus(t)));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getArticles(articleOptions: ArticleOptions): void {

        // set loading flag to true, this will be set to false on first article subscription fufilled
        this.loading = true;

        // request articles and on error, disable loading flag if error is caught
        this.articleService.getArticles(articleOptions)
            .catch((e) => {
                console.error(`Could not retreive articles with articleOptions=[${articleOptions}].`, e);
                this.loading = false;
            });
    }

    onShare(article: Article) {

        // attempt to use the web share api, else fallback to clipboard
        this.window.share(article.link, article.title).catch(() => {

            const isCopied = this.clipboard.copy(article.link);

            const action = isCopied ? null : 'Dismiss';
            const message = isCopied ? 'Copied to clipboard.' : `${article.link}`;
            const options = Object.assign({}, ArticleListConstent.SHARE_LINK_SNACKBAR_OPTIONS,
                isCopied ? {} : { duration: null });

            this.snackBarService.open(message, action, options);
        });
    }

    resolveRouteLink(dir: 'after' | 'before', article: Article): string {

        if (article === undefined || this.articleOptions === undefined) {
            return '/front-page';
        }

        const subreddit: string = this.articleOptions.subreddit
            ? 'r/' + this.articleOptions.subreddit
            : 'front-page';

        const currentPage: number = this.articleOptions.pagination ? this.articleOptions.pagination.page : 1;
        const pageChange: number = dir === 'after' ? 1 : -1;
        const page: number = currentPage + pageChange > 0 ? currentPage + pageChange : 1;

        return `/${subreddit}/${this.articleOptions.sort}/${page}/${dir}/${article.name}`;
    }

    toggleRedditStatus(articleId: string, isRead?: boolean): void {
        this.articleService.toggleLastAccessDate(articleId, isRead);
    }

    private onRouteParamChange(params: ParamMap): void {

        // parse article options from request parameters
        this.articleOptions = this.parseArticleOptions(params);

        // set application title based on subreddit
        this.titleService.setTitle(this.articleOptions.subreddit
            ? `r/${this.articleOptions.subreddit}` : 'Front Page');

        // refresh articles list with article options
        this.getArticles(this.articleOptions);
    }

    private parseArticleOptions(params: ParamMap): ArticleOptions {

        const sort: ArticleSort = params.has('sort')
            ? params.get('sort').toLowerCase() as ArticleSort
            : ArticleSort.Best;

        const subreddit: string = params.get('subreddit') || null;

        const pagination: ArticlePagination = {
            after: params.get('after') || null,
            before: params.get('before') || null,
            page: params.has('page') ? Math.abs(Number(params.get('page'))) : 1
        };

        return { sort, subreddit, pagination };
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

    private setRedditStatus(lastAccessDate: { [key: string]: Date }): void {
        this.redditStatus = Object.keys(lastAccessDate)
            .reduce((r, k) => (r[k] = lastAccessDate[k] !== null, r), {});
    }
}

import { Inject, Injectable } from '@angular/core';
import { RedditService } from '@core/reddit/reddit.service';
import { environment } from '@env';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { ListingOptions } from 'snoowrap/dist/objects';
import { Article, ArticleOptions, ArticlePagination } from './article';
import { ArticleConstant } from './article.constant';
import { ArticleSort } from './article.enum';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

    private lastAccessDates$: BehaviorSubject<{ [key: string]: Date }> = new BehaviorSubject<{ [key: string]: Date }>({});

    constructor(private redditService: RedditService, @Inject(LOCAL_STORAGE) private storage: StorageService) {
        if (this.storage.has(ArticleConstant.LAST_ACCESS_DATES_KEY)) {
            this.setLastAccessDates(this.storage.get(ArticleConstant.LAST_ACCESS_DATES_KEY));
        }
    }

    get articles(): Observable<Article[]> {
        return this.articles$.asObservable();
    }

    get lastAccessDates(): Observable<{ [key: string]: Date }> {
        return this.lastAccessDates$.asObservable();
    }

    setArticles(articles: Article[]): void {
        this.articles$.next(articles);
    }

    setLastAccessDates(lastAccessDates: { [key: string]: Date }): void {
        this.persistLastAccessDates(lastAccessDates);
        this.lastAccessDates$.next(lastAccessDates);
    }

    async getArticles(options: ArticleOptions = { sort: ArticleSort.Best }): Promise<Article[]> {

        let req: Promise<Snoowrap.Listing<Snoowrap.Submission>>;

        if (options.sort === ArticleSort.Best && options.subreddit === undefined) {
            req = this.redditService.run.getBest(
                this.resolveListingOptions(options.pagination));
        } else if (options.sort === ArticleSort.New) {
            req = this.redditService.run.getNew(options.subreddit || undefined,
                this.resolveListingOptions(options.pagination));
        } else if (options.sort === ArticleSort.Top) {
            req = this.redditService.run.getTop(options.subreddit || undefined,
                this.resolveListingOptions(options.pagination));
        } else if (options.sort === ArticleSort.Rising) {
            req = this.redditService.run.getRising(options.subreddit || undefined,
                this.resolveListingOptions(options.pagination));
        } else {
            req = this.redditService.run.getHot(options.subreddit || undefined,
                this.resolveListingOptions(options.pagination));
        }

        const result = (await req)
            .map((s) => this.toArticle(s));

        this.setArticles(result);
        return result;
    }

    toggleLastAccessDate(articleId: string, isAccessed?: boolean): void {

        const lastAccessDates = this.lastAccessDates$.getValue();

        if (isAccessed === undefined) {
            isAccessed = !lastAccessDates[articleId];
        }

        if (isAccessed) {
            lastAccessDates[articleId] = new Date();
        } else {
            delete lastAccessDates[articleId];
        }

        this.setLastAccessDates(lastAccessDates);
    }

    private persistLastAccessDates(lastAccessDates: { [key: string]: Date }): void {

        // remove any last access dates that are expired
        Object.keys(lastAccessDates).forEach((k) => {
            if (lastAccessDates[k] === null || this.resolveEolDate(lastAccessDates[k]) < new Date()) {
                delete lastAccessDates[k];
            }
        });

        // persist to storage service
        this.storage.set(ArticleConstant.LAST_ACCESS_DATES_KEY, lastAccessDates);
    }

    private toArticle(source: Snoowrap.Submission): Article {
        return {
            id: source.id,
            name: source.name,
            title: source.title,
            subreddit: source.subreddit_name_prefixed,
            username: this.resolveUsername(source),
            link: source.url,
            comments: this.resolveCommentsUrl(source),
            avatar: this.resolveAvatarUrl(source),
            image: this.resolveImageUrl(source)
        };
    }

    private resolveCommentsUrl(source: Snoowrap.Submission): string {
        return environment.reddit.urlPrefix + source.permalink.replace(/^\//g, '');
    }

    private resolveUsername(source: Snoowrap.Submission): string {
        return 'u/' + source.author.name;
    }

    private resolveAvatarUrl(source: Snoowrap.Submission): string {

        const author = source ? source.author : null;
        const subreddit = source ? source.subreddit : null;

        let result: string;
        if (author && author.icon_img) {
            result = author.icon_img;
        } else if (subreddit && subreddit.icon_img) {
            result = subreddit.icon_img;
        } else if (subreddit && subreddit.community_icon) {
            result = subreddit.community_icon;
        } else {
            result = 'assets/placeholder-avatar.png';
        }

        return result;
    }

    private resolveImageUrl(source: Snoowrap.Submission): string {

        let result: string = null;

        // use preview links if available, use largest resolution available
        if (source && source.preview && source.preview.images && source.preview.images.length > 0) {
            const res = source.preview.images[0].resolutions;
            if (res && res.length > 0) {
                result = res[res.length - 1].url;
            }
        }

        return result;
    }

    private resolveEolDate(accessDate: Date): Date {
        const eolDate = new Date(accessDate);
        eolDate.setDate(eolDate.getDate() + ArticleConstant.LAST_ACCESS_DATES_TTL);
        return eolDate;
    }

    private resolveListingOptions(pagination?: ArticlePagination): ListingOptions {

        const options: ListingOptions = {
            limit: ArticleConstant.DEFAULT_LISTING_LIMIT
        };

        if (pagination && pagination.after) {
            options.after = pagination.after;
            options.count = options.limit * (pagination.page - 1);
        } else if (pagination && pagination.before) {
            options.before = pagination.before;
            options.count = options.limit * (pagination.page - 1);
        }

        return options;
    }
 }

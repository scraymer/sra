import { Inject, Injectable } from '@angular/core';
import { RedditService } from '@core/reddit/reddit.service';
import { environment } from '@env';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { Article } from './article';
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

    async getArticles(sort: ArticleSort = ArticleSort.Best, subreddit?: string): Promise<Article[]> {

        let req: Promise<Snoowrap.Listing<Snoowrap.Submission>>;

        if (sort === ArticleSort.Best) {
            req = this.redditService.run.getBest();
        } else if (sort === ArticleSort.New) {
            req = this.redditService.run.getNew(subreddit || undefined);
        } else if (sort === ArticleSort.Top) {
            req = this.redditService.run.getTop(subreddit || undefined);
        } else if (sort === ArticleSort.Rising) {
            req = this.redditService.run.getRising(subreddit || undefined);
        } else {
            req = this.redditService.run.getHot(subreddit || undefined);
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
        return environment.reddit.urlPrefix + source.id;
    }

    private resolveUsername(source: Snoowrap.Submission): string {
        return 'u/' + source.author.name;
    }

    private resolveAvatarUrl(source: Snoowrap.Submission): string {

        const result: string = null;

        // use author icon img if provided
        if (source && source.author && source.author) {
            // FIXME: this is not working...
            // result = source.author.icon_img;
        }

        return result ? result : 'assets/placeholder-avatar.png';
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
}

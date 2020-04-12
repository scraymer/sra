import { Injectable } from '@angular/core';
import { RedditConstent } from '@core/reddit/reddit.contant';
import { RedditService } from '@core/reddit/reddit.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { Article } from './article';
import { ArticleSort } from './article.enum';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

    constructor(private service: RedditService) {}

    get articles(): Observable<Article[]> {
        return this._articles.asObservable();
    }

    setArticles(articles: Article[]): Article[] {
        this._articles.next(articles);
        return articles;
    }

    getArticles(sort: ArticleSort = ArticleSort.Best, subreddit?: string): Promise<Article[]> {

        let req: Promise<Snoowrap.Listing<Snoowrap.Submission>>;

        if (sort === ArticleSort.Best) {
            req = this.service.run.getBest();
        } else if (sort === ArticleSort.New) {
            req = this.service.run.getNew(subreddit || undefined);
        } else if (sort === ArticleSort.Top) {
            req = this.service.run.getTop(subreddit || undefined);
        } else if (sort === ArticleSort.Rising) {
            req = this.service.run.getRising(subreddit || undefined);
        } else {
            req = this.service.run.getHot(subreddit || undefined);
        }

        return req
            .then((s) => this.toArticles(s))
            .then((s) => this.setArticles(s));
    }

    private toArticles(source: Snoowrap.Listing<Snoowrap.Submission>): Article[] {
        return source.map((s) => this.toArticle(s));
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
        return RedditConstent.REDDIT_URL_PREFIX + source.id;
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

        return result ? result : 'assets/placeholder-image.png';
    }
}

import { Injectable } from '@angular/core';
import { RedditConstent } from '@core/reddit/reddit.contant';
import { RedditService } from '@core/reddit/reddit.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { Article } from './article';

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

    getArticles(): Promise<Article[]> {
        return this.service.run.getHot()
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

        // use preview links if available, use largest under 200h or 350w
        if (source && source.preview && source.preview.images && source.preview.images.length > 0) {
            const res = source.preview.images[0].resolutions
                .filter((r) => r.height <= 200 || r.width <= 400);
            if (res && res.length > 0) {
                result = res[res.length - 1].url;
            }
        }

        return result ? result : 'assets/placeholder-image.png';
    }
}

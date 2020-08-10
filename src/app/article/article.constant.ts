export class ArticleConstant {

    /**
     * Default value to use for listing limites.
     */
    static readonly DEFAULT_LISTING_LIMIT: number = 25;

    /**
     * Key for articles' last access date in storage service.
     */
    static readonly LAST_ACCESS_DATES_KEY: string = 'app.article.last-access-dates';

    /**
     * Key for articles' last access date time-to-live (TTL) in storage service (days).
     */
    static readonly LAST_ACCESS_DATES_TTL: number = 2;
}

/**
 * Cache selector used for managing cache storage.
 */
export interface CacheSelector {

    /**
     * Name of the cache containing the URLs.
     */
    name: string;

    /**
     * URLs to match on as a regular expression.
     */
    urls: RegExp;
}

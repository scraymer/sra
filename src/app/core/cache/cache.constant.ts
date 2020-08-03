import { RedditConstant } from '@core/reddit/reddit.constant';
import { CacheSelector } from './cache';

export class CacheConstant {

    /**
     * Caches that contain user-specific data, see ngsw_config.ts. The URLs
     * will be cleared when logging in/out.
     */
    static readonly USER_SEPCIFIC_CACHES: Array<CacheSelector> = [
        {
            name: `ngsw:${CacheConstant.baseUriPath()}:${RedditConstant.USERSPECIFIC_CACHE_VERSION}`
                + `:data:dynamic:${RedditConstant.USERSPECIFIC_CACHE_NAME}:cache`,
            urls: new RegExp(`(?:${RedditConstant.USERSPECIFIC_CACHE_URLS.join(')|(?:')})`)
        }
    ];

    /**
     * Returns the base URI path of the web service.
     */
    private static baseUriPath(): string {
        return new URL(document.baseURI).pathname;
    }
}

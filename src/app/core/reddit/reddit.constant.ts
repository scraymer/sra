import { environment } from '@env';

export class RedditConstant {

    /**
     * Key for current/previous session's refresh token in storage service.
     */
    static readonly AUTH_REFRESH_KEY: string = 'app.core.reddit.auth.refresh';

    /**
     * Key for "user-specific" authentication flag in storage service.
     */
    static readonly AUTH_IS_USER_SPECIFIC_KEY: string = 'app.core.reddit.auth.is-user-specific';

    /**
     * Key for "user-specific" authentication state in storage service.
     */
    static readonly AUTH_STATE_KEY: string = 'app.core.reddit.auth.state';

    /**
     * Angular service worker cache name for user-specific URLs. Used for identifying CacheStorage
     * entries, see CacheConstant.USER_SPECIFIC_CACHES.
     */
    static readonly USERSPECIFIC_CACHE_NAME: string = 'reddit-data';

    /**
     * Angular service worker cache version for user-specific URLs. Used for identifying CacheStorage
     * entries, see CacheConstant.USER_SPECIFIC_CACHES.
     */
    static readonly USERSPECIFIC_CACHE_VERSION: string = '1';

    /**
     * Regular expression for user-specific URLs. Used for identifying CacheStorage entries,
     * see CacheConstant.USER_SEPCIFIC_CACHES.
     */
    static readonly USERSPECIFIC_CACHE_URLS: Array<RegExp> = [

        // frontpage cache must be evicted as it is user dependent
        new RegExp(`${environment.reddit.apiUrlPrefix}(?:best|hot|new|top|rising)\\?.*`, 'i'),

        // subscriptions cache must be evicted as it is user dependent
        new RegExp(`${environment.reddit.apiUrlPrefix}subreddits/mine/subscriber\\?.*`, 'i')
    ];
}

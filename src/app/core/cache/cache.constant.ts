import { environment } from '@env';
import { CacheSelector } from './cache';

export class CacheConstant {

    /**
     * Caches that contain user-specific data, see ngsw_config.ts. The URLs
     * will be cleared when logging in/out.
     */
    static readonly USER_SEPCIFIC_CACHES: Array<CacheSelector> = [
        {
            name: `ngsw:${CacheConstant.baseUriPath()}:1:data:dynamic:reddit-data:cache`,
            urls: new RegExp(`${environment.reddit.apiUrlPrefix}(?:best|hot|new|top|rising)\\?.*`, 'i')
        }
    ];

    /**
     * Returns the base URI path of the web service.
     */
    private static baseUriPath(): string {
        return new URL(document.baseURI).pathname;
    }
}

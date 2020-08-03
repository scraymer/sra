import { Injectable } from '@angular/core';
import { CacheConstant } from './cache.constant';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor() { }

    /**
     * Use this method to clear all user-specific cache data,
     * see CacheConstant.USER_SEPCIFIC_CACHES.
     */
    public async clearUserSpecific(): Promise<boolean> {

        // loop through each configured user-specific cache and clear
        CacheConstant.USER_SEPCIFIC_CACHES.forEach(async (c) =>
            await this.clearByExpression(c.name, c.urls));

        return true;
    }

    /**
     * Removes all cached responses for the provided cacheName where the
     * URLs match the provided regular expression.
     *
     * @param cacheName cache name to open
     * @param urlExp request url expression match URLs
     */
    private async clearByExpression(cacheName: string, urlExp: RegExp): Promise<boolean> {

        // caches global object is required
        if (caches === undefined || caches === null) {
            console.warn(`CacheStorage API not found, cannot clear '${cacheName}'.`);
            return false;
        }

        // ensure that the cache exists before openning
        if (!(await caches.has(cacheName))) {
            console.warn(`Cache '${cacheName}' not found in CacheStorage.`);
            return false;
        }

        // open the cache and clear all matching url
        await caches.open(cacheName).then((cache) => cache
            .keys().then((key) => key
                .filter((k) => urlExp.test(k.url))
                .map((k) => cache.delete(k.url)))
        );

        // return true to indicate that is was successfully run
        return true;
    }
}

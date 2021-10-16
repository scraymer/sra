import { Injectable, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@shared/material';
import { Subscription } from 'rxjs';
import { CacheConstant } from './cache.constant';

@Injectable({
    providedIn: 'root'
})
export class CacheService implements OnDestroy {

    private subscriptions: Subscription = new Subscription();

    constructor(private updateService: SwUpdate, private snackBarService: MatSnackBar) {

        // subscribe to service work updates and trigger event if available
        this.subscriptions.add(this.updateService.available.subscribe(() => this.onUpdateAvailable()));
    }

    /**
     * On destroy event, unsubscribe all subscriptions.
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

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

    /**
     * Ask user if they would like to update to the latest available version.
     */
     private onUpdateAvailable(): void {

        // indicate update is available
        console.warn('Application update available, refresh now!');

        // display error messsage letting the user know the form was not submitted
        const msg = 'A new version of the application is available.';
        this.snackBarService.open(msg, 'Update', {
            horizontalPosition: 'center',
            verticalPosition: 'top'
        }).onAction().subscribe(
            () => this.updateService.activateUpdate().then(
                () => document.location.reload()));
    }
}

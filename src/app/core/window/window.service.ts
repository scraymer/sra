import { Injectable } from '@angular/core';

/**
 * Use this service to interact with the window object.
 */
@Injectable({
    providedIn: 'root'
})
export class WindowService {

    /**
     * Return true if the window media query prefers dark color scheme.
     */
    isPreferDark(): boolean {
        return window && window.matchMedia
            && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Return promise of share web api call with provided values.
     */
    share(url: string, title?: string, text?: string): Promise<void> {
        return 'share' in window.navigator
            ? (window.navigator as any).share({ url, title, text })
            : Promise.reject('Web Share API is not supported!');
    }
}

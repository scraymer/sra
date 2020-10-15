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
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@shared/cdk';

/**
 * Use this service to interact with the window object.
 */
@Injectable({
    providedIn: 'root'
})
export class WindowService {

    constructor(private clipboard: Clipboard, private snackBarService: MatSnackBar) {}

    /**
     * Return true if the window media query prefers dark color scheme.
     */
    isPreferDark(): boolean {
        return window && window.matchMedia
            && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Share provided url using Web Share API if supported, else fallback to clipboard.
     */
    share(url: string, title?: string, text?: string): void {
        this.doShare(url, title, text).catch(() => this.doCopy);
    }

    private doShare(url: string, title?: string, text?: string): Promise<void> {
        return 'share' in window.navigator
            ? (window.navigator as any).share({ url, title, text })
            : Promise.reject('Web Share API is not supported!');
    }

    private doCopy(url: string): void {

        const isCopied = this.clipboard.copy(url);

        const message = isCopied ? 'Copied to clipboard.' : `${url}`;
        const action = isCopied ? null : 'Dismiss';
        const duration = isCopied ? 1500 : null ;

        this.snackBarService.open(message, action, { duration });
    }
}

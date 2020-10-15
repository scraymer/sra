import { Inject, Injectable } from '@angular/core';
import { WindowService } from '@core/window/window.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeConstant } from './theme.constant';

/**
 * Service used to control the application theme. Only dark and light themes
 * are support.
 */
@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    /**
     * Source subject for managing the dark theme flag state.
     */
    private isDark$: BehaviorSubject<boolean>;

    /**
     * Observable for the is dark theme flag.
     */
    isDark: Observable<boolean>;

    /**
     * Check storage service for previous session theme properties on initialization.
     *
     * @param storage storage to persiste theme properties
     */
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private window: WindowService) {

        // define default isDark subject from user's default and set observable
        this.isDark$ = new BehaviorSubject<boolean>(this.isDarkDefault());
        this.isDark = this.isDark$.asObservable();
    }

    /**
     * Set whether or not the theme should be dark.
     *
     * @param isDark true for dark theme, else light theme
     */
    setDark(isDark: boolean): void {
        this.isDark$.next(isDark);
        this.storage.set(ThemeConstant.IS_DARK_THEME_KEY, isDark);
    }

    /**
     * Determines default isDark value from local storage or window media query.
     */
    private isDarkDefault(): boolean {
        const isDark: boolean = this.storage.get(ThemeConstant.IS_DARK_THEME_KEY);
        return isDark !== undefined ? isDark : this.window.isPreferDark();
    }
}

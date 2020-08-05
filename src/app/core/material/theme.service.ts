import { Inject, Injectable } from '@angular/core';
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
    private isDark$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * Observable for the is dark theme flag.
     */
    isDark: Observable<boolean> = this.isDark$.asObservable();

    /**
     * Check storage service for previous session theme properties on initialization.
     *
     * @param storage storage to persiste theme properties
     */
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
        const isDark: boolean = this.storage.get(ThemeConstant.IS_DARK_THEME_KEY);
        if (isDark === true) { this.setDark(true); }
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
}

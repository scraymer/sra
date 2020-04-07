import { Inject, Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { NavConstant } from './nav.constant';

/**
 * Service used to control the application navigation state such as opening,
 * closing, and toggling the navigation drawer.
 */
@Injectable({
    providedIn: 'root'
})
export class NavService {

    /**
     * The material side nav component configured from the shared layout nav
     * component on initialization.
     */
    private nav: MatSidenav;

    /**
     * Inject dependencies on initialization.
     *
     * @param storage used to persist opened/closed state
     */
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

    /**
     * Set the material side nav component to manage.
     *
     * @param nav material sidenav component
     */
    setNav(nav: MatSidenav) {
        this.nav = nav;

        // open nav if preivously open from another session
        if (this.storage.get(NavConstant.IS_OPEN_KEY)) {
            this.open();
        }
    }

    /**
     * Open the navigation drawer.
     */
    async open(): Promise<MatDrawerToggleResult> {
        return this.nav.open().then(
            (result) => this.persistState(result));
    }


    /**
     * Close the navigation drawer.
     */
    async close(): Promise<MatDrawerToggleResult> {
        return this.nav.close().then(
            (result) => this.persistState(result));
    }

    /**
     * Toggle the navigation drawer open or close.
     */
    async toggle(): Promise<MatDrawerToggleResult> {
        const result = await this.nav.toggle();
        return this.persistState(result);
    }

    /**
     * Persist nav toggle state to storage and return result to continue chaining.
     *
     * @param result nav toggle result ('open', 'close')
     */
    private persistState(result: MatDrawerToggleResult): MatDrawerToggleResult {
        const isOpen = result === 'open' ? true : false;
        this.storage.set(NavConstant.IS_OPEN_KEY, isOpen);
        return result;
    }
}

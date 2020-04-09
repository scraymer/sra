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
    private _nav: MatSidenav;

    /**
     * Inject dependencies on initialization. Must set the 'nav' value in order
     * to use this service.
     *
     * @param storage used to persist opened/closed state
     */
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

    /**
     * Set the material side nav component to manage.
     */
    setNav(nav: MatSidenav) {
        this._nav = nav;
    }

    /**
     * Get previous state, default to true if undefined.
     */
    get prevState(): boolean {
        return this.storage.get(NavConstant.IS_OPEN_KEY) !== false;
    }

    /**
     * Open the navigation drawer.
     */
    async open(): Promise<MatDrawerToggleResult> {
        return this._nav.open().then(
            (result) => this.persistState(result));
    }

    /**
     * Close the navigation drawer.
     */
    async close(): Promise<MatDrawerToggleResult> {
        return this._nav.close().then(
            (result) => this.persistState(result));
    }

    /**
     * Toggle the navigation drawer open or close.
     */
    async toggle(): Promise<MatDrawerToggleResult> {
        return await this._nav.toggle()
            .then((result) => this.persistState(result));
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

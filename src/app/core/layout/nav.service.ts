import { Inject, Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavItemCategory, NavItemLink } from './nav';
import { NavConstant } from './nav.constant';
import { DEFAULT_NAV_ITEMS } from './nav.default';

/**
 * Service used to control the application navigation state such as opening,
 * closing, and toggling the navigation drawer.
 */
@Injectable({
    providedIn: 'root'
})
export class NavService {

    /**
     * The list of navigation items displayed in the sidenav.
     */
    private _items: BehaviorSubject<Array<NavItemCategory|NavItemLink>> = new BehaviorSubject<Array<NavItemCategory|NavItemLink>>([]);

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
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
        this.setItems(DEFAULT_NAV_ITEMS);
    }

    /**
     * Set the material side nav component to manage.
     */
    setNav(nav: MatSidenav) {
        this._nav = nav;
    }

    /**
     * Set the navigation items, they will be sorted automatically.
     */
    setItems(items: Array<NavItemCategory|NavItemLink>): void {
        this._items.next(items);
    }

    /**
     * Get the list of side navigation items.
     */
    get items(): Observable<Array<NavItemCategory|NavItemLink>> {
        return this._items.asObservable();
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

    /**
     * TODO: Compare items by sort order.
     */
    private sortItems(a: NavItemCategory|NavItemLink, b: NavItemCategory|NavItemLink): number {

        // if category, sort all sub items
        if (a.type === 'category' && a.subItems) {
            a.subItems = a.subItems.sort(this.sortItems);
        }

        // use sortorder value
        return a.sortOrder - b.sortOrder;
    }
}

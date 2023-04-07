import { Inject, Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { RedditService } from '@core/reddit/reddit.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { NavItemCategory, NavItemLink } from './nav';
import { NavConstant } from './nav.constant';
import { DEFAULT_LOGIN_ITEM, DEFAULT_LOGOUT_ITEM, DEFAULT_NAV_ITEMS } from './nav.default';

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
    private items$: BehaviorSubject<Array<NavItemCategory|NavItemLink>> = new BehaviorSubject<Array<NavItemCategory|NavItemLink>>([]);

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
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private redditService: RedditService) {
        this.setItems(DEFAULT_NAV_ITEMS);
    }

    /**
     * Get the list of side navigation items.
     */
    get items(): Observable<Array<NavItemCategory|NavItemLink>> {
        return this.items$.asObservable();
    }

    /**
     * Get previous state, default to true if undefined.
     */
    get prevState(): boolean {
        return this.storage.get(NavConstant.IS_OPEN_KEY) !== false;
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
        this.items$.next(items);
    }

    /**
     * Wrapper method to get logged in user's subscriptions and set flag, else use
     * default subreddits in items list.
     */
    setUserState(isUser: boolean = false): void {
        this.getSubscriptions(isUser)
            .then((r) => this.setUserItems(r, isUser));
    }

    /**
     * Get logged in user's subscriptions, else use default subreddits.
     */
    async getSubscriptions(isUser: boolean = false): Promise<Array<NavItemLink>> {

        let req: Promise<Snoowrap.Listing<Snoowrap.Subreddit>>;

        if (isUser) {
            req = Promise.resolve(this.redditService.run.getSubscriptions());
        } else {
            req = this.redditService.run.getDefaultSubreddits();
        }

        const result: Array<NavItemLink> = (await req)
            .map((s) => this.toNavItemLink(s))
            .sort((a, b) => a.label.localeCompare(b.label));

        return result;
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
     * Set the navigation item links for the subscription category and authentication item.
     */
    private setUserItems(subreddits: Array<NavItemLink>, isUser: boolean): void {

        const curr: Array<NavItemCategory|NavItemLink> = this.items$.getValue();

        const result = curr.map((i) => {

            if (i.type === 'category' && i.label === 'Subscriptions') {
                // only replace root level category sub items where its label is 'Subscription'
                i.subItems = subreddits;

            } else if (isUser && i.type === DEFAULT_LOGIN_ITEM.type && i.label === DEFAULT_LOGIN_ITEM.label) {
                // replace login with logout item if user IS authenticated
                i = DEFAULT_LOGOUT_ITEM;

            } else if (!isUser && i.type === DEFAULT_LOGOUT_ITEM.type && i.label === DEFAULT_LOGOUT_ITEM.label) {
                // replace logout with login item if user IS NOT authenticated
                i = DEFAULT_LOGIN_ITEM;
            }

            return i;
        });

        this.items$.next(result);
    }

    /**
     * Map Snoowrap.Subreddit to NavItemLink.
     */
    private toNavItemLink(source: Snoowrap.Subreddit): NavItemLink {
        return {
            label: source.display_name_prefixed,
            sortOrder: 1,
            type: 'link',
            icon: 'bookmark',
            route: source.display_name_prefixed,
            avatar: source.icon_img || source.community_icon
        };
    }
}

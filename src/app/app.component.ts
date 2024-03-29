import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CacheService } from '@core/cache/cache.service';
import { CoreService } from '@core/core.service';
import { NavService } from '@core/layout/nav.service';
import { TitleService } from '@core/layout/title.service';
import { ThemeService } from '@core/material/theme.service';
import { RedditService } from '@core/reddit/reddit.service';
import { routerAnimations } from '@shared/layout/route-animations.constant';
import { Subscription } from 'rxjs';
import { AppConstant } from './app.constent';

interface Breakpoints {
    headerLg?: boolean;
    navModeSide?: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    animations: [ routerAnimations ]
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

    private _breakpoints: Breakpoints;
    private _prevNavOpened: boolean;
    private _prevRoutePath: string;
    private _sidenav: MatSidenav;
    private _subscriptions: Subscription;

    transitionName: string;

    constructor(private navService: NavService, private themeService: ThemeService, private redditService: RedditService,
                private breakpointObserver: BreakpointObserver, private renderer: Renderer2, private titleService: TitleService,
                @Inject(DOCUMENT) private document: Document, private router: Router, private coreService: CoreService,
                private cacheService: CacheService
    ) {
        this._breakpoints = {};
        this._prevRoutePath = '';
        this._subscriptions = new Subscription();
    }

    get breakpoints(): Breakpoints {
        return this._breakpoints;
    }

    get sidenav(): MatSidenav {
        return this._sidenav;
    }

    @ViewChild('sidenav')
    set sidenav(sidenav: MatSidenav) {
        this._sidenav = sidenav;
    }

    get prevNavOpened(): boolean {
        return this._prevNavOpened;
    }

    set prevNavOpened(prevNavOpened: boolean) {
        this._prevNavOpened = prevNavOpened;
    }

    ngOnInit(): void {

        // initialize core application services
        this.coreService.initialize();

        // subscribe to header and nav breakpoint observables
        this._subscriptions.add(this.breakpointObserver.observe([
            AppConstant.BREAKPOINTS.HEADER_LG, AppConstant.BREAKPOINTS.NAV_SIDE
        ]).subscribe(result => this.setBreakpoints(result)));

        // subscribe to theme dark mode observable
        this._subscriptions.add(this.themeService.isDark
            .subscribe(isDark => this.setDarkTheme(isDark)));

        // subscribe to user authentication observable and populate side navigation
        this._subscriptions.add(this.redditService.isUserAuth
            .subscribe(isUserAuth => this.navService.setUserState(isUserAuth)));

        // set the previous nav open state
        // required before view init so it doesn't open
        this.prevNavOpened = this.navService.prevState;

        // subscribe to route changes, this is used to close
        // the sidenav when in over mode only
        this.router.events.subscribe((e) => this.onRouteEvent(e));
    }

    ngAfterViewInit(): void {

        // define side nav in nav serivce, use service to interact with sidenav
        this.navService.setNav(this.sidenav);

        // subscribe to side nav state observable
        // update scroll disabled style on change
        this._subscriptions.add(this.sidenav.closedStart
            .subscribe(() => this.isScrollDisabled(false)));
        this._subscriptions.add(this.sidenav.openedStart
            .subscribe(() => this.isScrollDisabled(true)));
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    onRouteEvent(event: Event): void {

        // close navigation on route change when in over mode
        if (event instanceof NavigationEnd && this.sidenav.mode === 'over') {
            this.navService.close();
        }

        // update header and document title on route change
        if (event instanceof NavigationEnd) {
            const routeTitle: string = this.resolveRouteTitle(this.router.routerState.root);
            this.titleService.setTitle(routeTitle);
        }
    }

    onRouteActivate(routerOutlet: RouterOutlet): void {

        if (routerOutlet.isActivated) {

            const path = routerOutlet.activatedRoute.snapshot.pathFromRoot
                .map((v) => v.url.map((segment) => segment.toString()).join('/'))
                .join('/');

            const isSame = this._prevRoutePath === path;
            const isBackward = this._prevRoutePath.startsWith(path);
            const isForward = path.startsWith(this._prevRoutePath);

            if (isSame) {
                this.transitionName = 'none';
            } else if (isBackward && isForward) {
                this.transitionName = 'initial';
            } else if (isBackward) {
                this.transitionName = 'backward';
            } else if (isForward) {
                this.transitionName = 'forward';
            } else {
                this.transitionName = 'section';
            }

            this._prevRoutePath = path;
        }
    }

    /**
     * Add or remove the scrollbar functionality if not in nav side view.
     *
     * @param isDisabled true to disable scrolling
     */
    private isScrollDisabled(isDisabled: boolean): void {
        if (isDisabled && !this.breakpoints.navModeSide) {
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        } else {
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    }

    /**
     * Resolve the active routes title from the route data or child route data.
     */
    private resolveRouteTitle(route: ActivatedRoute): string {
        let title: string = null;
        if (route && route.snapshot.data && route.snapshot.data.title) {
            title = route.snapshot.data.title;
        } else if (route && route.firstChild) {
            title = this.resolveRouteTitle(route.firstChild);
        }
        return title;
    }

    /**
     * Define header full size and nav side flags from breakspoint states.
     *
     * @param state header and nav breakpoint states
     */
    private setBreakpoints(state: BreakpointState): void {

        const currSideMode: boolean = this.breakpoints.navModeSide;

        // update layout breakpoint propeties that are bound to the view
        this.breakpoints.headerLg = state.breakpoints[AppConstant.BREAKPOINTS.HEADER_LG];
        this.breakpoints.navModeSide = state.breakpoints[AppConstant.BREAKPOINTS.NAV_SIDE];

        // close sidenav if switching modes to over and currently open
        if (this.sidenav && this.sidenav.opened && currSideMode === true && this.breakpoints.navModeSide === false) {
            this.navService.close();
        } else if (this.sidenav && this.sidenav.opened && currSideMode === false && this.breakpoints.navModeSide === true) {
            this.isScrollDisabled(false);
        }
    }

    /**
     * Add or remove the dark theme class from docment body.
     *
     * @param isDark true to add dark theme
     */
    private setDarkTheme(isDark: boolean): void {

        // apply dark theme setting
        if (isDark) {
            this.renderer.addClass(this.document.body, AppConstant.THEME.DARK_CLASS);
        } else {
            this.renderer.removeClass(this.document.body, AppConstant.THEME.DARK_CLASS);
        }

        // add body class to indicate that body theming is ready to be applied
        // must be done after initial theme setting or browser will flash
        this.renderer.addClass(this.document.body, AppConstant.THEME.BODY_CLASS);
    }
}

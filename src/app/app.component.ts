import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Event, NavigationEnd, Router } from '@angular/router';
import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';
import { RedditService } from '@core/reddit/reddit.service';
import { Subscription } from 'rxjs';
import { AppConstant } from './app.constent';

interface Breakpoints {
    headerLg?: boolean;
    navModeSide?: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

    private _breakpoints: Breakpoints;
    private _sidenav: MatSidenav;
    private _subscriptions: Subscription;
    private _prevNavOpened: boolean;

    constructor(private navService: NavService, private themeService: ThemeService, private redditService: RedditService,
                private breakpointObserver: BreakpointObserver, private renderer: Renderer2,
                @Inject(DOCUMENT) private document: Document, private router: Router) {
        this._breakpoints = {};
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

        // subscribe to header and nav breakpoint observables
        this._subscriptions.add(this.breakpointObserver.observe([
            AppConstant.BREAKPOINTS.HEADER_LG, AppConstant.BREAKPOINTS.NAV_SIDE
        ]).subscribe(result => this.setBreakpoints(result)));

        // subscribe to theme dark mode observable
        this._subscriptions.add(this.themeService.isDark
            .subscribe(isDark => this.setDarkTheme(isDark)));

        // subscribe to user authentication observable and populate side navigation subscriptions
        this._subscriptions.add(this.redditService.isUserAuth
            .subscribe(isUserAuth => this.navService.refreshSubscriptions(isUserAuth)));

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
        if (isDark) {
            this.renderer.addClass(this.document.body, AppConstant.THEME.DARK_CLASS);
        } else {
            this.renderer.removeClass(this.document.body, AppConstant.THEME.DARK_CLASS);
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
}

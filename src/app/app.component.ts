import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';
import { Subscription } from 'rxjs';
import { AppConstant } from './app.constent';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

    private subscriptions: Subscription;

    isHeaderFull: boolean;

    isNavSide: boolean;

    @ViewChild('sidenav')
    sidenav: MatSidenav;

    constructor(private navService: NavService, private themeService: ThemeService,
                private breakpointObserver: BreakpointObserver, private renderer: Renderer2,
                @Inject(DOCUMENT) private document: Document) {
        this.subscriptions = new Subscription();
    }

    ngOnInit() {

        // subscribe to header and nav breakpoint observables
        this.subscriptions.add(this.breakpointObserver.observe([
            AppConstant.BREAKPOINTS.HEADER_FULL, AppConstant.BREAKPOINTS.NAV_SIDE
        ]).subscribe(result => this.setBreakpoints(result)));

        // subscribe to theme dark mode observable
        this.subscriptions.add(this.themeService.isDark
            .subscribe(isDark => this.setDarkTheme(isDark)));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ngAfterViewInit(): void {

        // define side nav in nav serivce
        this.navService.setNav(this.sidenav);

        // subscribe to side nav state observable
        // update scroll disabled style on change
        this.subscriptions.add(this.sidenav.closedStart
            .subscribe(() => this.isScrollDisabled(false)));
        this.subscriptions.add(this.sidenav.openedStart
            .subscribe(() => this.isScrollDisabled(true)));
    }

    @HostListener('window:resize')
    ngOnResize(): void {

        // on window resize, update scroll disabled style
        this.isScrollDisabled(this.sidenav.opened);
    }

    /**
     * Define header full size and nav side flags from breakspoint states.
     *
     * @param state header and nav breakpoint states
     */
    private setBreakpoints(state: BreakpointState): void {
        this.isHeaderFull = state.breakpoints[AppConstant.BREAKPOINTS.HEADER_FULL];
        this.isNavSide = state.breakpoints[AppConstant.BREAKPOINTS.NAV_SIDE];
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
        if (isDisabled && !this.isNavSide) {
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        } else {
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    }
}

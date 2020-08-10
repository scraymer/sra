import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '@core/layout/nav.service';
import { ThemeService } from '@core/material/theme.service';
import { environment } from '@env';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();

    appTitle: string;

    isDarkTheme: boolean;

    constructor(private navService: NavService, private themeService: ThemeService) { }

    ngOnInit(): void {
        this.appTitle = environment.app.title;
        this.subscriptions.add(this.themeService.isDark.subscribe(t => this.isDarkTheme = t));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    toggleDarkTheme(checked: boolean): void {
        this.themeService.setDark(!this.isDarkTheme);
    }

    toggleNav(): void {
        this.navService.toggle();
    }
}

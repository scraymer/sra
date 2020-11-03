import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '@core/layout/nav.service';
import { TitleService } from '@core/layout/title.service';
import { ThemeService } from '@core/material/theme.service';
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

    constructor(private navService: NavService, private themeService: ThemeService,
                private titleService: TitleService) { }

    ngOnInit(): void {
        this.subscriptions.add(this.themeService.isDark.subscribe((t) => this.onThemeChange(t)));
        this.subscriptions.add(this.titleService.title.subscribe((t) => this.onTitleChange(t)));
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

    private onThemeChange(isDark: boolean): void {
        this.isDarkTheme = isDark;
    }

    private onTitleChange(title: string): void {
        this.appTitle = title;
    }
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavItemCategory, NavItemLink } from '@core/layout/nav';
import { NavService } from '@core/layout/nav.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnDestroy, OnInit {

    private subscriptions: Subscription = new Subscription();

    items: Array<NavItemCategory|NavItemLink>;

    constructor(private navService: NavService) {}

    ngOnInit(): void {
        this.subscriptions.add(this.navService.items.subscribe(t => this.items = t));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    isActive(): boolean {
        return true;
    }
}

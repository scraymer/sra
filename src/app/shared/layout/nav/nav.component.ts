import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItemCategory, NavItemLink } from '@core/layout/nav';
import { NavService } from '@core/layout/nav.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy, OnInit {

    private subscriptions: Subscription = new Subscription();

    items: Array<NavItemCategory|NavItemLink>;

    constructor(private navService: NavService, private router: Router) {}

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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RedditService } from '@core/reddit/reddit.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();

    constructor(private redditService: RedditService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        // subscribe to route param changes
        this.subscriptions.add(this.route.queryParamMap.subscribe((t: ParamMap) => this.handleRequest(t)));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * On initial login request, redirect to reddit login window. On
     * callback, validate response and reauthenticate reddit service.
     *
     * TODO: on successful login, redirect to previous page
     */
    private handleRequest(params: ParamMap): void {

        if (this.isCallback(params)) {
            if (this.redditService.isValidAuthState(params.get('state'))) {
                this.redditService.authenticate(params.get('code'))
                    .then((r) => this.router.navigateByUrl('/'));
            } else {
                // TODO: show a authentication error
            }
        } else {
            window.location.href = this.redditService.authUrl();
        }
    }

    /**
     * Validate if route parameters contain valid callback response.
     */
    private isCallback(params: ParamMap): boolean {
        return params.has('code') && params.has('state');
    }
}

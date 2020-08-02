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

    authFailedMsg: string = null;

    constructor(private redditService: RedditService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.subscriptions.add(this.route.queryParamMap.subscribe((t: ParamMap) => this.handleRequest(t)));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * On initial login request, redirect to reddit account access page. On
     * callback, validate response and reauthenticate reddit service.
     */
    private handleRequest(params: ParamMap): void {
        if (this.isCallback(params)) {
            this.resolveAuthentication(params.get('state'), params.get('code'), params.get('error'));
        } else {
            this.initializeAuthentication();
        }
    }

    /**
     * Initialize authentication by redirecting the user to the reddit account access
     * page where they will be asked to login and allow access.
     */
    private initializeAuthentication(): void {
        window.location.href = this.redditService.authUrl();
    }

    /**
     * Validate if route parameters contain valid callback response.
     */
    private isCallback(params: ParamMap): boolean {
        return params.has('code') && params.has('state') || params.has('error');
    }

    /**
     * Validate the authentication response from the reddit account access page. If successful,
     * authenticate the application and navigate to the application root.
     *
     * If request failed, display an error message to the user.
     *
     * TODO: on successful login, redirect to previous page
     * TODO: on failed login, improve user experience
     *
     * @param state response state
     * @param code response code
     */
    private resolveAuthentication(state: string, code: string, error?: string): void {

        // if the state is valid, authenticate with the code and redirect to root
        if (!error && this.redditService.isValidAuthState(state)) {
            this.redditService.authenticate(code)
                .then((r) => this.router.navigateByUrl('/'));
        } else {
            console.error(`Failed to authenticate with reddit, '${error || 'invalid state'}'.`);
            this.authFailedMsg = `Failed to login to reddit account, '${error || 'invalid state'}'!`;
        }
    }
}

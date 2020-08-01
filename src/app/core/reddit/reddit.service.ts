import { Inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { RedditConstant } from './reddit.constant';

@Injectable({
    providedIn: 'root'
})
export class RedditService {

    private service: Snoowrap;

    /**
     * Source subject for managing the "user-specific" authentication state.
     */
    private _isUserAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

    /**
     * Initialize the reddit service by authenticating via
     * "user-less" or "user-specific" authetnication.
     *
     * Checks for "user-specific" authentication code from
     * previous sessions in localstorage.
     */
    initialize = (): Promise<any> => {
        return this.authenticate();
    }

    /**
     * Returns the reddit service for making any type of request
     * supported by the third-party snoowrap library.
     */
    get run(): Snoowrap {
        return this.service;
    }

    /**
     * Get the state of the "user-specific" authentication.
     */
    get isUserAuth(): Observable<boolean> {
        return this._isUserAuth.asObservable();
    }

    /**
     * Configure reddit service by "user-less" or "user-specific"
     * authentication.
     *
     * Any authCode parameter provided will be persisted to
     * localstorage, else any existing will be cleared.
     *
     * To "log-off" a user, simply call this request without
     * authCode paramter.
     *
     * @param authCode "user-specific" authentication code
     */
    public authenticate(authCode?: string): Promise<Snoowrap> {

        const authReq = authCode
            ? this.authFromCode(authCode)
            : this.authFromApp();

        return authReq.then((service) => this.handleAuthResponse(service, authCode));
    }

    /**
     * Return the reddit "user-specific" authentication url.
     */
    public authUrl(): string {

        return Snoowrap.getAuthUrl({
            clientId: environment.reddit.clientId,
            redirectUri: environment.reddit.redirectUrl,
            scope: environment.reddit.scope,
            state: this.authState()
        });
    }
    /**
     * Validate that the provided state value is equal to the expected value.
     */
    public isValidAuthState(authState: string): boolean {
        return authState === this.authState();
    }

    /**
     * Request a "user-less" authorization token.
     */
    private authFromApp(): Promise<Snoowrap> {
        return Snoowrap.fromApplicationOnlyAuth({
            clientId: environment.reddit.clientId,
            deviceId: environment.reddit.deviceId,
            userAgent: environment.reddit.userAgent
        });
    }

    /**
     * Request a "user-specific" authorization token.
     *
     * @param authCode authorization code
     */
    private authFromCode(authCode: string): Promise<Snoowrap> {
        return Snoowrap.fromAuthCode({
            clientId: environment.reddit.clientId,
            code: authCode,
            deviceId: environment.reddit.deviceId,
            redirectUri: environment.reddit.redirectUrl,
            userAgent: environment.reddit.userAgent
        });
    }

    /**
     * Retreives the authentication state value persisted in local storage. If it never has been
     * generated before, it will be generated as a valid GUID value, persisted and returned.
     */
    private authState(): string {

        if (!this.storage.has(RedditConstant.AUTH_STATE_KEY)) {
            this.storage.set(RedditConstant.AUTH_STATE_KEY, '10000000-1000-4000-8000-100000000000'
                .replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
        }

        return this.storage.get(RedditConstant.AUTH_STATE_KEY);
    }

    /**
     * Handle authentication repsonses by updating the service object and isUserAuth subject.
     */
    private handleAuthResponse(service: Snoowrap, authCode?: string): Snoowrap {

        // update the service object before notifying the isUserAuth subject
        this.service = service;

        // update the user authentication subject based on auth code
        this._isUserAuth.next(authCode ? true : false);

        // return service to allow chaining
        return this.service;
    }
}

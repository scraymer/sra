import { Inject, Injectable } from '@angular/core';
import { CacheService } from '@core/cache/cache.service';
import { environment } from '@env';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
    private isUserAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private cache: CacheService) {}

    /**
     * Initialize the reddit service by authenticating via
     * "user-less" or "user-specific" authetnication.
     *
     * Checks for "user-specific" authentication code from
     * previous sessions in storage service.
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
     * Retreives the authentication state value persisted in local storage. If it never has been
     * generated before, it will be generated as a valid GUID value, persisted and returned.
     */
    get authState(): string {

        if (!this.storage.has(RedditConstant.AUTH_STATE_KEY)) {
            this.storage.set(RedditConstant.AUTH_STATE_KEY, '10000000-1000-4000-8000-100000000000'
                .replace(/[018]/g, (c: any) => (
                    // tslint:disable-next-line:no-bitwise
                    c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4
                ).toString(16)));
        }

        return this.storage.get(RedditConstant.AUTH_STATE_KEY);
    }

    /**
     * Get the state of the "user-specific" authentication.
     */
    get isUserAuth(): Observable<boolean> {
        return this.isUserAuth$.asObservable();
    }

    /**
     * Configure reddit service by "user-less" or "user-specific"
     * authentication.
     *
     * @param authCode "user-specific" authentication code
     */
    public authenticate(authCode?: string): Promise<Snoowrap> {

        const refreshToken: string = this.storage.get(RedditConstant.AUTH_REFRESH_KEY);

        let authReq: Promise<Snoowrap>;
        let isUserSpecific: boolean;

        if (authCode) {
            authReq = this.authFromCode(authCode);
            isUserSpecific = true;
        } else if (refreshToken) {
            authReq = this.authFromRefresh(refreshToken);
            isUserSpecific = this.storage.get(RedditConstant.AUTH_IS_USER_SPECIFIC_KEY) || false;
        } else {
            authReq = this.authFromApp();
            isUserSpecific = false;
        }

        return authReq.then(
            async (service) => await this.handleAuthResponse(service, isUserSpecific),
            async (reason) => await this.handleAuthError(reason));
    }

    /**
     * Revoke current session and re-authenticate a "user-less" service.
     */
    public revoke(): Promise<Snoowrap> {

        // remove refresh token and user-specific flag from storage service
        // prevents them from being used again once revoked
        this.storage.remove(RedditConstant.AUTH_REFRESH_KEY);
        this.storage.remove(RedditConstant.AUTH_IS_USER_SPECIFIC_KEY);

        // revoke refresh token and all related access tokens
        // re-authenticate a "user-less" session once complete
        return this.service.revokeRefreshToken().then(() => this.authenticate());
    }

    /**
     * Return the reddit "user-specific" authentication url.
     */
    public authUrl(): string {

        return Snoowrap.getAuthUrl({
            clientId: environment.reddit.clientId,
            redirectUri: environment.reddit.redirectUrl,
            scope: environment.reddit.scope,
            state: this.authState
        });
    }

    /**
     * Validate that the provided state value is equal to the expected value.
     */
    public isValidAuthState(authState: string): boolean {
        return authState === this.authState;
    }

    /**
     * Request a "user-less" authorization token.
     */
    private authFromApp(): Promise<Snoowrap> {
        // apply "permanent: false" as a temporary workaround for snoowrap 'fromApplicationOnlyAuth'
        // issues, see https://github.com/not-an-aardvark/snoowrap/issues/349
        return Snoowrap.fromApplicationOnlyAuth({
            clientId: environment.reddit.clientId,
            deviceId: environment.reddit.deviceId,
            userAgent: environment.reddit.userAgent,
            permanent: false
        } as any);
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
     * Request a "user-less" or "user-specific" authorization token from a preivous
     * session's refresh token.
     *
     * @param refreshToken refresh token
     */
    private authFromRefresh(refreshToken: string): Promise<Snoowrap> {
        return Promise.resolve(new Snoowrap({
            clientId: environment.reddit.clientId,
            clientSecret: null,
            userAgent: environment.reddit.userAgent,
            refreshToken
        }));
    }

    /**
     * Handle authentication repsonses by updating the service object and isUserAuth subject.
     *
     * Persist refresh token and isUserSpecific flag to the storage service, will be used to
     * initialize future sessions.
     */
    private async handleAuthResponse(response: Snoowrap, isUserSpecific: boolean): Promise<Snoowrap> {

        // remove user-specific cached entries, wait for completion so they aren't
        // used before resolving authentication response (skip on initialization)
        if (this.service) {
            await this.cache.clearUserSpecific();
        }

        // persist refresh tokens and user-specific flag to the storage service
        this.storage.set(RedditConstant.AUTH_REFRESH_KEY, response.refreshToken);
        this.storage.set(RedditConstant.AUTH_IS_USER_SPECIFIC_KEY, isUserSpecific);

        // update the service object before notifying the isUserAuth subject
        this.service = response;

        // update the user authentication subject based on auth code
        this.isUserAuth$.next(isUserSpecific);

        // return service to allow chaining
        return this.service;
    }

    private async handleAuthError(reason: { message: string }): Promise<any> {
        console.error(`Failed to authenticate with Reddit API: ${reason?.message != null ? reason.message : 'unknown'}`);
        return throwError('Could not initialize Reddit API authentication.');
    }
}

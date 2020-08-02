export class RedditConstant {

    /**
     * Key for current/previous session's refresh token in storage service.
     */
    static readonly AUTH_REFRESH_KEY: string = 'app.core.reddit.auth.refresh';

    /**
     * Key for "user-specific" authentication flag in storage service.
     */
    static readonly AUTH_IS_USER_SPECIFIC_KEY: string = 'app.core.reddit.auth.is-user-specific';

    /**
     * Key for "user-specific" authentication state in storage service.
     */
    static readonly AUTH_STATE_KEY: string = 'app.core.reddit.auth.state';
}

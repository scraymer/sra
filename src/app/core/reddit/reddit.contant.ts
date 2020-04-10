export class RedditConstent {

    /**
     * Client ID used to authenticate with reddit api.
     */
    static readonly CLIENT_ID = '84X6ASXxXjAt3Q';

    /**
     * Prevent device tracking when authenticated with reddit api.
     */
    static readonly DEVICE_ID = 'DO_NOT_TRACK_THIS_DEVICE';

    /**
     * App user-agent to use with reddit api.
     *
     * TODO: automate version number from package.json
     * TODO: use browser user-agent as prefix
     */
    static readonly USER_AGENT = 'browser:ca.craymer.sam.sra:v0.1.0 (by /u/simple-reddit-app)';

    /**
     * Reddit URL prefix.
     */
    static readonly REDDIT_URL_PREFIX = 'https://reddit.com/';
}

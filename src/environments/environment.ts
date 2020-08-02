// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  reddit: {

    /**
     * Client ID used to authenticate with reddit api.
     */
    clientId: 'Mn6imoX40zGd5w',

    /**
     * Prevent device tracking when authenticated with reddit api.
     */
    deviceId: 'DO_NOT_TRACK_THIS_DEVICE',

    /**
     * Configured redirect url when authenticating with reddit api.
     */
    redirectUrl: 'http://localhost:4200/auth/login',

    /**
     * An array of scopes (permissions on the user's account) to request
     * on the authentication page.
     *
     * A list of possible scopes can be found at 'https://www.reddit.com/api/v1/scopes'
     * or via snoowrap#getOauthScopeList.
     */
    scope: ['mysubreddits', 'read'],

    /**
     * Reddit URL prefix.
     */
    urlPrefix: 'https://reddit.com/',

    /**
     * App user-agent to use with reddit api.
     *
     * TODO: automate version number from package.json
     */
    userAgent: navigator.userAgent + ':ca.craymer.sam.sra:v0.1.0 (by /u/simple-reddit-app)'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

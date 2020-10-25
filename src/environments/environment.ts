// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { name, title, version } from 'package.json';

export const environment = {

    /**
     * Application specific details used to populate interface fields.
     */
    app: {

        /**
         * Application name, equivalent to npm package name.
         */
        name: `${name}`,

        /**
         * Application human readable title.
         */
        title: `${title}`,

        /**
         * Application version, equivalent to npm package version.
         */
        version: `v${version}-SNAPSHOT`,
    },

    /**
     * Configuration options for the analytic service(s).
     */
    analytics: {

        /**
         * Boolean flag to disable analytics services, set to true for production only.
         */
        enabled: false,

        /**
         * Main configuration for mixpanel analytic provider.
         */
        mixpanel: {

            /**
             * Mixpanel project token to push events to.
             */
            token: '435b94a4d4bc80932b0d64612b78438b'
        }
    },

    /**
     * Configuration options for the monitoring services used to diagnose, fix, and optimize the
     * performance of the application.
     */
    monitoring: {

        /**
         * Boolean flag to disable monitoring services, set to true for production only.
         */
        enabled: false,

        /**
         * Main configuration for sentry application monitorying client.
         */
        sentry: {

            /**
             * Sentry project dns (Data Source Name) to push events to.
             */
            dns: 'https://44c78ddfbccb4698b2ba8df5396d0c15@o440991.ingest.sentry.io/5410733',

            /**
             * Define which outgoing requests the `sentry-trace` header will be attached to.
             */
            tracingOrigins: ['localhost'],

            /**
             * Sample rate to determine trace sampling, range between 0.0 and 1.0.
             *
             * 0.0 = 0% chance of a given trace being sent (send no traces)
             * 1.0 = 100% chance of a given trace being sent (send all traces)
             */
            tracesSampleRate: 1.0
        }
    },

    /**
     * Boolean flag to indicate when the build targets production or not.
     */
    production: false,

    /**
     * Configuration options for the reddit API.
     */
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
         * Reddit API URL prefix.
         */
        apiUrlPrefix: 'https://oauth.reddit.com/',

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

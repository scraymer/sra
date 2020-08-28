import { name, title, version } from 'package.json';

export const environment = {
    app: {
        name: `${name}`,
        title: `${title}`,
        version: `v${version}`,
    },
    analytics: {
        enabled: true,
        mixpanel: {
            token: '435b94a4d4bc80932b0d64612b78438b'
        }
    },
    production: true,
    reddit: {
        clientId: '84X6ASXxXjAt3Q',
        deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
        redirectUrl: 'https://scraymer.github.io/sra/auth/login',
        scope: ['mysubreddits', 'read'],
        urlPrefix: 'https://reddit.com/',
        apiUrlPrefix: 'https://oauth.reddit.com/',
        userAgent: navigator.userAgent + ':ca.craymer.sam.sra:v0.1.0 (by /u/simple-reddit-app)'
    }
};

import { name, title, version } from 'package.json';

export const environment = {
  production: true,
  app: {
    name: `${name}`,
    title: `${title}`,
    version: `v${version}`,
  },
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

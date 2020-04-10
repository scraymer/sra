import { Injectable } from '@angular/core';
import * as Snoowrap from 'snoowrap';
import { RedditConstent } from './reddit.contant';

@Injectable({
    providedIn: 'root'
})
export class RedditService {

    private service: Snoowrap;

    constructor() { }

    initialize = (): Promise<any> => {
        return Snoowrap.fromApplicationOnlyAuth({
            userAgent: RedditConstent.USER_AGENT,
            clientId: RedditConstent.CLIENT_ID,
            deviceId: RedditConstent.DEVICE_ID
        }).then((r) => this.service = r);
     }

    get run(): Snoowrap {
        return this.service;
    }
}

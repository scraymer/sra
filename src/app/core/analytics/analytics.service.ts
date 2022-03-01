import { Injectable } from '@angular/core';
import { RedditService } from '@core/reddit/reddit.service';
import { environment } from '@env';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import mixpanelBrowser, { Mixpanel } from 'mixpanel-browser';
import { AnalyticOptions } from './analytics';

declare global {
    var mixpanel: Mixpanel;
}

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    /**
     * Analytics enviroment options defined on construction.
     */
    private options: AnalyticOptions;

    constructor(private analyticService: Angulartics2, private mixpanelAnalytics: Angulartics2Mixpanel,
                private redditService: RedditService) {

        this.options = environment.analytics;
        this.analyticService.settings.developerMode = !this.options.enabled;
    }

    /**
     * Initialize the analytics service and its provider(s). Should only be called once
     * within the main AppComponent.
     */
    public initialize(): void {

        // return immediate if analytics is not enabled
        if (this.analyticService.settings.developerMode) {
            console.warn('Analytics Disabled!');
            return;
        }

        // this application only uses mixpanel as the analytics provider
        this.startMixpanelTracking();
    }

    /**
     * Define, initialize and start mixpanel analytics tracking. If the user's nav/window DoNotTrack
     * settings are true, no tracking will be done to respect user's privacy. This is built into
     * mixpanel-browser library by default.
     */
    private startMixpanelTracking(): void {

        // define global mixpanel from imported module
        globalThis.mixpanel = mixpanelBrowser;

        // configure mixpanel service initial configuration directly and set as globel value, required
        // as angulartics doesn't provided this functionality
        globalThis.mixpanel.init(this.options.mixpanel.token, null, null);

        // only track identity by their randomly generated authentication state to respect privacy
        globalThis.mixpanel.identify(this.redditService.authState);

        // statrt tracking using angulartics2 mixpanelprovider
        this.mixpanelAnalytics.startTracking();

        // log warning that mixpanel analytics has been disabled due to user's preferences
        if (globalThis.mixpanel.has_opted_out_tracking()) {
            console.warn('Mixpanel analytics disabled, user has opted out of tracking.');
        }
    }
}

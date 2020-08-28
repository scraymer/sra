import { Injectable } from '@angular/core';
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

    constructor(private analyticService: Angulartics2, private mixpanelAnalytics: Angulartics2Mixpanel) {
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
     * Define, initialize and start mixpanel analytics tracking.
     */
    private startMixpanelTracking(): void {

        // define global mixpanel from imported module
        globalThis.mixpanel = mixpanelBrowser;

        // configure mixpanel service initial configuration directly and set as globel value, required
        // as angulartics doesn't provided this functionality
        globalThis.mixpanel.init(this.options.mixpanel.token);

        // statrt tracking using angulartics2 mixpanelprovider
        this.mixpanelAnalytics.startTracking();
    }
}

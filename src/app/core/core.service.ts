import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    constructor(private analyticsService: AnalyticsService) { }

    /**
     * Initalize core application services.
     */
    public initialize(): void {

        // initialize analytics services
        this.analyticsService.initialize();
    }
}

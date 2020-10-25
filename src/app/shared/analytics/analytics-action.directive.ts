import { AfterContentInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AnalyticEvent } from '@core/analytics/analytics';
import { Angulartics2 } from 'angulartics2';

@Directive({
    selector: '[appAnalyticsAction]'
})
export class AnalyticsActionDirective implements AfterContentInit {

    /**
     * Action to track event as.
     */
    @Input()
    appAnalyticsAction: string;

    /**
     * Event type to trigger action tracking.
     *
     * Default: click
     */
    @Input()
    appAnalyticsActionEvent = 'click';

    /**
     * Additional custom properties to included with the action.
     */
    @Input()
    appAnalyticsActionProperties: any;

    constructor(private element: ElementRef<Element>, private renderer: Renderer2,
                private analyticsService: Angulartics2) {}

    ngAfterContentInit(): void {
        this.renderer.listen(this.element.nativeElement, this.appAnalyticsActionEvent,
            (event: Event) => this.onEvent(event));
    }

    private onEvent(event: Event): void {
        this.analyticsService.eventTrack.next({
            action: this.appAnalyticsAction,
            properties: {
                ...this.appAnalyticsActionProperties,
                eventType: event.type
            }
        } as AnalyticEvent);
    }
}

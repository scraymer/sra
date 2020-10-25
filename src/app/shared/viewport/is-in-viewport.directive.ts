import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { InViewportConfig, InViewportConfigOptions, InViewportService } from 'ng-in-viewport';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InViewportEvent } from './viewport';

export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
    selector: '[appIsInViewport]'
})
export class IsInViewportDirective implements AfterViewInit, OnDestroy {

    private config: InViewportConfig = new InViewportConfig();
    private readonly subscription: Subscription = new Subscription();

    /**
     * The class name to apply when the element is within the viewport.
     *
     * Default: is-in-viewport
     */
    @Input()
    appIsInViewportClass = 'app-is-in-viewport';

    /**
     * The options for `InViewportService`.
     */
    @Input()
    private set appIsInViewportOptions(value: InViewportConfigOptions) {
        this.config = new InViewportConfig(value);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object, // tslint:disable-line
        private element: ElementRef<Element>, private inViewportService: InViewportService, private renderer: Renderer2
    ) {}

    public ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.inViewportService.register(this.element.nativeElement, this.config);
            this.subscription.add(
                this.inViewportService.trigger$
                    .pipe(filter((entry: IntersectionObserverEntry) => entry && entry.target === this.element.nativeElement))
                    .subscribe((entry: IntersectionObserverEntry) => this.action(entry, false))
            );
        } else {
            this.action(undefined, true);
        }
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        if (isPlatformBrowser(this.platformId)) {
            this.inViewportService.unregister(this.element.nativeElement, this.config);
        }
    }

    private check(entry: IntersectionObserverEntry, force: boolean): InViewportEvent {
        const isVisible = () => {
            const partiallyVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            const completelyVisible = entry.intersectionRatio >= 1;
            return this.config.partial ? partiallyVisible : completelyVisible;
        };
        const visible = force || !entry || isVisible();
        return { target: this.element.nativeElement, visible };
    }

    private action(entry: IntersectionObserverEntry, force: boolean): void {
        const event: InViewportEvent = this.config.checkFn
            ? this.config.checkFn(entry, { force, config: this.config })
            : this.check(entry, force);

        event.visible
            ? this.renderer.addClass(event.target, this.appIsInViewportClass)
            : this.renderer.removeClass(event.target, this.appIsInViewportClass);
    }
}

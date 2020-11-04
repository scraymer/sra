import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@env';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TitleConstant } from './title.constant';

/**
 * Service used to control the application title state and value.
 */
@Injectable({
    providedIn: 'root'
})
export class TitleService implements OnDestroy {

    private subscriptions: Subscription = new Subscription();

    /**
     * The application title displayed in the header toolbar.
     */
    private title$: BehaviorSubject<string> = new BehaviorSubject<string>(environment.app.title);

    constructor(private titleService: Title) {
        this.subscriptions.add(this.title.subscribe((t) => this.onTitleChange(t)));
    }

    /**
     * Get the subscription for the application title.
     */
    get title(): Observable<string> {
        return this.title$.asObservable();
    }

    /**
     * On destroy event, unsubscribe all subscriptions.
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Set the next application title value. Use `null` for no/blank title or
     * TitleConstant.NO_ROUTE_TITLE to ignore the route change.
     *
     * @param title title value
     */
    setTitle(title: string): void {
        if (title !== TitleConstant.NO_ROUTE_TITLE) {
            this.title$.next(title || environment.app.title);
        }
    }

    /**
     * On title change, update the document title.
     *
     * @param title title value
     */
    private onTitleChange(title: string): void {
        this.titleService.setTitle(
            this.resolveDocumentTitle(title));
    }

    /**
     * Resolve title into the document title format.
     *
     * @param title title value
     */
    private resolveDocumentTitle(title: string): string {
        return title && title.toUpperCase() !== environment.app.title.toUpperCase()
            ? `${title} - ${environment.app.title}` : environment.app.title;
    }
}

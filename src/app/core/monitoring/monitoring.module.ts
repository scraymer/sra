import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { createErrorHandler, TraceService } from '@sentry/angular';

@NgModule({
    providers: [
        {
            provide: ErrorHandler,
            useValue: createErrorHandler({
                showDialog: true
            })
        },
        {
            provide: TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [TraceService],
            multi: true,
        }
    ]
})
export class MonitoringModule { }

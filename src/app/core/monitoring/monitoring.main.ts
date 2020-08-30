import { environment } from '@env';
import { init, routingInstrumentation } from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

/**
 * Call this function as early as possible in the bootstrapping process (main.ts). It will
 * initialize necessary monitorying providers outside of Angular's core functionality.
 */
export function enableMonitoring(): void {

    const dsn: string = environment.monitoring.sentry.dns;
    const tracingOrigins: string[] = environment.monitoring.sentry.tracingOrigins;
    const tracesSampleRate: number = environment.monitoring.sentry.tracesSampleRate;

    init({
        dsn,
        integrations: [
            new Integrations.BrowserTracing({
                tracingOrigins,
                routingInstrumentation,
            }),
        ],
        release: `${environment.app.name}@${environment.app.version}`,
        tracesSampleRate,
    });
}

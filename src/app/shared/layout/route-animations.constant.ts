import {
    animate, AnimationMetadata, AnimationQueryOptions, AnimationTriggerMetadata, group, query as q,
    style, transition, trigger
} from '@angular/animations';

enum DirectionType {
    Backward = 'backward',
    Forward = 'forward'
}

const query = (selector: string, animation: AnimationMetadata | AnimationMetadata[],
               options: AnimationQueryOptions | null = { optional: true }) =>
    q(selector, animation, options);

const fadeSteps = (): AnimationMetadata[] => [
    query(':enter, :leave', [
        style({ position: 'fixed', width: '100%' })
    ]),
    query(':enter', [
        style({ opacity: 0 })
    ]),
    group([
        query(':leave', [
            animate('0.3s ease-out', style({ opacity: 0 }))
        ]),
        query(':enter', [
            style({ opacity: 0 }),
            animate('0.3s ease-out', style({ opacity: 1 }))
        ])
    ])
];

const fadeInFromSteps = (direction: DirectionType ): AnimationMetadata[] => [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
    group([
        query(':enter', [
            style({
            transform: `translateX(${direction === DirectionType.Backward ? '-' : ''}15%)`,
            opacity: 0,
            }),
            animate(
            '0.3s ease-out',
            style({ transform: 'translateX(0%)', opacity: 1 }),
            ),
        ]),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.3s ease-out', style({ opacity: 0 })),
        ]),
    ]),
];

export const routerAnimations: AnimationTriggerMetadata = trigger('routeAnimations', [
    transition('* => inital', fadeSteps()),
    transition('* => section', fadeSteps()),
    transition('* => forward', fadeInFromSteps(DirectionType.Forward)),
    transition('* => backward', fadeInFromSteps(DirectionType.Backward))
]);

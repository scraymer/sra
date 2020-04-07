import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ScrollEventDirective } from './scroll-event.directive';
import { ScrollbarDirective } from './scrollbar/scrollbar.directive';

export const Components: any[] = [
    FooterComponent,
    HeaderComponent,
    NavComponent
];

export const Directives: any[] = [
    ScrollbarDirective,
    ScrollEventDirective
];

export * from './footer/footer.component';
export * from './header/header.component';
export * from './nav/nav.component';
export * from './scroll-event.directive';
export * from './scrollbar/scrollbar.directive';


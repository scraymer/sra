import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ScrollbarDirective } from './scrollbar/scrollbar.directive';
import { ScrollHideDirective } from './scroll-hide.directive';

export const Components: any[] = [
    FooterComponent,
    HeaderComponent,
    NavComponent
];

export const Directives: any[] = [
    ScrollbarDirective,
    ScrollHideDirective
];

export * from './footer/footer.component';
export * from './header/header.component';
export * from './nav/nav.component';
export * from './scrollbar/scrollbar.directive';
export * from './scroll-hide.directive';

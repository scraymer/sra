import { FooterComponent } from '@shared/layout/footer/footer.component';
import { HeaderComponent } from '@shared/layout/header/header.component';
import { NavComponent } from '@shared/layout/nav/nav.component';
import { ScrollHideDirective } from '@shared/layout/scroll-hide.directive';

export const Components: any[] = [
    FooterComponent,
    HeaderComponent,
    NavComponent
];

export const Directives: any[] = [
    ScrollHideDirective
];

export * from '@shared/layout/footer/footer.component';
export * from '@shared/layout/header/header.component';
export * from '@shared/layout/nav/nav.component';
export * from '@shared/layout/scroll-hide.directive';

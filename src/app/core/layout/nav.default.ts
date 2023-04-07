import { NavItemCategory, NavItemLink } from './nav';

export const DEFAULT_LOGIN_ITEM: NavItemLink = { label: 'Login', sortOrder: 9999, type: 'link', route: '/auth/login', icon: 'login' };

export const DEFAULT_LOGOUT_ITEM: NavItemLink = { label: 'Logout', sortOrder: 9999, type: 'link', route: '/auth/logout', icon: 'person' };

export const DEFAULT_NAV_ITEMS: Array<NavItemCategory|NavItemLink> = [
    { label: 'Front Page', sortOrder: 1, type: 'link', route: '/front-page', icon: 'home' },
    { label: 'Subscriptions', sortOrder: 2, type: 'category', icon: 'bookmarks', expanded: true, subItems: [ /* POPULATED AT RUNTIME */ ] },
    DEFAULT_LOGIN_ITEM
];

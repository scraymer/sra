import { NavItemCategory, NavItemLink } from './nav';

export const DEFAULT_NAV_ITEMS: Array<NavItemCategory|NavItemLink> = [
    { label: 'Front Page', sortOrder: 1, type: 'link', route: '/front-page', icon: 'home' },
    { label: 'Subscriptions', sortOrder: 2, type: 'category', icon: 'bookmarks', subItems: [ /* POPULATED AT RUNTIME */ ] }
];

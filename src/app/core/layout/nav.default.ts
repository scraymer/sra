import { NavItemCategory, NavItemLink } from './nav';

export const DEFAULT_NAV_ITEMS: Array<NavItemCategory|NavItemLink> = [
    { label: 'Front Page', sortOrder: 1, type: 'link', route: '/front-page', icon: 'home' },
    { label: 'Subscriptions', sortOrder: 2, type: 'category', subItems: [ /* POPULATED AT RUNTIME */ ] },
    { label: 'Settings', sortOrder: 3, type: 'link', route: '/settings', disabled: true, icon: 'settings' }
];

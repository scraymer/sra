import { NavItemCategory, NavItemLink } from './nav';

export const DEFAULT_NAV_ITEMS: Array<NavItemCategory|NavItemLink> = [
    { label: 'Front Page', sortOrder: 1, type: 'link', route: '/front-page', icon: 'home' },
    { label: 'Settings', sortOrder: 2, type: 'link', route: '/settings', disabled: true, icon: 'settings' },
    { label: 'Subreddits', sortOrder: 3, type: 'category', subItems: [
        { label: 'r/formula1', sortOrder: 1, type: 'link', route: 'r/formula1', avatar: 'https://picsum.photos/40?1' },
        { label: 'r/todayilearned', sortOrder: 2, type: 'link', route: 'r/todayilearned', avatar: 'https://picsum.photos/40?2' }] }
];

export interface NavItem {
    label: string;
    sortOrder: number;
    type: NavItemType;
}

export interface NavItemCategory extends NavItem {
    type: 'category';
    subItems: NavItemLink[];
}

export interface NavItemLink extends NavItem {
    type: 'link';
    route: string;
    disabled?: boolean;
    avatar?: string;
    icon?: string;
}

export type NavItemType = 'category' | 'link';

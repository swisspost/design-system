export const SIDE_NAVIGATION_SIZES = ['large', 'small'] as const;

export type SideNavigationSize = (typeof SIDE_NAVIGATION_SIZES)[number];

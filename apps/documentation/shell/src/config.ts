import type { NavigationConfig } from './navigation/navigation';

export const PREVIEW_ORIGIN = import.meta.env.VITE_PREVIEW_ORIGIN ?? '';

export const SITE_TITLE = 'Swiss Post Design System';

/** The navigation of the sidebar, the mobile sheet and the search results. */
export const NAVIGATION: NavigationConfig = {
  categoryIcon: 'parcel',
  defaultRoot: {
    layout: 'category',
    icon: 'document',
    weight: 'bold',
  },
  roots: {
    'Introduction': { layout: 'home', icon: 'document', weight: 'bold' },
    'Getting Started': { layout: 'category', icon: 'arrowright', weight: 'bold' },
    'Packages': { layout: 'category', icon: 'parcel', weight: 'regular' },
    'Foundations': { layout: 'category', icon: 'portal', weight: 'bold' },
    'Raw Components': { layout: 'category', icon: 'component', weight: 'bold' },
    'Components': { layout: 'category', icon: 'component', weight: 'bold' },
    'Utilities': { layout: 'category', icon: 'component', weight: 'bold' },
    'Templates': { layout: 'category', icon: 'webpage', weight: 'bold' },
    'Guidelines': { layout: 'category', icon: 'document', weight: 'bold' },
    'Accessibility Practices': { layout: 'category', icon: 'document', weight: 'bold' },
    'Misc': { layout: 'flat', icon: 'document', weight: 'bold' },
    'Health': { layout: 'hidden', icon: 'document', weight: 'bold' },
  },
};

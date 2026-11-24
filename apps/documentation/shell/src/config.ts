import type { RootDefinition } from './navigation/root';

export const PREVIEW_ORIGIN = import.meta.env.VITE_PREVIEW_ORIGIN ?? '';

export const SITE_TITLE = 'Swiss Post Design System';

/** The `post-icon` shown after the category headings. */
export const CATEGORY_ICON = 'parcel';

/** The definition of the roots that are not in `ROOTS`. */
export const DEFAULT_ROOT: RootDefinition = {
  layout: 'category',
  icon: 'document',
  weight: 'bold',
};

/**
 * The roots of the navigation, by name (the first segment of the page titles).
 * Their order comes from `storySort` in `preview/.storybook/preview.ts`.
 */
export const ROOTS: Record<string, RootDefinition> = {
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
};

import docsPackage from '../../package.json';
import type { AnalyticsConfig } from './analytics/analytics';
import type { NavigationConfig } from './navigation/navigation';

export const PREVIEW_ORIGIN = import.meta.env.VITE_PREVIEW_ORIGIN ?? '';

export const SITE_TITLE = 'Swiss Post Design System';

/** The navigation of the sidebar, the mobile sheet and the search results. */
export const NAVIGATION: NavigationConfig = {
  collapsibleRootIcon: 'parcel',
  defaultRoot: { layout: 'collapsible', icon: 'document', weight: 'bold' },
  roots: {
    'Introduction': { layout: 'home', icon: 'document', weight: 'bold' },
    'Getting Started': { layout: 'collapsible', icon: 'arrowright', weight: 'bold' },
    'Packages': { layout: 'collapsible', icon: 'parcel', weight: 'regular' },
    'Foundations': { layout: 'collapsible', icon: 'portal', weight: 'bold' },
    'Raw Components': { layout: 'collapsible', icon: 'component', weight: 'bold' },
    'Components': { layout: 'collapsible', icon: 'component', weight: 'bold' },
    'Utilities': { layout: 'collapsible', icon: 'component', weight: 'bold' },
    'Templates': { layout: 'collapsible', icon: 'webpage', weight: 'bold' },
    'Guidelines': { layout: 'collapsible', icon: 'document', weight: 'bold' },
    'Accessibility Practices': { layout: 'collapsible', icon: 'document', weight: 'bold' },
    'Misc': { layout: 'flat', icon: 'document', weight: 'bold' },
    'Health': { layout: 'hidden', icon: 'document', weight: 'bold' },
  },
};

/** Google Tag Manager, also loaded in development (environment `dev`). */
export const ANALYTICS: AnalyticsConfig = {
  gtmId: 'GTM-WKSKHGJ',
  environments: {
    dev: ['localhost'],
    int: ['preview-'],
    prod: ['design-system.post.ch'],
  },
  fallbackEnvironment: 'dev',
  sourceCodeVersion: docsPackage.version,
  pageValues: {
    content_language: 'en',
    content_geo_region: 'national',
  },
  contextValues: {
    login_status: 'false',
    platform_name: 'ms_design_system',
    department_name: 'IT16.12',
    business_unit: 'IT',
    primary_segment: 'allgemein',
  },
};

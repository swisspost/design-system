import { version } from '../../package.json';

/**
 * Google Tag Manager for the documentation site.
 * The shell pushes `page_context` for the first page and `page_change` for every page opened after it.
 * Replaces the manager scripts `analytics-helper.js`, `analytics-events.js` and `storybook-manager-events.js`.
 */

const GTM_KEY = 'GTM-WKSKHGJ';

/** The environment is the first one whose host prefix matches the current host */
const ENVIRONMENTS: [name: string, hostPrefix: string][] = [
  ['dev', 'localhost'],
  ['int', 'preview-'],
  ['prod', 'design-system.post.ch'],
];
const FALLBACK_ENVIRONMENT = 'dev';

const PAGE_CONSTANTS = {
  content_language: 'en',
  content_geo_region: 'national',
};

type DataLayerEntry = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

let started = false;

/**
 * Loads Google Tag Manager.
 */
export function initAnalytics() {
  globalThis.window.dataLayer = globalThis.window.dataLayer ?? [];
  push({ 'gtm.start': Date.now(), 'event': 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_KEY}`;
  document.head.append(script);
}

/**
 * Reports that a page is shown. Call it after the document title is updated.
 */
export function trackPage() {
  const page = {
    ...PAGE_CONSTANTS,
    page_name_language_neutral: document.title,
    page_url_language_neutral: location.href,
  };

  if (!started) {
    started = true;
    push({
      event: 'page_context',
      spa: 'true',
      ...page,
      source_code_version: version,
      environment: getEnvironment(),
      login_status: 'false',
      platform_name: 'ms_design_system',
      department_name: 'IT16.12',
      business_unit: 'IT',
      primary_segment: 'allgemein',
    });
    return;
  }

  push({
    event: 'page_change',
    ...page,
    virtual_pageview: 'true',
    virtual_page_name: document.title,
    virtual_url: location.href,
  });
}

function push(entry: DataLayerEntry) {
  globalThis.window.dataLayer?.push(entry);
}

function getEnvironment(): string {
  const match = ENVIRONMENTS.find(([, prefix]) => location.host.startsWith(prefix));
  return match ? match[0] : FALLBACK_ENVIRONMENT;
}

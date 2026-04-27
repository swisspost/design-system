import { IHeaderConfig, ICustomHeaderConfig, NavMainEntity, HeaderConfig } from './header.model';
import { Breadcrumbs } from './breadcrumbs.model';
import { FooterConfig } from './footer.model';

declare global {
  interface Window {
    OPPklpWidget: unknown;
    klpWidgetDev: unknown;
    jQuery: unknown;
    $: unknown;
    SockJS: unknown;
  }
}
export interface IPortalConfig {
  de?: ILocalizedConfig;
  fr?: ILocalizedConfig;
  it?: ILocalizedConfig;
  en?: ILocalizedConfig;
}

export interface ILocalizedConfig {
  header_new: HeaderConfig;
  header: IHeaderConfig;
  breadcrumbs: Breadcrumbs;
  footer?: FooterConfig;
}

export interface ICustomConfig {
  de?: ILocalizedCustomConfig;
  fr?: ILocalizedCustomConfig;
  it?: ILocalizedCustomConfig;
  en?: ILocalizedCustomConfig;
}

export interface ILocalizedCustomConfig {
  header?: ICustomHeaderConfig;
}

export type Environment = 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod';

export type ActiveRouteProp = 'auto' | 'exact' | 'none' | string;

export type LocalizedConfigParameters = {
  projectId: string;
  environment: Environment;
  language?: string;
  mapMyPost?: boolean;
  cookieKey?: string;
  localStorageKey?: string;
  activeRouteProp?: ActiveRouteProp;
  localizedCustomConfig?: ILocalizedCustomConfig;
  osFlyoutOverrides?: NavMainEntity;
};

export interface TagManagerDataLayer {
  push: (payload: {
    event: string | undefined;
    text: string | undefined;
    link_url: string | undefined;
    label: string | undefined;
    type: string | undefined;
  }) => void;
}

/**
 * Basic navigation link with a URL and accessible text.
 */
export interface Link extends AccessibleText {
  url: string; // Target URL of the link.
  active?: boolean; // Whether the link represents the current page.
}

/**
 * Accessible text information for any UI element.
 */
interface AccessibleText {
  text: string; // Base text content, can be visible or visually hidden.
  label?: string; // ARIA label, screen readers will use this instead of `text`.
  description?: string; // ARIA description for additional context, read after `text` or `label`.
}

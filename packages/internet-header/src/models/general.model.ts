import { HeaderConfig } from './header.model';
import { BreadcrumbsConfig } from './breadcrumbs.model';
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

export interface PortalConfig {
  de?: LocalizedConfig;
  fr?: LocalizedConfig;
  it?: LocalizedConfig;
  en?: LocalizedConfig;
}

export interface LocalizedConfig {
  header: HeaderConfig;
  breadcrumbs?: BreadcrumbsConfig;
  footer?: FooterConfig;
}

export interface LocalizedConfigParameters {
  projectId: string;
  environment: Environment;
  language?: string;
}

export type Environment = 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod';

export type ActiveRouteProp = 'auto' | 'exact' | 'none' | string;

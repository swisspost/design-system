import { IHeaderConfig, ICustomHeaderConfig, NavMainEntity } from './header.model';
import { IBreadcrumbConfig } from './breadcrumbs.model';
import { IFooterConfig, ICustomFooterConfig } from './footer.model';

declare global {
  interface Window {
    OPPklpWidget: any;
    klpWidgetDev: any;
    jQuery: any;
    $: any;
    SockJS: any;
  }
}
export interface IPortalConfig {
  de?: ILocalizedConfig;
  fr?: ILocalizedConfig;
  it?: ILocalizedConfig;
  en?: ILocalizedConfig;
}

export interface ILocalizedConfig {
  header: IHeaderConfig;
  breadcrumb: IBreadcrumbConfig;
  footer?: IFooterConfig;
}

export interface ICustomConfig {
  de?: ILocalizedCustomConfig;
  fr?: ILocalizedCustomConfig;
  it?: ILocalizedCustomConfig;
  en?: ILocalizedCustomConfig;
}

export interface ILocalizedCustomConfig {
  header: ICustomHeaderConfig;
  footer?: ICustomFooterConfig;
}

export type Environment = 'int01' | 'int02' | 'prod';

export type ActiveRouteProp = 'auto' | 'exact' | false | string;

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

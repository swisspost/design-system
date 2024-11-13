import { EventEmitter } from '@stencil/core';
import { AdditionalAttribute } from './breadcrumbs.model';
import { Environment } from './general.model';

export interface IHeaderConfig {
  asWebComponent: boolean;
  isHeaderResponsive: boolean;
  isLoginWidgetHidden: boolean;
  showJobsLoginWidget: boolean;
  icons: {
    backArrowIcon: IIconConfig;
    closeIcon: IIconConfig;
    downArrowIcon: IIconConfig;
    menuIcon: IIconConfig;
    rightArrowIcon: IIconConfig;
    searchIcon: IIconConfig;
    loginIcon: IIconConfig;
  };
  loginWidgetOptions?: ILoginWidgetOptions;
  loginWidgetId: string;
  logo: ILogoConfig;
  mobileMenu: {
    text: string;
  };
  search: ISearchConfig;
  onlineServiceId: string;
  navMain: NavMainEntity[];
  navMeta?: NavMetaEntity[];
  navLang: NavLangEntity[];
  translations: IHeaderTranslations;
}

export interface IIconConfig {
  name: string;
  classes?: string[];
  additionalAttributes?: AdditionalAttribute[];
}

export interface ILoginWidgetOptions {
  applicationId: string;
  serviceId: string;
  appLoginUrl: string;
  currentLang: string;
  environment?: Environment;
  options: {
    isDebugEnabled: boolean;
    logoutTargetURL: string;
  };
  platform: {
    endPoint: string;
    notificationsEndPoint: string;
    logoutURL: string;
    keepAliveURL: string;
    autoLoginURL: string;
  };
}

export interface ILogoConfig {
  logoLink: string;
  logoLinkTitle: string;
  logoSvg: string;
  logoText: string;
}

export interface ISearchConfig {
  isSearchHidden: boolean;
  searchPageUrl: string;
  redirectPattern: string;
  searchBoxSuggestionsThreshold: string;
  searchBoxSuggestionsAllNumber: string;
  searchBoxSuggestionsCoveoNumber: string;
  placesRedirectUrl: string;
  packageTrackingRedirectUrl: string;
  searchHubName: string;
  searchPipelineName: string;
  searchRecommendations: ISearchRecommendationContainer;
  isCustomSuggestionHidden?: boolean;
}

export interface ISearchRecommendationContainer {
  title: string;
  links: ISearchRecommendation[];
}

export interface ISearchRecommendation {
  href: string;
  inlineSvg: string;
  label: string;
  target: string;
  additionalAttributes: Array<{ name: string; value: string }>;
}

export interface NavMainEntity {
  id?: string;
  text: string;
  title: string;
  url: string;
  isActive?: boolean;
  isActiveOverride?: boolean;
  noFlyout?: boolean;
  flyout?: FlyoutEntity[];
}

export interface FlyoutEntity {
  title: string;
  linkList: LinkListEntity[];
}

export interface LinkListEntity {
  title: string;
  url: string;
  target?: string;
  isActive?: boolean;
  isActiveOverride?: boolean;
}

export interface NavMetaEntity {
  isActive: boolean;
  isHomeLink: boolean;
  target?: string;
  text: string;
  url: string;
}

export interface NavLangEntity {
  a11yLabel?: string;
  isCurrent: boolean;
  lang: string;
  text: string;
  title: string;
  url?: string;
}

export interface IHeaderTranslations {
  backButtonText: string;
  closeButtonText: string;
  homeLinkTitle: string;
  navLangAriaLabel: string;
  navMainAriaLabel: string;
  navMetaAriaLabel: string;
  searchAriaLabel: string;
  flyoutSearchBoxFloatingLabel: string;
  searchPlaceholder: string;
  searchSubmit: string;
  searchToggle: string;
  searchToggleExpanded: string;
  searchA11yLabelClosed: string;
  searchA11yLabelOpened: string;
  mobileNavToggleClose: string;
  mobileNavToggleOpen: string;
  nonResponsiveHeader: string;
  loginWidgetText?: string;
}

export interface IsFocusable {
  setFocus: () => void;
}

export type FocusableElement = HTMLElement & IsFocusable;

export interface IDropdownElement {
  toggleDropdown: (force?: boolean) => Promise<boolean>;
}

export interface HasDropdown extends IDropdownElement {
  dropdownToggled: EventEmitter<DropdownEvent>;
}

export type DropdownElement = HTMLElement & IDropdownElement;

export type DropdownEvent = { open: boolean; element: DropdownElement };

export interface ICustomHeaderConfig {
  navMain: NavMainEntity[];
}

export type MainNavScoreList = { main: NavMainEntity; sub?: LinkListEntity; score: number }[];

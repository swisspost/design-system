import { EventEmitter } from '@stencil/core';
import { AdditionalAttribute } from './breadcrumbs.model';
import { Environment } from './general.model';
import {
  AccessibleTextConfig,
  IconLinkConfig,
  ImageLinkConfig,
  LinkListConfig,
  SimpleLinkConfig,
} from './shared.model';

export interface HeaderConfig {
  /**
   * Organization-wide header, shared across all apps.
   */
  globalHeader: {
    postLogo: SimpleLinkConfig | ImageLinkConfig; // Link behind the Post logo.
    audience?: Array<SimpleLinkConfig>; // Optional audience selection links (e.g. "Private customers", "Business customers").
    primaryNavigation?: Array<IconLinkConfig>; // Primary navigation items: remain visible in the header on tablet and mobile.
    secondaryNavigation?: Array<IconLinkConfig>; // Secondary navigation items: move to the footer of the burger menu on tablet and mobile.
    languages?: Array<LanguageLinkConfig>; // Language menu options.
    login?: IconLinkConfig | UserMenuConfig; // Login link or authenticated user menu.
  };

  /**
   * Application-specific header.
   *
   * At least one of `title` or `mainNav` should be present.
   */
  localHeader: {
    title?: string; // Application or page title.
    mainNavigation?: Array<SimpleLinkConfig | MegadropdownConfig>; // Main navigation for the current application.
    navigation?: Array<IconLinkConfig | UserMenuConfig>; // Optional application-specific actions (e.g. user menu, extra links).
  };
}

/**
 * A navigation item that opens a large dropdown panel
 * with multiple grouped link sections.
 */
export interface MegadropdownConfig {
  trigger: AccessibleTextConfig; // Text used for the clickable trigger in the header.
  overview?: SimpleLinkConfig; // Optional overview link for the dropdown.
  sections: Array<LinkListConfig<SimpleLinkConfig>>; // Sections inside the dropdown.
}

/**
 * Menu displayed when a user is authenticated.
 */
export interface UserMenuConfig {
  user: UserConfig;
  options: Array<IconLinkConfig>; // Actions available to the user (e.g. "Profile", "Settings", "Logout").
}

/**
 * Logged-in user's profile information.
 */
export interface UserConfig {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

/**
 * Language option (for language menu).
 */
export interface LanguageLinkConfig extends SimpleLinkConfig {
  code: string; // Short language code (e.g. "en", "de", "fr").
}

/**
 * DEPRECATED
 */
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

export type MainNavScoreListItem = { main: NavMainEntity; sub?: LinkListEntity; score: number };
export type MainNavScoreList = MainNavScoreListItem[];

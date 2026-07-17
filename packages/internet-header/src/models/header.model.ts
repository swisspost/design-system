import { UserConfig } from '@/models/user.model';
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
    postLogin?: PostLoginConfig;
  };

  /**
   * Application-specific header.
   *
   * At least one of `title` or `mainNav` should be present.
   */
  localHeader: {
    title?: string; // Application or page title.
    mainNavigation?: MainNavigationConfig; // Main navigation for the current application.
    navigation?: Array<IconLinkConfig | UserMenuConfig>; // Optional application-specific actions (e.g. user menu, extra links).
  };
}

/**
 * Configuration for the post-login widget.
 */
export interface PostLoginConfig {
  loginLink: IconLinkConfig; // Login link when the user is not authenticated.
  accountSwitch: IconLinkConfig; // Shown when appropriate based on the user data.
  companySwitch: IconLinkConfig; // Shown when appropriate based on the user data.
  userProfile?: IconLinkConfig; // Link to the user's profile page.
  settings?: IconLinkConfig; // Link to account/app settings.
  userLinks?: Array<IconLinkConfig>; // Additional actions available when the user is authenticated.
  logoutLink: IconLinkConfig; // Logout link when the user is authenticated.
}

/**
 * Main navigation links and dropdowns displayed in the local header.
 */
export type MainNavigationConfig = Array<SimpleLinkConfig | MegadropdownConfig>;

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
  user: UserConfig; // Logged-in user's profile information.
  options: Array<IconLinkConfig>; // Actions available to the user (e.g. "Profile", "Settings", additional userLinks).
  accountSwitch?: IconLinkConfig; // Optional account switch link, shown before userLinks when the user has permission to switch accounts.
  companySwitch?: IconLinkConfig; // Optional company switch link, shown when the user has permission to switch companies.
  logoutLink?: IconLinkConfig; // Optional logout link.
}

/**
 * Language option (for language menu).
 */
export interface LanguageLinkConfig extends SimpleLinkConfig {
  code: string; // Short language code (e.g. "en", "de", "fr").
}
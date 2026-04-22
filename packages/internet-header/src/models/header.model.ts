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
    mainNavigation?: MainNavigationConfig; // Main navigation for the current application.
    navigation?: Array<IconLinkConfig | UserMenuConfig>; // Optional application-specific actions (e.g. user menu, extra links).
  };
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

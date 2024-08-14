/**
 * Questions:
 *
 * - How can icons be loaded/displayed efficiently (SSR)?
 * - How can the logo image be loaded/displayed efficiently?
 * - Does it make sense to handle skiplinks through the config?
 * - Not sure if user menu really is a generic array
 * - Does it make sense/is it possible to version the API?
 */

/**
 * Props coming from the <swisspost-internet-header> component
 *
 * - Project ID
 * - Environment
 * - Current language
 * - Currently selected main navigation entry
 */

/**
 * Configuration for the Header
 * Design: https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=aD9LT13cyCMwoTig-1
 */
interface Header {
  // See questions above, could also be a response header
  version: string;

  /**
   * A generic title for the whole header navigation
   * Example: "Navigieren auf post.ch"
   * Data owner: OD
   */
  title: AccessibleText;

  /**
   * Config for the global header section
   * - Should we flatten this?
   */
  globalNavigation: {
    /**
     * The company logo
     * Data owner: Company
     */
    logoLink: HyperLink;

    /**
     * For switching between different contexts
     * Private Customers | Business Customers | Government Customers
     * Data owner: Company
     */
    businessDomains?: StatefulHyperLink[]; //

    /**
     * Generic links like Jobs | About
     * Data owner: Company
     */
    metaNavigation?: StatefulHyperLink[]; //

    /**
     * Optional language switch (optional only if the page is not offered in multiple languages)
     * Data owner: OD
     */
    languages?: {
      changeLanguageButton: Button; // Text: 'DE', Label: 'Sprache wechseln', Description: 'Aktuelle Sprache ist Detusch'
      availableLanguages: LanguageOption[];
    };

    /**
     * Optional coveo search
     * Data owner: Portal
     */
    search?: {
      searchToggleButton: Button; // "Suche" | "Suche öffnen", opens or closes the search overlay
      searchButton: Button; // Label: "Suche starten", starts a search
      closeButton: Button; // Label: "Suche schliessen", The X, closes the search overlay
      clearSearchButton: Button; // The button that clears the current search term
      trackAndTrace: {
        redirectPattern: string; // Regex for parcel numbers
        redirectUrl: string;
        weight: SuggestionWeight; // How many suggestions are displayed when there are multiple results
      };
      places: {
        redirectUrl: string;
        weight: SuggestionWeight;
      };
      coveo: {
        redirectUrl: string;
        searchHub: string;
        pipeline: string;
        weight: SuggestionWeight;
        suggestionUrl: string;
        environment: CoveoEnvironment;
      };
      suggestions: {
        title: string;
        charThreshold: number; // Currently hard-coded to 2, minimum amount of chars before suggestions are starting to be fetched
        maxSuggestions: number; // Currently hard-coded to 8
        initialSuggestions?: LinkWithIcon[];
      };
    };

    /**
     * Optional KLP login
     * Data owner: OD, Portal
     * - Login and logout url need to be configurable per OD
     * - User infos come from n.account.post.ch
     */
    KLP?: {
      loginLink: HyperLink;
      messagesAvailableText: AccessibleText; // "Neue Nachrichten verfügbar", description for the little red dot signaling that new messages arrived
      openUserMenuButton: Button; // "Benutzermenu öffnen", Button for opening user menu when logged in
      closeUserMenuButton: Button; // "Benutzermenu schliessen", X Button for closing user menu
      userMenu: LinkWithIcon[]; // List of links with icons, My profile, messages, settings, change account, logout
      notificationsEndpoint: string;

      // Not sure how they are used within the widget
      keepAliveURL: string;
      autoLoginURL: string;
      endpoint: string;
    };
  };

  /**
   * Navigation for content (external) pages
   * Data owner: OD
   */
  contentNavigation?: {
    menuButton: Button; // "Menü", displayed on mobile
    pageTitle?: AccessibleText;
    navigationTitle: AccessibleText; // "Hauptnavigation", accessible name for the navigation
    linkList: Array<MainNavigationEntry | HyperLink>; // Either a link or a megadropdown
  };

  /**
   * Side navigation for applicatorical pages
   * Data owner: OD
   */
  applicationNavigation?: {
    menuButton: Button; // "Menü"
    navigationTitle: AccessibleText; // "Hauptnavigation", accessible name for the navigation
    applicationTitle?: AccessibleText;
    linkList: Array<LinkList | HyperLink>; // No megadropdown possible, just a simple link list or a link
  };
}

/**
 * Configuration for the footer
 * Design: https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7013&t=aD9LT13cyCMwoTig-1
 */
interface Footer {
  title: AccessibleText;

  /**
   * Custom footer links
   * Data owner: OD
   */
  directEntryLinks?: LinkList;

  /**
   * Links about the company
   * Data owner: OD, Company
   */
  aboutLinks: LinkList;

  /**
   * Getting help
   * Data owner: OD, Company
   */
  helpAndContactLinks: LinkList;

  /**
   * Customizable links
   * Data owner: OD
   */
  serviceLinks?: LinkList;

  /**
   * List of available social media channels
   * Data owner: OD
   */
  socialLinks?: LinkList<LinkWithIcon>;

  /**
   * List of stores where [app] is available
   * Data owner: OD
   */
  appStoreLinks?: LinkList<LinkWithIcon>;

  /**
   * List of companies
   * Data owner: Company
   */
  companyLinks: LinkList;

  /**
   * List of meta footer links for compliance, terms, etc.
   * Data owner: Company
   */
  complianceLinks: LinkList;

  /**
   * The copyright notice
   * Data owner: Company
   */
  copyright: string;
}

// ========================================================== Shared interfaces & types ========================================================== //

/**
 * String with optional possibilities for alternative screen reader text and additional description
 */
interface AccessibleText {
  text: string; // What's displayed on screen
  label?: string; // aria-label, replaces text for screenreaders
  description?: string; // aria-description, being read after text or label
  // title?: string; // Intended to be displayed as tooltip, acts like description for screenreaders
}

/**
 * Link with optional attributes for Google Analytics tracking
 */
interface HyperLink extends AccessibleText {
  href: string;
  attributes?: AnalyticsAttribute[];
}

/**
 * Button with optional attributes for Google Analytics tracking
 */
interface Button extends AccessibleText {
  attributes?: AnalyticsAttribute[];
}

/**
 * A link that can be active (active menu item)
 */
interface StatefulHyperLink extends HyperLink {
  active: boolean;
}

/**
 * An option for the language switch
 */
interface LanguageOption extends StatefulHyperLink {
  label: string; // Label is not optional for languages
  languageShortCode: string; // ISO 639 2 char short code https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
}

/**
 * Attributes used by Google Analytics to collect accurate data
 */
interface AnalyticsAttribute {
  name: string;
  value: string;
}

type SuggestionWeight = number; // 0 = Not weighted, will always be displayed, 1 = basic weight, 2 = double weighted, 3 triple weighted, ...

interface CoveoEnvironment {
  organisation: string;
  token: string;
}

interface Icon {
  inlineSvg: string;
}

type LinkWithIcon = HyperLink & Icon;

/**
 * Extends accessible text because entries with megadropdown can't be links themselves
 */
interface MainNavigationEntry {
  title: AccessibleText;
  flyout: LinkList[];
}

interface LinkList<T = HyperLink> {
  title: AccessibleText;
  linkList: T[];
}

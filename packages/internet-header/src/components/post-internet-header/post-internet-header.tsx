import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { debounce, throttle } from 'throttle-debounce';
import {
  getLocalizedConfig,
  getLocalizedCustomConfig,
  isValidProjectId,
} from '../../services/config.service';
import { dispose, state } from '../../data/store';
import { DropdownElement, DropdownEvent, NavMainEntity } from '../../models/header.model';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';
import { StickynessOptions } from '../../models/implementor.model';
import { ActiveRouteProp, Environment, ICustomConfig } from '../../models/general.model';
import { IAvailableLanguage } from '../../models/language.model';
import { getUserLang, translate } from '../../services/language.service';
import { If } from '../../utils/if.component';
import packageJson from '../../../package.json';
import { registerLogoAnimationObserver } from './logo-animation/logo-animation';
import { getScrollParent } from '../../utils/scrollparent';
import { getLogoScale } from './logo-animation/logo-scale';

@Component({
  tag: 'swisspost-internet-header',
  styleUrl: 'post-internet-header.scss',
  shadow: true,
})
export class PostInternetHeader {
  /**
   * Your project id, previously passed as query string parameter serviceId.
   */
  @Prop() project: string;

  /**
   * Sticky behaviour of the header.
   */
  @Prop() stickyness: StickynessOptions = 'minimal';

  /**
   * Initial language to be used. Overrides automatic language detection.
   */
  @Prop() language?: 'de' | 'fr' | 'it' | 'en';

  /**
   * Toggle the meta navigation.
   */
  @Prop() meta: boolean = true; // eslint-disable-line @stencil-community/ban-default-true

  /**
   * Toggle the login link (when logged out) or the user widget (when logged in).
   */
  @Prop() login: boolean = true; // eslint-disable-line @stencil-community/ban-default-true

  /**
   * Toggle the search button.
   */
  @Prop() search: boolean = true; // eslint-disable-line @stencil-community/ban-default-true

  /**
   * Toggle skiplinks. They help keyboard users to quickly jump to important sections of the page.
   */
  @Prop() skiplinks: boolean = true; // eslint-disable-line @stencil-community/ban-default-true

  /**
   * DEPRECATED!: Define a proxy URL for the config fetch request. Will be removed in the next major version
   */
  @Prop() configProxy?: string;

  /**
   * Target environment. Choose 'int01' for local testing.
   */
  @Prop() environment: Environment = 'prod';

  /**
   * Override the language switch links with custom URLs. Helpful when your application contains sub-pages, and you
   * would like to stay on subpages when the user changes language.
   */
  @Prop() languageSwitchOverrides?: string | IAvailableLanguage[];

  /**
   * Customize the header config loaded from the post portal.
   */
  @Prop() customConfig?: string | ICustomConfig;

  /**
   * The header uses this cookie to set the language. Disables automatic language detection.
   */
  @Prop() languageCookieKey?: string;

  /**
   * The header uses this local storage key to set the language. Disables automatic language selection.
   */
  @Prop() languageLocalStorageKey?: string = 'swisspost-internet-header-language';

  /**
   * Override the logout-url provided by the portal config.
   */
  @Prop() logoutUrl?: string;

  /**
   * Set the currently activated route. If there is a link matching this URL in the header, it will be highlighted.
   * Will also highlight partly matching URLs. When set to auto, will use current location.href for comparison.
   */
  @Prop() activeRoute?: 'auto' | false | string = 'auto';

  /**
   * Online Services only: Add custom links to the special online service navigation entry
   */
  @Prop() osFlyoutOverrides?: string | NavMainEntity;

  /**
   * Displays the header at full width for full-screen applications
   */
  @Prop() fullWidth?: boolean = false;

  /**
   * Fires when the header has been rendered to the page.
   */
  @Event() headerLoaded: EventEmitter<void>;

  @State() activeFlyout: string | null = null;
  @State() activeDropdownElement: DropdownElement | null = null;
  @State() isMainSlotEmpty = true;
  @Element() host: HTMLSwisspostInternetHeaderElement;

  /**
   * Get the currently set language as a two letter string ("de", "fr" "it" or "en")
   * @returns string
   */
  @Method()
  async getCurrentLanguage(): Promise<'de' | 'fr' | 'it' | 'en' | string> {
    return state.currentLanguage ?? 'de';
  }

  private mainNav?: HTMLPostMainNavigationElement;
  private metaNav?: HTMLPostMetaNavigationElement;
  private lastScrollTop = window.scrollY || document.documentElement.scrollTop;
  private throttledScroll: throttle<() => void>;
  private debouncedResize: debounce<() => void>;
  private lastWindowWidth: number = window.innerWidth;
  private updateLogoAnimation: () => void;
  private scrollParent: Element | Document;

  constructor() {
    if (this.project === undefined || this.project === '' || !isValidProjectId(this.project)) {
      throw new Error(
        `Internet Header project key is "${this.project}". Please provide a valid project key.`,
      );
    }
  }

  connectedCallback() {
    this.throttledScroll = throttle(300, () => this.handleScrollEvent());
    this.debouncedResize = debounce(200, () => this.handleResize());
  }

  disconnectedCallback() {
    this.scrollParent.removeEventListener('scroll', this.throttledScroll);
    this.scrollParent.removeEventListener('resize', this.debouncedResize);

    // Reset the store to its original state
    dispose();
  }

  async componentWillLoad() {
    this.scrollParent = getScrollParent(this.host);
    this.scrollParent.addEventListener('scroll', this.throttledScroll, { passive: true });
    this.scrollParent.addEventListener('resize', this.debouncedResize, { passive: true });

    // Wait for the config to arrive, then render the header
    try {
      state.projectId = this.project;
      state.stickyness = this.stickyness;
      state.environment = this.environment.toLocaleLowerCase() as Environment;
      if (this.language !== undefined) state.currentLanguage = this.language;
      state.languageSwitchOverrides =
        typeof this.languageSwitchOverrides === 'string'
          ? JSON.parse(this.languageSwitchOverrides)
          : this.languageSwitchOverrides;
      state.osFlyoutOverrides =
        typeof this.osFlyoutOverrides === 'string'
          ? JSON.parse(this.osFlyoutOverrides)
          : this.osFlyoutOverrides;

      if (this.customConfig !== undefined) {
        const langs = Object.keys(
          typeof this.customConfig === 'string' ? JSON.parse(this.customConfig) : this.customConfig,
        );
        const lang = state.currentLanguage || getUserLang(langs, this.language);
        state.localizedCustomConfig = getLocalizedCustomConfig(this.customConfig, lang);
      }

      state.localizedConfig = await getLocalizedConfig({
        projectId: this.project,
        environment: state.environment,
        language: this.language,
        cookieKey: this.languageCookieKey,
        localStorageKey: this.languageLocalStorageKey,
        activeRouteProp: this.activeRoute,
        localizedCustomConfig: state.localizedCustomConfig,
        osFlyoutOverrides: state.osFlyoutOverrides,
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.handleResize();
      this.headerLoaded.emit();
      this.host.classList.add('header-loaded');
      if (this.meta && this.metaNav) {
        this.updateLogoAnimation = registerLogoAnimationObserver(this.metaNav, this.host);
      } else {
        // Set height to 0 if meta is never visible and global variables are defined
        const rootStyles = window.getComputedStyle(document.documentElement);
        if (rootStyles.getPropertyValue('--post-meta-header-height') !== '') {
          document.documentElement.style.setProperty('--post-meta-header-height', '0px');
        }
      }
    });

    if (this.stickyness === 'full')
      console.warn('Internet Header: The stickyness="full" option is deprecated.');
  }

  @Watch('language')
  async handleLanguageChange(newValue: string) {
    state.currentLanguage = newValue;
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: newValue,
      cookieKey: this.languageCookieKey,
      localStorageKey: this.languageLocalStorageKey,
      activeRouteProp: this.activeRoute,
      localizedCustomConfig: state.localizedCustomConfig,
      osFlyoutOverrides: state.osFlyoutOverrides,
    });
    if (this.customConfig !== undefined)
      state.localizedCustomConfig = getLocalizedCustomConfig(this.customConfig, newValue);
  }

  @Watch('languageSwitchOverrides')
  handleAvailableLanguagesChange(newValue: string | IAvailableLanguage[]) {
    state.languageSwitchOverrides = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
  }

  @Watch('osFlyoutOverrides')
  async handleOsFlyoutOverrides(newValue: string | NavMainEntity) {
    state.osFlyoutOverrides = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: this.language,
      cookieKey: this.languageCookieKey,
      localStorageKey: this.languageLocalStorageKey,
      activeRouteProp: this.activeRoute,
      localizedCustomConfig: state.localizedCustomConfig,
      osFlyoutOverrides: state.osFlyoutOverrides,
    });
  }

  @Watch('activeRoute')
  async handleActiveRouteChange(newValue: string | ActiveRouteProp) {
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: this.language,
      cookieKey: this.languageCookieKey,
      localStorageKey: this.languageLocalStorageKey,
      activeRouteProp: newValue,
      localizedCustomConfig: state.localizedCustomConfig,
      osFlyoutOverrides: state.osFlyoutOverrides,
    });
  }

  @Watch('customConfig')
  async handleCustomConfigChange(newValue: string | ICustomConfig) {
    if (this.language === undefined) return;
    const localizedCustomConfig = getLocalizedCustomConfig(newValue, this.language);
    state.localizedCustomConfig = localizedCustomConfig;
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: this.language,
      cookieKey: this.languageCookieKey,
      localStorageKey: this.languageLocalStorageKey,
      activeRouteProp: this.activeRoute,
      localizedCustomConfig: localizedCustomConfig,
      osFlyoutOverrides: state.osFlyoutOverrides,
    });
  }

  @Watch('search')
  handleSearchChange(newValue: boolean) {
    state.search = newValue;
  }

  @Watch('login')
  handleLoginChange(newValue: boolean) {
    state.login = newValue;
  }

  @Watch('meta')
  handleMetaChange(newValue: boolean) {
    state.meta = newValue;
  }

  @Listen('languageChanged')
  handleLanguageChangeEvent(event: CustomEvent<string>) {
    void this.handleLanguageChange(event.detail);
  }

  @Watch('stickyness')
  handleStickynessChange(newValue: StickynessOptions) {
    state.stickyness = newValue;
    if (typeof this.updateLogoAnimation === 'function') this.updateLogoAnimation();
  }

  private handleClickOutsideBound = this.handleClickOutside.bind(this);

  private handleClickOutside(event: Event) {
    // Close active dropdown element on click outside of it
    if (this.activeDropdownElement && !event.composedPath().includes(this.activeDropdownElement)) {
      void this.activeDropdownElement.toggleDropdown(false);
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.activeDropdownElement) {
        void this.activeDropdownElement.toggleDropdown(false);
      }
      if (this.activeFlyout !== null && this.mainNav) {
        void this.mainNav.toggleDropdown(false);
      }
    }
  }

  private handleScrollEvent() {
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    const st =
      this.scrollParent instanceof Document
        ? this.scrollParent.documentElement.scrollTop
        : this.scrollParent.scrollTop;

    // Toggle class without re-rendering the component if stickyness is minimal
    // the other stickyness modes do not need the class
    if (this.stickyness === 'minimal') {
      this.host.classList.toggle('scrolling-up', st <= this.lastScrollTop);
    }

    // For Mobile or negative scrolling
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  private handleResize() {
    // Close main navigation dropdown if size changed to bigger than 1024px (search dropdown will be kept open)
    if (this.isMainNavOpen() && this.lastWindowWidth < 1024 && window.innerWidth >= 1024) {
      this.activeDropdownElement?.toggleDropdown(false);
    }

    this.lastWindowWidth = window.innerWidth;
  }

  /**
   * Close open dropdown menus if another is being opened
   *
   * @param event Dropdown toggled event
   * @returns void
   */
  private handleDropdownToggled(event: CustomEvent<DropdownEvent>) {
    if (!event.detail.open && this.activeDropdownElement !== event.detail.element) {
      // Some dropdown got closed programmatically (possibly by this function). To prevent
      // a circle or an outdated state, we'll not handle this event
      return;
    }

    if (event.detail.open) {
      if (this.activeDropdownElement) {
        void this.activeDropdownElement.toggleDropdown(false);
      }

      this.activeDropdownElement = event.detail.element;

      if (window.innerWidth >= 1024) {
        // Add event listener to close active dropdown element on click outside of it
        // Also adds 10ms delay in case of an external interaction:
        //    Some button on the page calls toggleDropdown() -> dropdown opens
        //    Click event bubbles to the window, this.handleClickOutsideBound closes dropdown again
        window.setTimeout(() => {
          window.addEventListener('click', this.handleClickOutsideBound);
        }, 10);
      }

      if (this.activeFlyout !== null && this.mainNav) {
        void this.mainNav.setActiveFlyout(null);
      }
    } else {
      this.activeDropdownElement = null;

      // Remove event listener as it is not needed if no dropdown element is active
      window.removeEventListener('click', this.handleClickOutsideBound);
    }
  }

  /**
   * Close open dropdowns if the flyout is being opened
   * @param event Flyout toggle event
   */
  private handleFlyoutToggled(event: CustomEvent<string | null>) {
    this.activeFlyout = event.detail;

    if (this.activeDropdownElement && event.detail !== null && !this.isMainNavOpen()) {
      void this.activeDropdownElement.toggleDropdown(false);
    }
  }

  private toggleMobileDropdown() {
    this.mainNav?.toggleDropdown();
  }

  private isMainNavOpen() {
    return (
      this.activeDropdownElement && this.activeDropdownElement.tagName === 'POST-MAIN-NAVIGATION'
    );
  }

  private handleMainSlotChange(e: Event) {
    const mainSlot = e.target as HTMLSlotElement;
    this.isMainSlotEmpty = mainSlot.assignedElements().length === 0;
  }

  render() {
    if (!state.localizedConfig?.header) {
      console.error(new Error('Internet Header: Config cannot be loaded'));
      return;
    }

    const config = state.localizedConfig;
    const renderMetaNavigation =
      this.meta &&
      config.header.navMeta !== undefined &&
      config.header.navMeta?.filter(meta => !meta.isHomeLink).length > 0;
    const renderLogin =
      (this.login ?? !config.header.isLoginWidgetHidden) && config.header.loginWidgetOptions;
    const renderLanguageSwitch = config.header.navLang.length > 1;

    const initialLogoScale = renderMetaNavigation ? getLogoScale(this.host) : '1';

    return (
      <Host
        class={`stickyness-${this.stickyness} ${
          Boolean(this.activeDropdownElement) || Boolean(this.activeFlyout) ? 'dropdown-open' : ''
        }`}
        data-version={packageJson.version}
        onKeyup={(e: KeyboardEvent) => this.handleKeyUp(e)}
        style={{ '--logo-scale': initialLogoScale }}
      >
        <header class={`post-internet-header${this.fullWidth ? ' full-width' : ''}`}>
          <SvgSprite />
          <h1 class="visually-hidden">{translate('Navigate on post.ch')}</h1>
          <If condition={this.skiplinks}>
            <post-skiplinks></post-skiplinks>
          </If>
          <If condition={renderMetaNavigation}>
            <post-meta-navigation
              orientation="horizontal"
              class="hidden-lg"
              full-width={this.fullWidth}
              ref={el => (this.metaNav = el)}
            >
              <If condition={renderLanguageSwitch}>
                <post-language-switch
                  id="post-language-switch-desktop"
                  mode="dropdown"
                  onDropdownToggled={e => this.handleDropdownToggled(e)}
                ></post-language-switch>
              </If>
            </post-meta-navigation>
          </If>
          <div class="main-navigation-container wide-container">
            <post-header-logo></post-header-logo>
            <button
              class="menu-button nav-link"
              onClick={() => this.toggleMobileDropdown()}
              aria-haspopup="menu"
              aria-controls="post-internet-header-main-navigation"
              aria-expanded={this.activeDropdownElement ? 'true' : 'false'}
            >
              <span class="menu-button-text visually-hidden">{config.header.mobileMenu.text}</span>
              <SvgIcon name={this.isMainNavOpen() ? 'pi-close' : 'pi-menu'}></SvgIcon>
            </button>
            <post-main-navigation
              onDropdownToggled={e => this.handleDropdownToggled(e)}
              onFlyoutToggled={e => this.handleFlyoutToggled(e)}
              ref={el => (this.mainNav = el)}
            >
              <If condition={renderMetaNavigation}>
                <post-meta-navigation orientation="vertical">
                  <If condition={renderLanguageSwitch}>
                    <post-language-switch
                      id="post-language-switch-mobile"
                      mode="list"
                    ></post-language-switch>
                  </If>
                </post-meta-navigation>
              </If>
            </post-main-navigation>
            <div class="main-navigation-controls">
              <div class={`main-navigation-custom-content${this.isMainSlotEmpty ? ' d-none' : ''}`}>
                <slot name="main" onSlotchange={e => this.handleMainSlotChange(e)}></slot>
              </div>
              <If condition={this.search}>
                <post-search onDropdownToggled={e => this.handleDropdownToggled(e)}></post-search>
              </If>
              <If condition={!!renderLogin}>
                <post-klp-login-widget logout-url={this.logoutUrl}>
                  <slot name="login-widget"></slot>
                </post-klp-login-widget>
              </If>
              <If condition={!renderMetaNavigation && renderLanguageSwitch}>
                <post-language-switch
                  id="post-language-switch-no-meta"
                  onDropdownToggled={e => this.handleDropdownToggled(e)}
                  mode="dropdown"
                ></post-language-switch>
              </If>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}

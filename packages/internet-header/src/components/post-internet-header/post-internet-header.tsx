import { Link, LinkProps, MegaDropdown, UserMenu } from '@/components/internal';
import { dispose, state } from '@/data/store';
import { ActiveRouteProp, Environment } from '@/models/general.model';
import { PostLoginConfig, UserMenuConfig } from '@/models/header.model';
import { IconLinkConfig, LinkConfig } from '@/models/shared.model';
import { getAlternateLinks, observeAlternateLinks } from '@/services/alternate-link.service';
import { getLocalizedConfig, isValidProjectId } from '@/services/config.service';
import { getActiveLink } from '@/services/route.service';
import { changeContextTargetURL } from '@/utils/change-context-target-url';
import { version } from '@root/package.json';
import { Component, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';
import '@swisspost/design-system-components';

@Component({
  tag: 'swisspost-internet-header',
  shadow: false,
})
export class PostInternetHeader {
  private alternateLinksObserver?: MutationObserver;

  /**
   * Set the currently activated route. If there is a link matching this URL in the header, it will be highlighted.
   * Will also highlight partly matching URLs. When set to auto, will use current location.href for comparison.
   */
  @Prop() activeRoute: ActiveRouteProp = 'auto';

  @Watch('activeRoute')
  handleActiveRouteChange() {
    this.updateActiveUrl();
  }

  /**
   * Target environment. Choose 'int01' for local testing.
   */
  @Prop() environment: Environment = 'prod';

  /**
   * Makes the header content span the full width on screens larger than 1440px.
   */
  @Prop() fullWidth = false;

  /**
   * Initial language to be used. Overrides automatic language detection.
   */
  @Prop() language?: 'de' | 'fr' | 'it' | 'en';

  @Watch('language')
  async handleLanguageChange(newValue: string) {
    try {
      // Pass newValue explicitly — it wins first priority in getUserLang's chain
      await this.updateConfig(newValue);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Your project id, previously passed as query string parameter serviceId.
   */
  @Prop() project!: string;

  /**
   * Visually hidden label for the back button.
   */
  @Prop({ reflect: true }) readonly textBack!: string;

  /**
   * Visually hidden label for the language menu.
   */
  @Prop({ reflect: true }) readonly textChangeLanguage!: string;

  /**
   * Visually hidden label for the close button.
   */
  @Prop({ reflect: true }) readonly textClose!: string;

  /**
   * Visually hidden label for the current language.
   * The placeholder `{name}` will be replaced with the name of the currently selected language.
   */
  @Prop({ reflect: true }) readonly textCurrentLanguage!: string;

  /**
   * Visually hidden label for the current user.
   * The placeholder `{user}` will be replaced with the full name of the currently logged-in user.
   */
  @Prop({ reflect: true }) readonly textCurrentUser!: string;

  /**
   * Visually hidden label for the main navigation element.
   */
  @Prop({ reflect: true }) readonly textMain!: string;

  /**
   * Visually hidden label for the burger menu button.
   */
  @Prop({ reflect: true }) readonly textMenu!: string;

  /**
   * Visually hidden label for the login widget trigger button.
   */
  @Prop({ reflect: true }) readonly textAccessUserLinks!: string;

  /**
   * Visually hidden label for the user menu.
   */
  @Prop({ reflect: true }) readonly textUserLinks!: string;

  /**
   * Fires when the header has been rendered to the page.
   */
  @Event() headerLoaded: EventEmitter<void>;

  constructor() {
    if (this.project === undefined || this.project === '' || !isValidProjectId(this.project)) {
      throw new Error(
        `Internet Header project key is "${this.project}". Please provide a valid project key.`,
      );
    }
  }

  connectedCallback() {
    this.observeAlternateLinks();
  }

  async componentWillLoad() {
    this.initAlternateLinks();
    await this.fetchHeaderConfig();
  }

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.headerLoaded.emit();
    });
  }

  disconnectedCallback() {
    this.alternateLinksObserver?.disconnect();

    // Reset the store to its original state
    dispose();
  }

  @Listen('postChange')
  handleLanguageChangeEvent(event: CustomEvent<string>) {
    if (
      event.target instanceof HTMLElement &&
      event.target.localName === 'post-language-menu-item' &&
      event.detail !== this.language
    ) {
      void this.handleLanguageChange(event.detail);
    }
  }

  private async fetchHeaderConfig() {
    // Wait for the config to arrive, then render the header
    try {
      state.projectId = this.project;
      state.environment = this.environment.toLocaleLowerCase() as Environment;
      if (this.language !== undefined) state.currentLanguage = this.language;

      await this.updateConfig();
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch and store the localized config, defaulting to the `language` prop if none is passed
  private async updateConfig(language?: string) {
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: language ?? this.language,
    });

    this.updateActiveUrl();
  }

  private initAlternateLinks() {
    state.alternateLinks = getAlternateLinks();
  }

  private observeAlternateLinks() {
    // Watch for dynamic changes (SPA route changes, late inserts)
    this.alternateLinksObserver = observeAlternateLinks(updated => {
      state.alternateLinks = updated;
    });
  }

  private updateActiveUrl() {
    state.activeLink = getActiveLink(this.activeRoute);
  }

  private getUserMenuOptions(postLogin: PostLoginConfig): Array<IconLinkConfig> {
    return [
      ...(postLogin.userProfile ? [postLogin.userProfile] : []),
      ...(postLogin.settings ? [postLogin.settings] : []),
      ...(postLogin.userLinks ?? []),
    ];
  }

  /**
   * Get the language switch URL for a given language code.
   * Alternate links from <head> take priority over config-provided URLs.
   */
  private getLanguageUrl(code: string, configUrl: string): string {
    return state.alternateLinks.get(code.toLowerCase()) ?? configUrl;
  }

  private renderNavItem(config: LinkConfig | UserMenuConfig, props: LinkProps = {}): string {
    if ('url' in config) {
      return <Link {...props} config={config} />;
    }

    return (
      <UserMenu
        slot={props.slot}
        config={config}
        textCurrentUser={this.textCurrentUser}
        textAccessUserLinks={this.textAccessUserLinks}
        textUserLinks={this.textUserLinks}
      />
    );
  }

  private renderMenuItem(config: IconLinkConfig, slot: string) {
    return (
      <post-menu-item slot={slot} key={`${slot}-${config.url}`}>
        <Link config={config} />
      </post-menu-item>
    );
  }

  private renderLoginWidget(postLogin: PostLoginConfig) {
    // Everything is slotted unconditionally: the widget owns the session and decides which of
    // these entries it may show.
    return (
      <post-klp-login-widget
        slot="post-login"
        environment={this.environment}
        project={this.project}
        language={this.language}
        textCurrentUser={this.textCurrentUser}
        textUserLinks={this.textUserLinks}
        textAccessUserLinks={this.textAccessUserLinks}
      >
        <Link slot="login-link" config={postLogin.loginLink} />
        {postLogin.accountSwitch &&
          this.renderMenuItem(
            {
              ...postLogin.accountSwitch,
              url: changeContextTargetURL(postLogin.accountSwitch.url),
            },
            'account-switch',
          )}
        {postLogin.companySwitch &&
          this.renderMenuItem(
            {
              ...postLogin.companySwitch,
              url: changeContextTargetURL(postLogin.companySwitch.url),
            },
            'company-switch',
          )}
        {this.getUserMenuOptions(postLogin).map(option =>
          this.renderMenuItem(option, 'menu-links'),
        )}
        {postLogin.logoutLink && this.renderMenuItem(postLogin.logoutLink, 'logout-link')}
      </post-klp-login-widget>
    );
  }

  private renderNavigation(
    slot: string,
    config: (LinkConfig | UserMenuConfig)[],
    props: LinkProps = {},
  ) {
    if (config.length === 0) return null;

    if (config.length === 1) {
      return this.renderNavItem(config[0], { ...props, slot });
    }

    return (
      <ul slot={slot}>
        {config.map(navItem => (
          <li key={'url' in navItem ? navItem.url : navItem.user.email}>
            {this.renderNavItem(navItem, props)}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    if (!state.localizedConfig?.header) {
      console.error(new Error('Internet Header: Config cannot be loaded'));
      return;
    }

    const { globalHeader, localHeader } = state.localizedConfig.header;

    return (
      <Host data-version={version}>
        <post-header textMenu={this.textMenu}>
          {'image' in globalHeader.postLogo ? (
            <Link slot="post-logo" config={globalHeader.postLogo} />
          ) : (
            <post-logo
              slot="post-logo"
              url={globalHeader.postLogo.url}
              aria-label={globalHeader.postLogo.label}
              aria-description={globalHeader.postLogo.description}
            >
              {globalHeader.postLogo.text}
            </post-logo>
          )}

          {globalHeader.audience &&
            this.renderNavigation('audience', globalHeader.audience, {
              ariaCurrentWhenActive: 'location',
            })}

          {globalHeader.primaryNavigation &&
            this.renderNavigation('global-nav-primary', globalHeader.primaryNavigation)}

          {globalHeader.secondaryNavigation &&
            this.renderNavigation('global-nav-secondary', globalHeader.secondaryNavigation, {
              ariaCurrentWhenActive: 'location',
            })}

          {globalHeader.languages && globalHeader.languages.length > 0 && (
            <post-language-menu
              slot="language-menu"
              textChangeLanguage={this.textChangeLanguage}
              textCurrentLanguage={this.textCurrentLanguage}
            >
              {globalHeader.languages.map(lang => (
                <post-language-menu-item
                  key={lang.code}
                  url={this.getLanguageUrl(lang.code, lang.url)}
                  active={lang.active}
                  code={lang.code}
                  name={lang.label}
                  description={lang.description}
                >
                  {lang.text}
                </post-language-menu-item>
              ))}
            </post-language-menu>
          )}

          {globalHeader.postLogin && this.renderLoginWidget(globalHeader.postLogin)}

          {localHeader.title && <p slot="title">{localHeader.title}</p>}

          {localHeader.navigation && this.renderNavigation('local-nav', localHeader.navigation)}

          {localHeader.mainNavigation && localHeader.mainNavigation.length > 0 && (
            <post-mainnavigation slot="main-nav" textMain={this.textMain}>
              <ul>
                {localHeader.mainNavigation.map(navItem => (
                  <li key={'url' in navItem ? navItem.url : navItem.trigger.text}>
                    {'url' in navItem ? (
                      <Link config={navItem} ariaCurrentWhenActive="page" />
                    ) : (
                      <MegaDropdown
                        config={navItem}
                        textBack={this.textBack}
                        textClose={this.textClose}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </post-mainnavigation>
          )}
        </post-header>
      </Host>
    );
  }
}

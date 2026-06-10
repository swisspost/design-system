import { Link, LinkProps, MegaDropdown, UserMenu } from '@/components/internal';
import { dispose, state } from '@/data/store';
import { ActiveRouteProp, Environment } from '@/models/general.model';
import { UserMenuConfig } from '@/models/header.model';
import { LinkConfig } from '@/models/shared.model';
import { getLocalizedConfig, isValidProjectId } from '@/services/config.service';
import { getActiveLink } from '@/services/route.service';
import { version } from '@root/package.json';
import { Component, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';
import '@swisspost/design-system-components';

@Component({
  tag: 'swisspost-internet-header',
  styleUrl: 'post-internet-header.scss',
  shadow: false,
})
export class PostInternetHeader {
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
    state.currentLanguage = newValue;
    await this.updateConfig();
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
   */
  @Prop({ reflect: true }) readonly textCurrentLanguage!: string;

  /**
   * Visually hidden label for the current user.
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
  @Prop({ reflect: true }) readonly textUserMenuTrigger!: string;

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

  async componentWillLoad() {
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

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.headerLoaded.emit();
    });
  }

  disconnectedCallback() {
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

  private async updateConfig() {
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: this.language,
    });

    this.updateActiveUrl();
  }

  private updateActiveUrl() {
    state.activeLink = getActiveLink(this.activeRoute);
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
        textUserLinks={this.textUserLinks}
      />
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
          <li>{this.renderNavItem(navItem, props)}</li>
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
                  url={lang.url}
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

          {globalHeader.login && (
            <post-login-widget
              textCurrentUser={this.textCurrentUser}
              textUserMenu={this.textUserLinks}
              textUserMenuTrigger={this.textUserMenuTrigger}
            >
              {globalHeader.login && 'url' in globalHeader.login && (
                <Link slot="login-link" config={globalHeader.login} />
              )}
              <div slot="user-links">
                {globalHeader.userMenuLinks?.map(link => (
                  <post-menu-item key={link.url}>
                    <Link slot="login-link" config={link} />
                  </post-menu-item>
                ))}
              </div>
            </post-login-widget>
          )}

          {localHeader.title && <p slot="title">{localHeader.title}</p>}

          {localHeader.navigation && this.renderNavigation('local-nav', localHeader.navigation)}

          {localHeader.mainNavigation && (
            <post-mainnavigation slot="main-nav" textMain={this.textMain}>
              <ul>
                {localHeader.mainNavigation.map(navItem => (
                  <li>
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

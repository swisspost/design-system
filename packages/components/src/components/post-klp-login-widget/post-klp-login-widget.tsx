import { version } from '@root/package.json';
import { Build, Component, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  parseLinkProp,
  showAccountSwitch,
  showCompanySwitch,
  type KlpLink,
} from './lib/klp-links.model';
import type { KlpSessionData } from './lib/klp-session.model';
import { klpBaseUrl } from './lib/klp-urls';
import type { KlpEnvironment, KlpLoginWidgetConfig } from './lib/klp-widget.model';
import { createSessionController } from './lib/session-controller';

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  shadow: true,
})
export class PostKlpLoginWidget {
  /**
   * The KLP platform instance to talk to. Determines every backend URL the widget uses.
   */
  @Prop() environment: KlpEnvironment = 'prod';

  /**
   * The portal login widget configuration. Accepts an object or, so the widget can be driven from
   * plain HTML, a JSON string.
   */
  @Prop() config?: KlpLoginWidgetConfig | string;

  /**
   * Links shown in the user menu, in order. Takes the output of internet-header's
   * `getUserMenuOptions()` unchanged. Ignored when the `menu-links` slot is filled.
   */
  @Prop() menuLinks?: KlpLink[] | string;

  /**
   * The link offered to anonymous visitors. Falls back to the configured `appLoginUrl`.
   * Ignored when the `login-link` slot is filled.
   */
  @Prop() loginLink?: KlpLink | string;

  /**
   * The link that ends the session. Ignored when the `logout-link` slot is filled.
   */
  @Prop() logoutLink?: KlpLink | string;

  /**
   * Label and target for switching account. Only rendered when the session permits it, so the
   * consumer does not have to work out who is allowed to see it.
   */
  @Prop() accountSwitch?: KlpLink | string;

  /**
   * Label and target for switching company. Only rendered when the session permits it.
   */
  @Prop() companySwitch?: KlpLink | string;

  @State() private parsedConfig: KlpLoginWidgetConfig | null = null;

  /** Stays null on the server: the session is only ever known to the client. */
  @State() private session: KlpSessionData | null = null;

  private controller?: ReturnType<typeof createSessionController>;

  componentWillLoad() {
    this.parseConfig();
  }

  componentDidLoad() {
    if (!Build.isBrowser) return;

    this.connect();
  }

  disconnectedCallback() {
    this.controller?.stop();
  }

  private connect() {
    if (!this.parsedConfig) return;

    const endPoint = klpBaseUrl(this.environment);
    if (endPoint === null) {
      console.error(
        `post-klp-login-widget: "${this.environment}" is not a known environment, the widget stays anonymous.`,
      );
      return;
    }

    this.controller = createSessionController({
      endPoint,
      keepAliveUrl: this.parsedConfig.keepAliveUrl,
      conf: this.parsedConfig.options,
      onSessionChange: session => {
        this.session = session;
      },
    });

    void this.controller.start();
  }

  @Watch('config')
  parseConfig() {
    this.parsedConfig = this.readConfig();
  }

  private readConfig(): KlpLoginWidgetConfig | null {
    if (!this.config) return null;
    if (typeof this.config !== 'string') return this.config;

    try {
      return JSON.parse(this.config) as KlpLoginWidgetConfig;
    } catch (error) {
      console.error('post-klp-login-widget: the `config` property is not valid JSON.', error);
      return null;
    }
  }

  private renderLink(link: KlpLink, className: string) {
    return (
      <a
        class={className}
        href={link.url}
        aria-label={link.label}
        aria-current={link.active ? 'page' : null}
      >
        {link.text}
      </a>
    );
  }

  private renderLoginFallback() {
    const link = parseLinkProp<KlpLink>(this.loginLink, 'loginLink');
    if (link) return this.renderLink(link, 'login-link');
    if (!this.parsedConfig) return null;

    return (
      <a class="login-link" href={this.parsedConfig.appLoginUrl}>
        <slot name="login-label">Login</slot>
      </a>
    );
  }

  private renderMenuLinksFallback(session: KlpSessionData) {
    const links = parseLinkProp<KlpLink[]>(this.menuLinks, 'menuLinks') ?? [];
    const accountSwitch = showAccountSwitch(session)
      ? parseLinkProp<KlpLink>(this.accountSwitch, 'accountSwitch')
      : null;
    const companySwitch = showCompanySwitch(session)
      ? parseLinkProp<KlpLink>(this.companySwitch, 'companySwitch')
      : null;
    const entries = [...links, accountSwitch, companySwitch].filter(
      (link): link is KlpLink => link !== null && link !== undefined,
    );

    if (entries.length === 0) return null;

    return (
      <ul class="menu-links">
        {entries.map(link => (
          <li key={link.url}>{this.renderLink(link, 'menu-link')}</li>
        ))}
      </ul>
    );
  }

  private renderLogoutFallback() {
    const link = parseLinkProp<KlpLink>(this.logoutLink, 'logoutLink');
    return link ? this.renderLink(link, 'logout-link') : null;
  }

  render() {
    // Every injected link lives in a named slot whose fallback is the matching property. That is
    // the precedence rule -- a filled slot wins -- enforced by the platform rather than by us.
    // The session is unknown until the client connects, so both server and first client render
    // produce the anonymous shell. The menu chrome is composed in a later step.
    return (
      <Host data-version={version}>
        {this.session ? (
          [
            <span class="user-name">
              {this.session.name} {this.session.surname}
            </span>,
            <slot name="menu-links">{this.renderMenuLinksFallback(this.session)}</slot>,
            <slot name="logout-link">{this.renderLogoutFallback()}</slot>,
          ]
        ) : (
          <slot name="login-link">{this.renderLoginFallback()}</slot>
        )}
      </Host>
    );
  }
}

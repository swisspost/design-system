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

/** Scoped to the widget's own shadow root, so a constant id cannot collide across instances. */
const MENU_ID = 'klp-user-menu';

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

  /**
   * Names the user menu for assistive technology.
   */
  @Prop() textUserMenu: string = 'User menu';

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

  /** `aria-describedby` rather than `aria-description`, which is not baseline available. */
  private renderMenuItem(link: KlpLink, className: string, descriptionId?: string) {
    return (
      <post-menu-item>
        <a
          class={className}
          href={link.url}
          aria-label={link.label}
          aria-current={link.active ? 'page' : null}
          aria-describedby={link.description ? descriptionId : null}
        >
          {link.icon && <post-icon name={link.icon} aria-hidden="true"></post-icon>}
          <span>{link.text}</span>
        </a>
        {link.description && (
          <span class="visually-hidden" id={descriptionId}>
            {link.description}
          </span>
        )}
      </post-menu-item>
    );
  }

  private renderLoginFallback() {
    const link = parseLinkProp<KlpLink>(this.loginLink, 'loginLink');

    if (link) {
      return (
        <a class="login-link" href={link.url} aria-label={link.label}>
          {link.icon && <post-icon name={link.icon} aria-hidden="true"></post-icon>}
          <span>{link.text}</span>
        </a>
      );
    }

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

    return entries.map((link, index) =>
      this.renderMenuItem(link, 'menu-link', `klp-menu-link-description-${index}`),
    );
  }

  private renderLogoutFallback() {
    const link = parseLinkProp<KlpLink>(this.logoutLink, 'logoutLink');
    return link ? this.renderMenuItem(link, 'logout-link', 'klp-logout-description') : null;
  }

  private renderUserMenu(session: KlpSessionData) {
    const fullName = [session.name, session.surname].filter(Boolean).join(' ');

    return [
      <post-menu-trigger for={MENU_ID}>
        <button class="user-menu-trigger">
          <post-avatar
            firstname={session.name}
            lastname={session.surname}
            aria-hidden="true"
          ></post-avatar>
          <span class="user-name">{fullName}</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-menu-trigger>,
      <post-menu id={MENU_ID} label={this.textUserMenu}>
        <div class="user-menu-header" slot="header">
          <post-avatar
            firstname={session.name}
            lastname={session.surname}
            aria-hidden="true"
          ></post-avatar>
          <div class="user-menu-identity">
            <span class="user-menu-name">{fullName}</span>
            {session.company && <span class="user-menu-company">{session.company}</span>}
          </div>
        </div>
        <slot name="menu-links">{this.renderMenuLinksFallback(session)}</slot>
        <slot name="logout-link">{this.renderLogoutFallback()}</slot>
      </post-menu>,
    ];
  }

  render() {
    // Every injected link lives in a named slot whose fallback is the matching property. That is
    // the precedence rule -- a filled slot wins -- enforced by the platform rather than by us.
    // The session is unknown until the client connects, so both server and first client render
    // produce the anonymous shell.
    return (
      <Host data-version={version}>
        {this.session ? (
          this.renderUserMenu(this.session)
        ) : (
          <slot name="login-link">{this.renderLoginFallback()}</slot>
        )}
      </Host>
    );
  }
}

import { version } from '@root/package.json';
import { Build, Component, h, Host, Prop, State } from '@stencil/core';
import { apiBaseUrl } from './lib/api-urls';
import { defaultKlpLinks, klpLanguage, type KlpLink } from './lib/links';
import type { KlpSessionData } from './lib/session.model';
import { KLP_TRANSLATIONS } from './lib/translations';
import type { KlpEnvironment } from './lib/widget.model';
import { createSessionController } from './lib/session-controller';
import { showAccountSwitch, showCompanySwitch } from './lib/session-permissions';
import { Required } from '@/utils/property-decorators';

/** Scoped to the widget's own shadow root, so a constant id cannot collide across instances. */
const MENU_ID = 'klp-user-menu';

/** Above this the exact number stops being useful and only costs the badge its shape. */
const MAX_SHOWN_UNREAD = 99;

/**
 * @slot default - Custom entries, listed between settings and logout in the user menu. Each one must be a `post-menu-item` holding a link or a button.
 * @slot text-login - Replaces the text of the login link.
 * @slot text-account-switch - Replaces the text of the account switch.
 * @slot text-company-switch - Replaces the text of the company switch.
 * @slot text-my-profile - Replaces the text of the profile entry.
 * @slot text-messages - Replaces the text of the messages entry.
 * @slot text-unread-messages - Replaces the visually hidden text after the number of unread messages.
 * @slot text-settings - Replaces the text of the settings entry.
 * @slot text-logout - Replaces the text of the logout entry.
 * @slot text-access-user-links - Replaces the visually hidden label of the button that opens the user menu.
 */
@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  shadow: true,
})
export class PostKlpLoginWidget {
  /**
   * The KLP platform instance to talk to. Determines the backend and the default link targets.
   */
  @Prop() environment: KlpEnvironment = 'prod';

  /**
   * The application registered with KLP, sent as `service` with the login and the switches, so KLP
   * returns the user to it.
   */
  @Prop({ reflect: true })
  @Required()
  service!: string;

  /**
   * The KLP application sent as `app` with the login and the switches. Defaults to `service`.
   */
  @Prop() app?: string;

  /**
   * Whether the page runs inside an iframe, sent as `inIframe` with the switches and the logout.
   */
  @Prop() inIframe: boolean = false;

  /**
   * The language of the default texts and link targets: `de`, `fr`, `it` or `en`.
   * Defaults to `<html lang>`, then to the browser's preferred language, then to `de`.
   */
  @Prop() language?: string;

  /**
   * Overrides the target of the login link.
   */
  @Prop() urlLogin?: string;

  /**
   * Overrides the target of the account switch.
   */
  @Prop() urlAccountSwitch?: string;

  /**
   * Overrides the target of the company switch.
   */
  @Prop() urlCompanySwitch?: string;

  /**
   * Overrides the target of the profile entry.
   */
  @Prop() urlMyProfile?: string;

  /**
   * Overrides the target of the messages entry.
   */
  @Prop() urlMessages?: string;

  /**
   * Overrides the target of the settings entry.
   */
  @Prop() urlSettings?: string;

  /**
   * Overrides the target of the logout entry.
   */
  @Prop() urlLogout?: string;

  /**
   * Whether to stop refreshing the session while the user is active on the page.
   */
  @Prop() keepAliveDisabled: boolean = false;

  /**
   * The portal's own keep-alive url. The platform session is refreshed either way.
   */
  @Prop() keepAliveUrl?: string;

  /**
   * Minutes between two keep-alive ticks.
   */
  @Prop() keepAliveInterval: number = 9;

  /**
   * Space separated list of the events that count as user activity.
   */
  @Prop() keepAliveEvents: string = 'click touchstart keydown';

  /**
   * Visually hidden label for the current user.
   * The placeholder `{user}` will be replaced with the full name of the currently logged-in user.
   */
  @Prop({ reflect: true })
  @Required()
  textCurrentUser!: string;

  /**
   * Visually hidden label for the user menu.
   */
  @Prop({ reflect: true })
  @Required()
  textUserLinks!: string;

  /**
   * What to show before the session is known. Leave unset unless the server already knows who the
   * visitor is: the widget then shows an avatar without initials, which costs anonymous visitors
   * a short placeholder but never flashes the wrong state at anyone.
   * Set `anonymous` to render the login link right away instead.
   */
  @Prop() initialState?: 'anonymous' | 'authenticated';

  /** Stays null on the server: the session is only ever known to the client. */
  @State() private session: KlpSessionData | null = null;

  /** False until the platform has answered, which is what separates "nobody" from "not yet". */
  @State() private resolved: boolean = false;

  /** Pushed over the event bus, so it changes without any prop changing. */
  @State() private unread: number = 0;

  private controller?: ReturnType<typeof createSessionController>;

  componentDidLoad() {
    if (!Build.isBrowser) return;

    this.connect();
  }

  disconnectedCallback() {
    this.controller?.stop();
  }

  private connect() {
    const endPoint = apiBaseUrl(this.environment);

    if (endPoint === null) {
      console.error(
        `post-klp-login-widget: "${this.environment}" is not a known environment, the widget stays anonymous.`,
      );
      this.resolved = true;
      return;
    }

    this.controller = createSessionController({
      endPoint,
      keepAliveUrl: this.keepAliveUrl,
      conf: {
        keepAlive: !this.keepAliveDisabled,
        keepAliveInterval: this.keepAliveInterval,
        keepAliveListeningEvents: this.keepAliveEvents,
      },
      onSessionChange: session => {
        this.session = session;
      },
      onUnreadChange: unread => {
        this.unread = unread;
      },
    });

    // `start` never rejects, and it settles once the platform has answered either way.
    void this.controller.start().then(() => {
      this.resolved = true;
    });
  }

  private get lang() {
    return klpLanguage(
      this.language,
      document.documentElement.lang,
      ...(globalThis.navigator?.languages ?? []),
      globalThis.navigator?.language,
    );
  }

  private get links(): Record<KlpLink, string> {
    const defaults = defaultKlpLinks({
      environment: this.environment,
      language: this.lang,
      service: this.service ?? '',
      app: this.app || undefined,
      inIframe: this.inIframe,
    });

    return {
      login: this.urlLogin ?? defaults.login,
      accountSwitch: this.urlAccountSwitch ?? defaults.accountSwitch,
      companySwitch: this.urlCompanySwitch ?? defaults.companySwitch,
      myProfile: this.urlMyProfile ?? defaults.myProfile,
      messages: this.urlMessages ?? defaults.messages,
      settings: this.urlSettings ?? defaults.settings,
      logout: this.urlLogout ?? defaults.logout,
    };
  }

  private renderMenuItem(href: string, icon: string, text: string, slot: string) {
    return (
      <post-menu-item>
        <a href={href}>
          <post-icon name={icon} aria-hidden="true"></post-icon>
          <span>
            <slot name={slot}>{text}</slot>
          </span>
        </a>
      </post-menu-item>
    );
  }

  private renderMessages(href: string, text: string, unreadText: string) {
    return (
      <post-menu-item>
        <a href={href}>
          <post-icon name="letter" aria-hidden="true"></post-icon>
          <span>
            <slot name="text-messages">{text}</slot>
          </span>
          {this.unread > 0 && (
            <span class="badge">
              <span aria-hidden="true">
                {this.unread > MAX_SHOWN_UNREAD ? `${MAX_SHOWN_UNREAD}+` : this.unread}
              </span>
              <span class="visually-hidden">
                {this.unread} <slot name="text-unread-messages">{unreadText}</slot>
              </span>
            </span>
          )}
        </a>
      </post-menu-item>
    );
  }

  private renderUserMenu(session: KlpSessionData) {
    const fullName = [session.name, session.surname].filter(Boolean).join(' ');
    const links = this.links;
    const texts = KLP_TRANSLATIONS[this.lang];

    return [
      <post-menu-trigger for={MENU_ID} key={`${MENU_ID}-trigger`}>
        <button class="user-menu-trigger" type="button">
          <span class="user-menu-avatar">
            <post-avatar
              firstname={session.name}
              lastname={session.surname}
              description={this.textCurrentUser?.replace('{user}', fullName)}
              aria-hidden={this.textCurrentUser ? null : 'true'}
            ></post-avatar>
            {session.support ? (
              <div class="support-user">
                <post-icon flip-h name="customercenter"></post-icon>
              </div>
            ) : null}
            {this.unread > 0 && <span class="badge" aria-hidden="true"></span>}
          </span>
          <span class="visually-hidden">
            <slot name="text-access-user-links">{texts.accessUserLinks}</slot>
          </span>
        </button>
      </post-menu-trigger>,
      <post-menu id={MENU_ID} label={this.textUserLinks} key={`${MENU_ID}-menu`}>
        <div slot="header">
          <post-avatar
            firstname={session.name}
            lastname={session.surname}
            aria-hidden="true"
          ></post-avatar>
          <div>
            {session.company && <p class="company">{session.company}</p>}
            <p>{fullName}</p>
          </div>
        </div>
        {this.renderMenuItem(links.myProfile, 'profile', texts.myProfile, 'text-my-profile')}
        {this.renderMessages(links.messages, texts.messages, texts.unreadMessages)}
        {this.renderMenuItem(links.settings, 'gear', texts.settings, 'text-settings')}
        <slot></slot>
        {showAccountSwitch(session) &&
          this.renderMenuItem(
            links.accountSwitch,
            'userswitch',
            texts.accountSwitch,
            'text-account-switch',
          )}
        {showCompanySwitch(session) &&
          this.renderMenuItem(
            links.companySwitch,
            'company',
            texts.companySwitch,
            'text-company-switch',
          )}
        {this.renderMenuItem(links.logout, 'logout', texts.logout, 'text-logout')}
      </post-menu>,
    ];
  }

  private renderAnonymous() {
    // The placeholder costs anonymous visitors a brief empty avatar, but it is the only honest
    // answer while the platform has not said who, if anyone, is signed in.
    if (this.resolved || this.initialState === 'anonymous') {
      return (
        <a class="login-link" href={this.links.login}>
          <span>
            <slot name="text-login">{KLP_TRANSLATIONS[this.lang].login}</slot>
          </span>
          <post-icon name="login" aria-hidden="true"></post-icon>
        </a>
      );
    }

    // A nameless avatar: the signed-in state only fills in the initials. The name is blank rather
    // than empty, since `firstname` is required; the avatar trims it to no initials.
    return (
      <post-avatar class="user-menu-placeholder" firstname=" " aria-hidden="true"></post-avatar>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        {this.session ? this.renderUserMenu(this.session) : this.renderAnonymous()}
      </Host>
    );
  }
}

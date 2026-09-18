import { version } from '@root/package.json';
import { Build, Component, h, Host, Prop, State } from '@stencil/core';
import type { KlpSessionData } from './lib/klp-session.model';
import { klpBaseUrl } from './lib/klp-urls';
import type { KlpEnvironment } from './lib/klp-widget.model';
import { createSessionController } from './lib/session-controller';
import { showAccountSwitch, showCompanySwitch } from './lib/session-permissions';

/** Scoped to the widget's own shadow root, so a constant id cannot collide across instances. */
const MENU_ID = 'klp-user-menu';

/**
 * @slot login-link - The link offered to anonymous visitors.
 * @slot account-switch - Entry for switching account, rendered only when the session permits it.
 * @slot company-switch - Entry for switching company, rendered only when the session permits it.
 * @slot menu-links - Entries of the user menu, as `post-menu-item` elements.
 * @slot logout-link - The entry that ends the session.
 */
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
   * Your project id, the same one the header is given. Sent to the platform as the service id.
   */
  @Prop() project?: string;

  /**
   * The portal application the session belongs to.
   */
  @Prop() applicationId?: string;

  /**
   * Language the platform should answer in.
   */
  @Prop() language?: 'de' | 'fr' | 'it' | 'en';

  /**
   * Whether the session is refreshed while the user is active on the page.
   */
  @Prop() keepAlive: boolean = true;

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
  @Prop() textCurrentUser?: string;

  /**
   * Visually hidden label for the user menu.
   */
  @Prop() textUserLinks?: string;

  /**
   * Visually hidden label for the button that opens the user menu.
   */
  @Prop() textAccessUserLinks?: string;

  /** Stays null on the server: the session is only ever known to the client. */
  @State() private session: KlpSessionData | null = null;

  private controller?: ReturnType<typeof createSessionController>;

  componentDidLoad() {
    if (!Build.isBrowser) return;

    this.connect();
  }

  disconnectedCallback() {
    this.controller?.stop();
  }

  private connect() {
    const endPoint = klpBaseUrl(this.environment);

    if (endPoint === null) {
      console.error(
        `post-klp-login-widget: "${this.environment}" is not a known environment, the widget stays anonymous.`,
      );
      return;
    }

    this.controller = createSessionController({
      endPoint,
      keepAliveUrl: this.keepAliveUrl,
      conf: {
        keepAlive: this.keepAlive,
        keepAliveInterval: this.keepAliveInterval,
        keepAliveListeningEvents: this.keepAliveEvents,
      },
      onSessionChange: session => {
        this.session = session;
      },
    });

    void this.controller.start();
  }

  private renderUserMenu(session: KlpSessionData) {
    const fullName = [session.name, session.surname].filter(Boolean).join(' ');

    return [
      <post-menu-trigger for={MENU_ID}>
        <button class="user-menu-trigger" type="button">
          <post-avatar
            firstname={session.name}
            lastname={session.surname}
            description={this.textCurrentUser?.replace('{user}', fullName)}
            aria-hidden={this.textCurrentUser ? null : 'true'}
          ></post-avatar>
          <span class="visually-hidden">{this.textAccessUserLinks}</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-menu-trigger>,
      <post-menu id={MENU_ID} label={this.textUserLinks}>
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
        {showAccountSwitch(session) && <slot name="account-switch"></slot>}
        {showCompanySwitch(session) && <slot name="company-switch"></slot>}
        <slot name="menu-links"></slot>
        <slot name="logout-link"></slot>
      </post-menu>,
    ];
  }

  render() {
    // Every link is the consumer's markup; the widget only decides which of them the session is
    // allowed to see. The session is unknown until the client connects, so both server and the
    // first client render produce the anonymous shell.
    return (
      <Host data-version={version}>
        {this.session ? this.renderUserMenu(this.session) : <slot name="login-link"></slot>}
      </Host>
    );
  }
}

import { version } from '@root/package.json';
import { Build, Component, h, Host, Prop, State } from '@stencil/core';
import type { KlpSessionData } from './lib/klp-session.model';
import { klpBaseUrl } from './lib/klp-urls';
import type { KlpEnvironment } from './lib/klp-widget.model';
import { createSessionController } from './lib/session-controller';
import { showAccountSwitch, showCompanySwitch } from './lib/session-permissions';
import { setState, subscribe } from './lib/store';

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
   * Language the platform should answer in.
   */
  @Prop() language?: 'de' | 'fr' | 'it' | 'en';

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
  textCurrentUser!: string;

  /**
   * Visually hidden label for the user menu.
   */
  @Prop({ reflect: true })
  textUserLinks!: string;

  /**
   * Visually hidden label for the button that opens the user menu.
   */
  @Prop({ reflect: true })
  textAccessUserLinks!: string;

  /**
   * What to show before the session is known. Leave unset unless the server already knows who the
   * visitor is: the widget then reserves a neutral avatar-sized box, which costs anonymous
   * visitors a short placeholder but never flashes the wrong state at anyone.
   * Set `anonymous` to render the login link right away instead.
   */
  @Prop() initialState?: 'anonymous' | 'authenticated';

  /** Stays null on the server: the session is only ever known to the client. */
  @State() private session: KlpSessionData | null = null;

  /** False until the platform has answered, which is what separates "nobody" from "not yet". */
  @State() private resolved: boolean = false;

  /** Mirrors the store, so the dot on the avatar follows `post-klp-login-widget-messages`. */
  @State() private unread: number = 0;

  private controller?: ReturnType<typeof createSessionController>;
  private unsubscribe?: () => void;

  connectedCallback() {
    this.unsubscribe = subscribe(({ unread }) => {
      this.unread = unread;
    });
  }

  componentDidLoad() {
    if (!Build.isBrowser) return;

    this.connect();
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    this.controller?.stop();
  }

  private connect() {
    const endPoint = klpBaseUrl(this.environment);

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
      onUnreadChange: unread => setState('unread', unread),
    });

    // `start` never rejects, and it settles once the platform has answered either way.
    void this.controller.start().then(() => {
      this.resolved = true;
    });
  }

  private renderUserMenu(session: KlpSessionData) {
    const fullName = [session.name, session.surname].filter(Boolean).join(' ');

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
            {this.unread > 0 && <span class="badge" aria-hidden="true"></span>}
          </span>
          <span class="visually-hidden">{this.textAccessUserLinks}</span>
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
        {showAccountSwitch(session) && <slot name="account-switch"></slot>}
        {showCompanySwitch(session) && <slot name="company-switch"></slot>}
        <slot name="menu-links"></slot>
        <slot name="logout-link"></slot>
      </post-menu>,
    ];
  }

  private renderAnonymous() {
    // The placeholder costs anonymous visitors a brief neutral box, but it is the only honest
    // answer while the platform has not said who, if anyone, is signed in.
    if (this.resolved || this.initialState === 'anonymous') {
      return <slot name="login-link"></slot>;
    }

    return <span class="user-menu-placeholder" aria-hidden="true"></span>;
  }

  render() {
    // Every link is the consumer's markup; the widget only decides which of them the session is
    // allowed to see.
    return (
      <Host data-version={version}>
        {this.session ? this.renderUserMenu(this.session) : this.renderAnonymous()}
      </Host>
    );
  }
}

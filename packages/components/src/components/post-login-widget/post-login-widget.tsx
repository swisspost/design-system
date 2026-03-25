import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, IS_SERVER } from '@/utils';
import { nanoid } from 'nanoid';

type SessionData = {
  name: string;
  surname: string;
  email: string;
  userType: string;
};

// TODO: 'post-login-widget' is a temporary name to avoid conflict with 'post-klp-login-widget' 
// which is part of @swisspost/internet-header. Rename to 'post-klp-login-widget' after 
// @swisspost/internet-header components are migrated.
@Component({
  tag: 'post-login-widget',
  styleUrl: 'post-login-widget.scss',
  shadow: true,
})
export class PostLoginWidget {
  private static readonly SUBSCRIBE_URL = 'https://n.account.post.ch/v1/session/subscribe';

  private readonly menuId = `p${nanoid(11)}`;

  @Element() host: HTMLPostLoginWidgetElement;

  @State() sessionData: SessionData | null = null;

  /**
   * The URL to redirect to when the user clicks the login link.
   */
  @Prop({ reflect: true }) readonly loginUrl!: string;

  /**
   * The URL to redirect to after the user logs out.
   * Emitted as the payload of the `postLogout` event so the consumer can handle the redirect.
   */
  @Prop({ reflect: true }) readonly logoutUrl!: string;

  /**
   * Label for the "My Profile" menu item.
   */
  @Prop({ reflect: true }) readonly textUserProfile!: string;

  /**
   * Label for the "Messages" menu item.
   */
  @Prop({ reflect: true }) readonly textMessages!: string;

  /**
   * Label for the "Settings" menu item.
   */
  @Prop({ reflect: true }) readonly textSettings!: string;

  /**
   * Label for the "Logout" button.
   */
  @Prop({ reflect: true }) readonly textLogout!: string;

  /**
   * Accessible label for the user menu.
   */
  @Prop({ reflect: true }) readonly textMenuLabel!: string;

  /**
   * Emitted when the user clicks the logout button.
   * The event payload is the `logoutUrl` — the consumer is responsible for handling the redirect.
   */
  @Event() postLogout: EventEmitter<string>;

  @Watch('loginUrl')
  validateLoginUrl() {
    checkRequiredAndType(this, 'loginUrl', 'string');
  }

  @Watch('logoutUrl')
  validateLogoutUrl() {
    checkRequiredAndType(this, 'logoutUrl', 'string');
  }

  @Watch('textUserProfile')
  validateTextUserProfile() {
    checkRequiredAndType(this, 'textUserProfile', 'string');
  }

  @Watch('textMessages')
  validateTextMessages() {
    checkRequiredAndType(this, 'textMessages', 'string');
  }

  @Watch('textSettings')
  validateTextSettings() {
    checkRequiredAndType(this, 'textSettings', 'string');
  }

  @Watch('textLogout')
  validateTextLogout() {
    checkRequiredAndType(this, 'textLogout', 'string');
  }

  @Watch('textMenuLabel')
  validateTextMenuLabel() {
    checkRequiredAndType(this, 'textMenuLabel', 'string');
  }

  async componentDidLoad() {
    if (IS_SERVER) return;

    try {
      const response = await fetch(PostLoginWidget.SUBSCRIBE_URL, { credentials: 'include' });
      const json = await response.json();
      this.sessionData = json.data ?? null;
    } catch (e) {
      console.warn('post-login-widget: session fetch failed', e);
      this.sessionData = null;
    }
  }

  private handleLogout = () => {
    this.postLogout.emit(this.logoutUrl);
  };

  private renderLoginLink() {
    return (
      <a href={this.loginUrl}>
        <span>Login</span>
        <post-icon name="login" aria-hidden="true" />
      </a>
    );
  }

  private renderUserMenu() {
    return (
      <li class="user-menu-wrapper">
        <post-menu-trigger for={this.menuId} style={{ display: "block" }}>
          <button class="btn btn-link" type="button">
            <post-avatar
              firstname={this.sessionData!.name}
              lastname={this.sessionData!.surname}
            />
          </button>
        </post-menu-trigger>

        <post-menu id={this.menuId} label={this.textMenuLabel}>
          <div slot="header">
            <post-avatar
              firstname={this.sessionData!.name}
              lastname={this.sessionData!.surname}
            />
            {this.sessionData!.name} {this.sessionData!.surname}
          </div>

          <post-menu-item>
            <a href="#">
              <post-icon aria-hidden="true" name="profile"></post-icon>
              {this.textUserProfile}
            </a>
          </post-menu-item>

          <post-menu-item>
            <a href="#">
              <post-icon aria-hidden="true" name="letter"></post-icon>
              {this.textMessages}
            </a>
          </post-menu-item>

          <post-menu-item>
            <a href="#">
              <post-icon aria-hidden="true" name="gear"></post-icon>
              {this.textSettings}
            </a>
          </post-menu-item>

          <post-menu-item>
            <button type="button" onClick={() => this.handleLogout()}>
              <post-icon aria-hidden="true" name="logout"></post-icon>
              {this.textLogout}
            </button>
          </post-menu-item>
        </post-menu>
      </li>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        {!this.sessionData ? this.renderLoginLink() : this.renderUserMenu()}
      </Host>
    );
  }
}
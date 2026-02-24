import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';
import { nanoid } from 'nanoid';

type SessionData = {
  name: string;
  surname: string;
  email: string;
  userType: string;
};

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  shadow: true,
})
export class PostKlpLoginWidget {
  private static readonly SUBSCRIBE_URL = 'https://n.account.post.ch/v1/session/subscribe';

  private readonly menuId = `p${nanoid(11)}`;

  @Element() host: HTMLPostKlpLoginWidgetElement;

  @State() sessionData: SessionData | null = null;
  @State() isLoading: boolean = true;

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

  async componentDidLoad() {
    this.validateLoginUrl();
    this.validateLogoutUrl();
    this.validateTextUserProfile();
    this.validateTextMessages();
    this.validateTextSettings();
    this.validateTextLogout();

    try {
      const response = await fetch(PostKlpLoginWidget.SUBSCRIBE_URL, { credentials: 'include' });
      const json = await response.json();
      this.sessionData = json.data;
    } catch (e) {
      console.warn('post-klp-login-widget: session fetch failed', e);
    } finally {
      this.isLoading = false;
    }
  }

  private handleLogout() {
    this.postLogout.emit(this.logoutUrl);
  }

  render() {
    if (this.isLoading) return <Host data-version={version} />;

    return (
      <Host data-version={version}>
        {this.sessionData ? (
          <div style={{ display: 'contents' }}>
            <post-menu-trigger for={this.menuId}>
              <button class="btn btn-tertiary">
                <post-avatar
                  firstname={this.sessionData.name}
                  lastname={this.sessionData.surname}
                />
              </button>
            </post-menu-trigger>

            <post-menu id={this.menuId} label="User menu">
              <div slot="header" style={{ display: 'flex' }}>
                <post-avatar
                  firstname={this.sessionData.name}
                  lastname={this.sessionData.surname}
                />
                <p>
                  {this.sessionData.name} {this.sessionData.surname}
                </p>
              </div>

              <post-menu-item>
                <a href="https://www.post.ch/selfadmin/">
                  <post-icon aria-hidden="true" name="profile"></post-icon>
                  {this.textUserProfile}
                </a>
              </post-menu-item>

              <post-menu-item>
                <a href="https://www.post.ch/selfadmin/messages/">
                  <post-icon aria-hidden="true" name="letter"></post-icon>
                  {this.textMessages}
                </a>
              </post-menu-item>

              <post-menu-item>
                <a href="https://www.post.ch/selfadmin/settings/">
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
          </div>
        ) : (
          <a href={this.loginUrl}>
            Login
            <post-icon name="login" />
          </a>
        )}
      </Host>
    );
  }
}

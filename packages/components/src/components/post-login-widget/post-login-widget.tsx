import { Required, Type } from '@/utils';
import { version } from '@root/package.json';
import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core';

const SESSION_URL = 'https://n.account.post.ch/v1/session/subscribe';

/**
 * @slot user-links - Links to show in the user menu when the user is authenticated.
 * @slot login-link - Content rendered when the user is not authenticated.
 */
@Component({
  tag: 'post-login-widget',
  styleUrl: 'post-login-widget.scss',
  shadow: true,
})
export class PostLoginWidget {
  @Element() host: HTMLPostLoginWidgetElement;

  /**
   * Emitted when the authentication state changes.
   * The event payload is an object with an `authenticated` property:
   * `true` when the user is logged in, `false` when the user is not logged in or the API request failed.
   */
  @Event() postChange: EventEmitter<{ authenticated: boolean }>;

  /**
   * Label for the "Current user is {user}" accessibility description.
   * Use `{user}` as a placeholder — it will be replaced with the current user's name at runtime.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textCurrentUser!: string;

  /**
   * Accessible label for the dropdown menu
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textUserMenu!: string;

  /**
   * Hidden label for the user menu trigger button, for accessibility purposes. It should describe the purpose of the button (e.g. "Access user links").
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textUserMenuTrigger!: string;

  @State() private authenticated: boolean | null = null;

  @State() private user: { name: string; surname: string; email: string } | null = null;

  async componentWillLoad() {
    if (Build.isBrowser) {
      await this.fetchAuthState();
    }
  }

  /**
   * Returns the current authentication state:
   * `null` when the component is still loading, `true` when authenticated, `false` when not.
   */
  @Method()
  async isAuthenticated(): Promise<boolean | null> {
    return this.authenticated;
  }

  /**
   * Re-fetches the authentication state from the session API and updates
   * the component rendering accordingly.
   */
  @Method()
  async refresh(): Promise<void> {
    await this.fetchAuthState();
  }

  private async fetchAuthState(): Promise<void> {
    try {
      const response = await fetch(SESSION_URL, {
        credentials: 'include',
      });

      if (!response.ok) {
        this.setAuthState(false);
        return;
      }

      const json = await response.json();
      const isAuthenticated = json?.data?.email !== undefined;
      this.user = json?.data;
      this.setAuthState(isAuthenticated);
    } catch {
      this.setAuthState(false);
    }
  }

  private setAuthState(next: boolean): void {
    if (this.authenticated === next) return;

    this.authenticated = next;
    this.postChange.emit({ authenticated: next });
  }

  render() {
    return (
      <Host data-version={version}>
        {this.authenticated === true ? (
          <div>
            <post-menu-trigger for="user-menu-default">
              <button class="btn btn-link" type="button">
                <post-avatar
                  firstname={this.user.name}
                  lastname={this.user.surname}
                  description={this.textCurrentUser.replace(
                    '{user}',
                    `${this.user.name} ${this.user.surname}`,
                  )}
                ></post-avatar>
                <span class="visually-hidden">{this.textUserMenuTrigger}</span>
              </button>
            </post-menu-trigger>
            <post-menu label={this.textUserMenu} id="user-menu-default">
              <div slot="header">
                <post-avatar
                  firstname={this.user.name}
                  lastname={this.user.surname}
                  email={this.user.email}
                  aria-hidden="true"
                ></post-avatar>
                {this.user.name} {this.user.surname}
              </div>
              <slot name="user-links" />
            </post-menu>
          </div>
        ) : (
          <div>
            <slot name="login-link" />
          </div>
        )}
      </Host>
    );
  }
}

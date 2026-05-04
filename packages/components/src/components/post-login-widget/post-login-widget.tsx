import {
  Build,
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Method,
  State,
} from '@stencil/core';
import { version } from '@root/package.json';

const SESSION_URL = 'https://n.account.post.ch/v1/session/subscribe';

/**
 * @slot authenticated - Content rendered when the user is authenticated (e.g. user menu).
 * @slot unauthenticated - Content rendered when the user is not authenticated (e.g. login link).
 */
@Component({
  tag: 'post-login-widget',
  shadow: true,
})
export class PostLoginWidget {
  /**
   * Emitted when the authentication state changes.
   * The event payload is an object with an `authenticated` property:
   * `true` when the user is logged in, `false` when the user is not logged in or the API request failed.
   */
  @Event() postLoginChange: EventEmitter<{ authenticated: boolean }>;

  @State() private authenticated: boolean | null = null;

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
  async getAuthState(): Promise<boolean | null> {
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
      this.setAuthState(isAuthenticated);
    } catch {
      this.setAuthState(false);
    }
  }

  private setAuthState(next: boolean): void {
    if (this.authenticated === next) return;

    this.authenticated = next;
    this.postLoginChange.emit({ authenticated: next });
  }

  render() {
    return (
      <Host data-version={version}>
        {this.authenticated === true ? <slot name="authenticated" /> : <slot name="unauthenticated" />}
      </Host>
    );
  }
}

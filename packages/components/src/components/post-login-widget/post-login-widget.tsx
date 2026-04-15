import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';

const SESSION_URL = 'https://n.account.post.ch/v1/session/subscribe';

/**
 * @slot authenticated - Content rendered when the user is authenticated (e.g. user menu).
 * @slot unauthenticated - Content rendered when the user is not authenticated (e.g. login link).
 *
 * While the authentication state is being determined (`authenticated === null`),
 * neither slot is rendered.
 */
// TODO: Rename to 'post-klp-login-widget' after @swisspost/internet-header components are migrated.
@Component({
  tag: 'post-login-widget',
  styleUrl: 'post-login-widget.scss',
  shadow: true,
})
export class PostLoginWidget {
  @Element() host: HTMLPostLoginWidgetElement;

  /**
   * The current authentication state.
   * - `null`  → loading / API call in progress
   * - `true`  → user is authenticated
   * - `false` → user is not authenticated
   */
  @Prop({ mutable: true, reflect: true }) authenticated: boolean | null = null;

  @Watch('authenticated')
  onAuthenticatedPropChange(next: boolean | null) {
    // Sync external prop changes (e.g. set directly in Storybook or tests)
    // into the internal @State so the render reflects the new value.
    this.authState = next;
  }

  /**
   * Internal render state, kept in sync with `authenticated`.
   * Using a separate `@State` ensures Stencil re-renders on every change,
   * including the `null → false` transition that would not re-render if
   * only the reflected `@Prop` changed.
   */
  @State() private authState: boolean | null = null;

  /**
   * Emitted whenever the authentication state changes.
   * Payload: `{ authenticated: boolean }`.
   * Not emitted for the initial `null` (loading) state.
   */
  @Event() postLoginChange: EventEmitter<{ authenticated: boolean }>;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  async componentWillLoad() {
    if (Build.isBrowser) {
      if (this.host.hasAttribute('authenticated')) {
        this.authState = this.authenticated;
      } else {
        await this.fetchAuthState();
      }
    }
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Re-fetches the authentication state from the session API and updates
   * the component rendering accordingly.
   */
  @Method()
  async refresh(): Promise<void> {
    await this.fetchAuthState();
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private async fetchAuthState(): Promise<void> {
    try {
      const response = await fetch(SESSION_URL, {
        credentials: 'include',
      });

      if (!response.ok) {
        this.setAuthState(false);
        return;
      }

      const data = await response.json();

      // The session endpoint returns an object with a `data` property when
      // the user is authenticated (see mocked fixture).  An empty / missing
      // `data` property means the session exists but the user is anonymous.
      const isAuthenticated = !!(data && data.data && Object.keys(data.data).length > 0);
      this.setAuthState(isAuthenticated);
    } catch {
      // Network error or unparseable response → treat as unauthenticated
      this.setAuthState(false);
    }
  }

  /**
   * Updates state and emits the change event, but only when the value
   * actually changes to avoid unnecessary re-renders and duplicate events.
   */
  private setAuthState(next: boolean): void {
    if (this.authState === next) return;

    this.authState = next;
    this.authenticated = next;
    this.postLoginChange.emit({ authenticated: next });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  render() {
    return (
      <Host data-version={version}>
        {this.authState === true && <slot name="authenticated" />}
        {this.authState === false && <slot name="unauthenticated" />}
      </Host>
    );
  }
}

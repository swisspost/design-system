import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { DEFAULT_GLOBALS, DocsGlobals } from '../storybook/docs-globals';
import type { SidebarSection } from './tree';
import '../topbar/docs-globals-menus';
import './docs-nav-tree';

/** The design-system `md` breakpoint, from which the sidebar replaces this navigation */
const SIDEBAR_QUERY = '(min-width: 780px)';

/** Same fade as the burger menu of `post-header` (`animations/fade.ts`, `headerEase`) */
const FADE: KeyframeAnimationOptions = {
  duration: 350,
  easing: 'cubic-bezier(0.8, 0.2, 0.8, 0.7)',
  fill: 'forwards',
};

/**
 * The navigation below the `md` breakpoint, modelled on the burger menu of `post-header`:
 * a bar with the current location toggles a panel that covers the page below it, with the
 * preview settings and the navigation tree.
 *
 * @fires nav-mobile-toggle - The panel opens (`detail: true`) or starts closing (`detail: false`).
 */
@customElement('docs-nav-mobile')
export class DocsNavMobile extends LitElement {
  @property({ attribute: false }) sections: SidebarSection[] = [];
  @property({ attribute: false }) activeId?: string;
  /** Where the current page is, e.g. "Components/Button" */
  @property() location = '';
  @property({ attribute: false }) globals: DocsGlobals = DEFAULT_GLOBALS;

  @state() private expanded = false;

  @query('.nav-mobile-bar') private toggleButton!: HTMLButtonElement;
  @query('.nav-panel') private panel!: HTMLElement;

  private animation?: Animation;
  private readonly sidebarQuery = globalThis.matchMedia(SIDEBAR_QUERY);

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.sidebarQuery.addEventListener('change', this.onBreakpointChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.sidebarQuery.removeEventListener('change', this.onBreakpointChange);
  }

  render() {
    return html`
      <button
        type="button"
        class="nav-mobile-bar"
        aria-expanded=${String(this.expanded)}
        aria-controls="nav-mobile-panel"
        @click=${this.toggle}
        @keydown=${this.onKeydown}
      >
        <post-icon name=${this.expanded ? 'closex' : 'burger'} aria-hidden="true"></post-icon>
        <span class="nav-mobile-location">
          <span class="visually-hidden">Navigation, current page: </span>${this.location}
        </span>
        <post-icon class="nav-mobile-chevron" name="chevrondown" aria-hidden="true"></post-icon>
      </button>

      <div
        id="nav-mobile-panel"
        class="nav-panel"
        ?hidden=${!this.expanded}
        @keydown=${this.onKeydown}
      >
        <docs-globals-menus
          class="nav-panel-settings"
          role="group"
          aria-label="Preview settings"
          id-prefix="sheet"
          .globals=${this.globals}
        ></docs-globals-menus>
        <nav class="nav-panel-body" aria-label="Documentation">
          <docs-nav-tree
            id-prefix="sheet"
            .sections=${this.sections}
            .activeId=${this.activeId}
          ></docs-nav-tree>
        </nav>
      </div>
    `;
  }

  async open() {
    if (this.expanded) return;

    this.expanded = true;
    this.emitToggle(true);
    await this.updateComplete;
    this.querySelector('docs-nav-tree')?.revealActive();
    this.fade('in');
  }

  /** Closes the panel, e.g. after a navigation. Focus inside the panel goes back to the toggle. */
  async close() {
    if (!this.expanded) return;

    const hadFocus = this.panel.contains(document.activeElement);
    this.emitToggle(false);

    const finished = await this.fade('out');
    if (!finished) return; // opened again while fading out

    this.expanded = false;
    if (hadFocus) this.toggleButton.focus();
  }

  private toggle() {
    if (this.expanded) this.close();
    else this.open();
  }

  /**
   * Resolves `true` when the animation ran to its end, `false` when another one replaced it.
   */
  private async fade(direction: 'in' | 'out'): Promise<boolean> {
    this.animation?.cancel();
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

    const keyframes = [{ opacity: 0 }, { opacity: 1 }];
    this.animation = this.panel.animate(direction === 'in' ? keyframes : keyframes.reverse(), FADE);

    try {
      await this.animation.finished;
      return true;
    } catch {
      return false;
    }
  }

  private emitToggle(expanded: boolean) {
    this.dispatchEvent(new CustomEvent('nav-mobile-toggle', { detail: expanded, bubbles: true }));
  }

  private onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !this.expanded) return;

    event.preventDefault();
    this.close();
    this.toggleButton.focus();
  }

  private readonly onBreakpointChange = (event: MediaQueryListEvent) => {
    if (event.matches) this.close();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-nav-mobile': DocsNavMobile;
  }
}

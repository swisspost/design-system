import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SIDEBAR_QUERY } from '../config';
import { DEFAULT_GLOBALS, DocsGlobals } from '../storybook/docs-globals';
import type { SearchEntry } from '../search/search-index';
import type { DocsSearch } from '../search/docs-search';
import type { SidebarSection } from './tree';
import '../search/docs-search';
import '../topbar/docs-globals-menus';
import './docs-nav-tree';

/** Same fade as the burger menu of `post-header` (`animations/fade.ts`, `headerEase`) */
const FADE: KeyframeAnimationOptions = {
  duration: 350,
  easing: 'cubic-bezier(0.8, 0.2, 0.8, 0.7)',
  fill: 'forwards',
};

/**
 * The navigation below the `md` breakpoint, modelled on the burger menu of `post-header`:
 * a bar with the current location toggles a panel that covers the page below it, with the
 * search, the preview settings and the navigation tree. Search results take the place of the
 * settings and the tree.
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
  @property({ attribute: false }) searchEntries: SearchEntry[] = [];

  /** The panel is shown: open, or fading out */
  @state() private expanded = false;
  /** The panel is fading out; it can be opened again meanwhile */
  @state() private closing = false;

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
    const open = this.expanded && !this.closing;

    return html`
      <button
        type="button"
        class="nav-mobile-bar"
        aria-expanded=${String(open)}
        aria-controls="nav-mobile-panel"
        @click=${this.toggle}
        @keydown=${this.onKeydown}
      >
        <post-icon name=${open ? 'closex' : 'burger'} aria-hidden="true"></post-icon>
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
        <docs-search id-prefix="sheet-search" .entries=${this.searchEntries}></docs-search>
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
    if (this.expanded && !this.closing) return;

    const reopening = this.closing;
    this.closing = false;
    this.expanded = true;
    this.emitToggle(true);
    await this.updateComplete;
    if (!reopening) this.querySelector('docs-nav-tree')?.revealActive();
    this.fade('in'); // replaces the fade-out, so `close` stops there
  }

  /** Opens the panel with the focus in the search field, e.g. for the ⌘K shortcut. */
  async openSearch() {
    await this.open();
    this.querySelector<DocsSearch>('docs-search')?.focus();
  }

  /** Closes the panel, e.g. after a navigation. Focus inside the panel goes back to the toggle. */
  async close() {
    if (!this.expanded || this.closing) return;

    this.closing = true;
    this.emitToggle(false);

    const finished = await this.fade('out');
    if (!finished || !this.closing) return; // opened again while fading out

    // read now: the focus may have moved into the panel while it faded out (e.g. ⌘K)
    const hadFocus = this.panel.contains(document.activeElement);
    this.closing = false;
    this.expanded = false;
    this.querySelector<DocsSearch>('docs-search')?.clear();
    if (hadFocus) this.toggleButton.focus();
  }

  private toggle() {
    if (this.expanded && !this.closing) this.close();
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
    if (event.key !== 'Escape' || !this.expanded || this.closing) return;

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

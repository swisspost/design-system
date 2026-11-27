import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { DEFAULT_GLOBALS, type Globals } from '@shared/globals';
import type { Page } from '../../catalog/catalog';
import { getRootDefinition } from '../../navigation/navigation';
import type { NavigationSection } from '../../navigation/tree';
import type { SearchIndex } from '../../catalog/search-index';
import type { PostDocsNavigationTree } from '../post-docs-navigation-tree/post-docs-navigation-tree';
import type { PostDocsSearch } from '../post-docs-search/post-docs-search';
import '../post-docs-globals-menus/post-docs-globals-menus';
import '../post-docs-navigation-tree/post-docs-navigation-tree';
import '../post-docs-search/post-docs-search';
import './post-docs-navigation-sheet.scss';

// the fade of the `post-header` burger menu (`animations/fade.ts`, `headerEase`)
const FADE: KeyframeAnimationOptions = {
  duration: 350,
  easing: 'cubic-bezier(0.8, 0.2, 0.8, 0.7)',
  fill: 'forwards',
};

/**
 * The navigation below the sidebar breakpoint, modelled on the `post-header` burger menu:
 * a bar with the current location toggles a panel that covers the page, with the preview settings as its footer.
 *
 * @fires postDocsToggle - The panel opens (`detail: true`) or starts closing (`detail: false`).
 */
@customElement('post-docs-navigation-sheet')
export class PostDocsNavigationSheet extends LitElement {
  @property({ attribute: false }) public sections: NavigationSection[] = [];
  @property({ attribute: false }) public activePage: Page | null = null;
  @property({ attribute: false }) public globals: Globals = DEFAULT_GLOBALS;
  @property({ attribute: false }) public searchIndex: SearchIndex | null = null;

  /** The panel is shown: open, or fading out. */
  @state() private isExpanded = false;
  /** The panel is fading out, it can be opened again meanwhile. */
  @state() private isClosing = false;
  /** The search results take the place of the navigation and the preview settings. */
  @state() private isSearching = false;

  @query('.bar') private bar!: HTMLButtonElement;
  @query('.panel') private panel!: HTMLElement;
  @query('post-docs-navigation-tree') private tree!: PostDocsNavigationTree;
  @query('post-docs-search') private search!: PostDocsSearch;

  private animation: Animation | null = null;

  override createRenderRoot() {
    return this;
  }

  public async open() {
    await this.expand();
  }

  /** Opens the panel with the focus in the search field, e.g. for the search shortcut. */
  public async openSearch() {
    await this.expand();
    this.search.focus();
  }

  private async expand() {
    if (this.isExpanded && !this.isClosing) return;

    const isReopening = this.isClosing;
    this.isClosing = false;
    this.isExpanded = true;
    this.emitToggle(true);

    await this.updateComplete;
    if (!isReopening) void this.tree.revealActivePage();

    // replaces a running fade-out, so that `close` stops there
    void this.fade('in');
  }

  /** Closes the panel, e.g. after a navigation. The focus inside the panel goes back to the bar. */
  public async close() {
    if (!this.isExpanded || this.isClosing) return;

    this.isClosing = true;
    this.emitToggle(false);

    const isFinished = await this.fade('out');
    if (!isFinished || !this.isClosing) return;

    // read now, the focus may have moved into the panel while it faded out
    const hadFocus = this.panel.contains(document.activeElement);
    this.isClosing = false;
    this.isExpanded = false;
    this.search.clear();
    if (hadFocus) this.bar.focus();
  }

  override render() {
    const isOpen = this.isExpanded && !this.isClosing;

    return html`
      <button
        type="button"
        class="bar palette palette-alternate d-flex align-items-center gap-8 w-full m-0 border-0 p-16 elevation-200 fs-9 lh-lg text-start"
        aria-expanded=${String(isOpen)}
        aria-controls="navigation-sheet-panel"
        @click=${this.toggle}
        @keydown=${this.onKeydown}
      >
        <post-icon
          class="flex-shrink-0 w-16 h-16"
          name=${isOpen ? 'closex' : 'burger'}
          aria-hidden="true"
        ></post-icon>
        <span class="flex-fill min-w-0 text-truncate">${this.renderLocation()}</span>
        <post-icon
          class="chevron flex-shrink-0 w-16 h-16"
          name="chevrondown"
          aria-hidden="true"
        ></post-icon>
      </button>

      <div
        id="navigation-sheet-panel"
        class="panel palette palette-default overflow-y-auto"
        ?hidden=${!this.isExpanded}
        @keydown=${this.onKeydown}
      >
        <post-docs-search
          id-prefix="sheet-search"
          .index=${this.searchIndex}
          @postDocsSearchToggle=${this.onSearchToggle}
        ></post-docs-search>
        <nav class="flex-fill pb-24" aria-label="Documentation" ?hidden=${this.isSearching}>
          <post-docs-navigation-tree
            id-prefix="sheet"
            .sections=${this.sections}
            .activePage=${this.activePage}
          ></post-docs-navigation-tree>
        </nav>
        ${this.isSearching
          ? nothing
          : html`
              <post-docs-globals-menus
                class="palette palette-alternate d-flex flex-wrap row-gap-16 column-gap-24 px-16 pt-16"
                role="group"
                aria-label="Preview settings"
                id-prefix="sheet"
                .globals=${this.globals}
              ></post-docs-globals-menus>
            `}
      </div>
    `;
  }

  private renderLocation(): unknown {
    if (!this.activePage) return 'Navigation';

    const segments = this.activePage.segments;
    const root = segments[0];
    const name = segments[segments.length - 1];

    const layout = getRootDefinition(root).layout;

    let location = `${root}/${name}`;
    if (layout === 'home') location = `Home/${name}`;
    else if (layout === 'flat') location = name;

    return html`<span class="visually-hidden">Navigation, current page: </span>${location}`;
  }

  private async onSearchToggle(event: CustomEvent<boolean>) {
    this.isSearching = event.detail;
    if (this.isSearching) return;

    await this.updateComplete;
    void this.tree.revealActivePage();
  }

  private toggle() {
    if (this.isExpanded && !this.isClosing) void this.close();
    else void this.open();
  }

  /** Resolves `true` when the animation ran to its end, `false` when another one replaced it. */
  private async fade(direction: 'in' | 'out'): Promise<boolean> {
    this.animation?.cancel();

    const keyframes = [{ opacity: 0 }, { opacity: 1 }];
    if (direction === 'out') keyframes.reverse();
    this.animation = this.panel.animate(keyframes, FADE);

    try {
      await this.animation.finished;
      return true;
    } catch {
      return false;
    }
  }

  private emitToggle(isOpen: boolean) {
    this.dispatchEvent(
      new CustomEvent<boolean>('postDocsToggle', { detail: isOpen, bubbles: true }),
    );
  }

  private onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !this.isExpanded || this.isClosing) return;

    event.preventDefault();
    void this.close();
    this.bar.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-navigation-sheet': PostDocsNavigationSheet;
  }
}

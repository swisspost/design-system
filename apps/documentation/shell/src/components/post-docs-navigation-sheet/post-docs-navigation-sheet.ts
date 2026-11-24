import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { Page } from '../../catalog';
import { getRootDefinition } from '../../navigation/root';
import type { NavigationSection } from '../../navigation/tree';
import type { PostDocsNavigationTree } from '../post-docs-navigation-tree/post-docs-navigation-tree';
import '../post-docs-navigation-tree/post-docs-navigation-tree';
import './post-docs-navigation-sheet.scss';

// the fade of the `post-header` burger menu (`animations/fade.ts`, `headerEase`)
const FADE: KeyframeAnimationOptions = {
  duration: 350,
  easing: 'cubic-bezier(0.8, 0.2, 0.8, 0.7)',
  fill: 'forwards',
};

/**
 * The navigation below the sidebar breakpoint, modelled on the `post-header` burger menu:
 * a bar with the current location toggles a panel that covers the page.
 *
 * @fires postDocsToggle - The panel opens (`detail: true`) or starts closing (`detail: false`).
 */
@customElement('post-docs-navigation-sheet')
export class PostDocsNavigationSheet extends LitElement {
  @property({ attribute: false }) public sections: NavigationSection[] = [];
  @property({ attribute: false }) public activePage: Page | null = null;

  /** The panel is shown: open, or fading out. */
  @state() private isExpanded = false;
  /** The panel is fading out, it can be opened again meanwhile. */
  @state() private isClosing = false;

  @query('.bar') private bar!: HTMLButtonElement;
  @query('.panel') private panel!: HTMLElement;
  @query('post-docs-navigation-tree') private tree!: PostDocsNavigationTree;

  private animation: Animation | null = null;
  private readonly sidebarQuery = matchMedia('(min-width: 780px)');

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.sidebarQuery.addEventListener('change', this.onBreakpointChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.sidebarQuery.removeEventListener('change', this.onBreakpointChange);
  }

  public async open() {
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
        class="panel palette palette-alternate"
        ?hidden=${!this.isExpanded}
        @keydown=${this.onKeydown}
      >
        <nav class="flex-fill overflow-y-auto pt-16 pb-40" aria-label="Documentation">
          <post-docs-navigation-tree
            id-prefix="sheet"
            .sections=${this.sections}
            .activePage=${this.activePage}
          ></post-docs-navigation-tree>
        </nav>
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

  private readonly onBreakpointChange = (event: MediaQueryListEvent) => {
    if (event.matches) void this.close();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-navigation-sheet': PostDocsNavigationSheet;
  }
}

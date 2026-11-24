import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { Page } from '../../catalog';
import type { NavigationSection } from '../../navigation/tree';
import type { SearchIndex } from '../../search/search-index';
import type { PostDocsNavigationTree } from '../post-docs-navigation-tree/post-docs-navigation-tree';
import type { PostDocsSearch } from '../post-docs-search/post-docs-search';
import '../post-docs-navigation-tree/post-docs-navigation-tree';
import '../post-docs-search/post-docs-search';
import './post-docs-navigation-sidebar.scss';

@customElement('post-docs-navigation-sidebar')
export class PostDocsNavigationSidebar extends LitElement {
  @property({ attribute: false }) public sections: NavigationSection[] = [];
  @property({ attribute: false }) public activePage: Page | null = null;
  @property({ attribute: false }) public searchIndex: SearchIndex | null = null;

  /** The search results take the place of the navigation. */
  @state() private isSearching = false;

  @query('post-docs-search') private search!: PostDocsSearch;
  @query('post-docs-navigation-tree') private tree!: PostDocsNavigationTree;

  override createRenderRoot() {
    return this;
  }

  public focusSearch() {
    this.search.focus();
  }

  override render() {
    return html`
      <div class="palette palette-brand d-flex flex-shrink-0">
        <post-logo class="h-40" url="/">Swiss Post Design System, go to the homepage</post-logo>
      </div>
      <post-docs-search
        id-prefix="sidebar-search"
        .index=${this.searchIndex}
        @postDocsSearchToggle=${this.onSearchToggle}
      ></post-docs-search>
      <nav
        class="flex-fill overflow-y-auto pb-40"
        aria-label="Documentation"
        ?hidden=${this.isSearching}
      >
        <post-docs-navigation-tree
          id-prefix="sidebar"
          .sections=${this.sections}
          .activePage=${this.activePage}
        ></post-docs-navigation-tree>
      </nav>
    `;
  }

  // a hidden tree cannot reveal the active page, a page opened from the results is revealed once the tree is back
  private async onSearchToggle(event: CustomEvent<boolean>) {
    this.isSearching = event.detail;
    if (this.isSearching) return;

    await this.updateComplete;
    void this.tree.revealActivePage();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-navigation-sidebar': PostDocsNavigationSidebar;
  }
}

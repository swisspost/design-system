import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SearchEntry } from '../search/search-index';
import type { DocsSearch } from '../search/docs-search';
import type { SidebarSection } from './tree';
import '../search/docs-search';
import './docs-nav-tree';

/**
 * The sidebar shown from the `md` breakpoint up: logo band, search and navigation tree.
 * While the search shows results, they take the place of the tree.
 */
@customElement('docs-sidebar')
export class DocsSidebar extends LitElement {
  @property({ attribute: false }) sections: SidebarSection[] = [];
  @property({ attribute: false }) activeId?: string;
  @property({ attribute: false }) searchEntries: SearchEntry[] = [];

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="sidebar-header">
        <post-logo url="/">Swiss Post Design System, go to the homepage</post-logo>
      </div>
      <docs-search id-prefix="sidebar-search" .entries=${this.searchEntries}></docs-search>
      <nav class="sidebar-nav" aria-label="Documentation">
        <docs-nav-tree
          id-prefix="sidebar"
          .sections=${this.sections}
          .activeId=${this.activeId}
        ></docs-nav-tree>
      </nav>
    `;
  }

  focusSearch() {
    this.querySelector<DocsSearch>('docs-search')?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-sidebar': DocsSidebar;
  }
}

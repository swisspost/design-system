import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Page } from '../../catalog';
import type { NavigationSection } from '../../navigation/tree';
import '../post-docs-navigation-tree/post-docs-navigation-tree';
import './post-docs-navigation-sidebar.scss';

@customElement('post-docs-navigation-sidebar')
export class PostDocsNavigationSidebar extends LitElement {
  @property({ attribute: false }) public sections: NavigationSection[] = [];
  @property({ attribute: false }) public activePage: Page | null = null;

  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <div class="palette palette-brand d-flex flex-shrink-0">
        <post-logo class="h-40" url="/">Swiss Post Design System, go to the homepage</post-logo>
      </div>
      <nav class="flex-fill overflow-y-auto pb-40" aria-label="Documentation">
        <post-docs-navigation-tree
          id-prefix="sidebar"
          .sections=${this.sections}
          .activePage=${this.activePage}
        ></post-docs-navigation-tree>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-navigation-sidebar': PostDocsNavigationSidebar;
  }
}

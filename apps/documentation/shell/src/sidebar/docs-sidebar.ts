import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SidebarSection } from './tree';
import './docs-nav-tree';

/**
 * The sidebar shown from the `md` breakpoint up: logo band and navigation tree.
 */
@customElement('docs-sidebar')
export class DocsSidebar extends LitElement {
  @property({ attribute: false }) sections: SidebarSection[] = [];
  @property({ attribute: false }) activeId?: string;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="sidebar-header">
        <post-logo url="/">Swiss Post Design System, go to the homepage</post-logo>
      </div>
      <nav class="sidebar-nav" aria-label="Documentation">
        <docs-nav-tree
          id-prefix="sidebar"
          .sections=${this.sections}
          .activeId=${this.activeId}
        ></docs-nav-tree>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-sidebar': DocsSidebar;
  }
}

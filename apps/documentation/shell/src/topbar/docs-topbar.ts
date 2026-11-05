import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DEFAULT_GLOBALS, DocsGlobals } from '../storybook/docs-globals';
import './docs-globals-menus';
import './docs-version-menu';

/**
 * The yellow band at the top of the content column: the toolbar for the preview globals and the
 * version switcher. Below the `md` breakpoint, where the sidebar is hidden, it also holds the logo;
 * below `sm` the globals move into the mobile navigation sheet.
 */
@customElement('docs-topbar')
export class DocsTopbar extends LitElement {
  @property({ attribute: false }) globals: DocsGlobals = DEFAULT_GLOBALS;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <post-logo class="topbar-logo" url="/"
        >Swiss Post Design System, go to the homepage</post-logo
      >
      <docs-globals-menus
        class="topbar-controls"
        role="group"
        aria-label="Preview settings"
        id-prefix="topbar"
        .globals=${this.globals}
      ></docs-globals-menus>
      <docs-version-menu class="topbar-version"></docs-version-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-topbar': DocsTopbar;
  }
}

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DEFAULT_GLOBALS, type Globals } from '@shared/globals';
import '../post-docs-globals-menus/post-docs-globals-menus';
import '../post-docs-version-menu/post-docs-version-menu';
import './post-docs-toolbar.scss';

/**
 * The logo below the sidebar breakpoint, the preview settings from it up, and
 * the version menu.
 */
@customElement('post-docs-toolbar')
export class PostDocsToolbar extends LitElement {
  @property({ attribute: false }) public globals: Globals = DEFAULT_GLOBALS;

  protected override createRenderRoot() {
    return this;
  }

  protected override render(): TemplateResult {
    return html`
      <post-logo class="flex-shrink-0 h-40 d-md-none" url="/">
        Swiss Post Design System, go to the homepage
      </post-logo>
      <post-docs-globals-menus
        class="d-none d-md-flex gap-16 min-w-0"
        role="group"
        aria-label="Preview settings"
        id-prefix="toolbar"
        .globals=${this.globals}
      ></post-docs-globals-menus>
      <post-docs-version-menu
        class="d-flex flex-shrink-0 ms-auto pe-16 pe-md-0"
      ></post-docs-version-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-toolbar': PostDocsToolbar;
  }
}

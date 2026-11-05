import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { SidebarSection } from './tree';
import './docs-nav-tree';

/**
 * The navigation below the `md` breakpoint: a bar with the current location that opens the
 * navigation tree in a modal sheet.
 */
@customElement('docs-nav-mobile')
export class DocsNavMobile extends LitElement {
  @property({ attribute: false }) sections: SidebarSection[] = [];
  @property({ attribute: false }) activeId?: string;
  /** Where the current page is, e.g. "Components/Button" */
  @property() location = '';

  @query('dialog') private dialog!: HTMLDialogElement;

  createRenderRoot() {
    return this;
  }

  /** Closes the sheet, e.g. after a navigation. */
  close() {
    if (this.dialog?.open) this.dialog.close();
  }

  render() {
    return html`
      <button type="button" class="nav-mobile-bar" aria-haspopup="dialog" @click=${this.open}>
        <post-icon name="burger" aria-hidden="true"></post-icon>
        <span class="nav-mobile-location">
          <span class="visually-hidden">Navigation, current page: </span>${this.location}
        </span>
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>

      <dialog class="nav-sheet" aria-label="Navigation" @click=${this.onDialogClick}>
        <div class="nav-sheet-header">
          <post-logo url="/">Swiss Post Design System, go to the homepage</post-logo>
          <button type="button" class="nav-sheet-close" @click=${() => this.close()}>
            <post-icon name="closex" aria-hidden="true"></post-icon>
            <span class="visually-hidden">Close navigation</span>
          </button>
        </div>
        <nav class="nav-sheet-body" aria-label="Documentation">
          <docs-nav-tree
            id-prefix="sheet"
            .sections=${this.sections}
            .activeId=${this.activeId}
          ></docs-nav-tree>
        </nav>
      </dialog>
    `;
  }

  private open() {
    this.dialog.showModal();
    this.querySelector('docs-nav-tree')?.revealActive();
  }

  private onDialogClick(event: MouseEvent) {
    // a click on the backdrop targets the dialog itself
    if (event.target === this.dialog) this.close();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-nav-mobile': DocsNavMobile;
  }
}

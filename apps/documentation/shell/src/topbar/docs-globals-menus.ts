import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  DEFAULT_GLOBALS,
  DOCS_GLOBALS,
  DocsGlobals,
  GLOBAL_NAMES,
  GlobalName,
} from '../storybook/docs-globals';

/**
 * The dropdowns for the preview globals (theme, appearance, color scheme, palette).
 * Used in the top bar and, on small screens, in the mobile navigation sheet.
 *
 * @fires globals-change - The user picked another value; `detail` holds all globals.
 */
@customElement('docs-globals-menus')
export class DocsGlobalsMenus extends LitElement {
  @property({ attribute: false }) globals: DocsGlobals = DEFAULT_GLOBALS;
  /** Makes the menu ids unique when the controls are rendered more than once */
  @property({ attribute: 'id-prefix' }) idPrefix = 'globals';

  createRenderRoot() {
    return this;
  }

  render() {
    return GLOBAL_NAMES.map(name => this.renderMenu(name));
  }

  private renderMenu(name: GlobalName) {
    const { label, options } = DOCS_GLOBALS[name];
    const current = this.globals[name];
    const menuId = `${this.idPrefix}-menu-${name}`;

    return html`
      <post-menu-trigger for=${menuId}>
        <button class="toolbar-trigger">
          <span class="toolbar-trigger-text"
            ><span class="toolbar-trigger-label">${label}: </span
            ><strong>${options[current as keyof typeof options]}</strong></span
          >
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-menu-trigger>
      <post-menu id=${menuId} class="toolbar-menu" label=${label} placement="bottom-start">
        ${Object.entries(options).map(([value, text]) => {
          const selected = value === current;
          return html`<post-menu-item>
            <button
              aria-current=${selected ? 'true' : nothing}
              @click=${() => this.select(name, value)}
            >
              <span class="toolbar-menu-text">${text}</span>
              ${selected
                ? html`<post-icon name="checkmark" aria-hidden="true"></post-icon>`
                : nothing}
            </button>
          </post-menu-item>`;
        })}
      </post-menu>
    `;
  }

  private select(name: GlobalName, value: string) {
    if (this.globals[name] === value) return;

    this.dispatchEvent(
      new CustomEvent<DocsGlobals>('globals-change', {
        detail: { ...this.globals, [name]: value },
        bubbles: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-globals-menus': DocsGlobalsMenus;
  }
}

import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  DEFAULT_GLOBALS,
  GLOBAL_DEFINITIONS,
  type GlobalName,
  type Globals,
  SHARABLE_GLOBAL_NAMES,
} from '@shared/globals';
import './post-docs-globals-menus.scss';

/**
 * A menu per global that is not hidden (theme, appearance, color scheme, palette).
 *
 * @fires postDocsGlobalsChange - The user picked another value, `detail` holds the changed global.
 */
@customElement('post-docs-globals-menus')
export class PostDocsGlobalsMenus extends LitElement {
  @property({ attribute: false }) public globals: Globals = DEFAULT_GLOBALS;
  /** Makes the menu ids unique, the menus are rendered in the toolbar and in the navigation sheet. */
  @property({ attribute: 'id-prefix' }) public idPrefix = 'globals';

  protected override createRenderRoot() {
    return this;
  }

  private select(name: GlobalName, value: string) {
    if (this.globals[name] === value) return;

    this.dispatchEvent(
      new CustomEvent<Partial<Globals>>('postDocsGlobalsChange', {
        detail: { [name]: value },
        bubbles: true,
      }),
    );
  }

  private renderMenu(name: GlobalName): TemplateResult {
    const definition = GLOBAL_DEFINITIONS[name];
    const options: Record<string, string> = definition.options;
    const current = this.globals[name];
    const menuId = `${this.idPrefix}-globals-${name}`;

    return html`
      <post-menu-trigger for=${menuId}>
        <button class="d-flex align-items-center gap-8 m-0 p-0 border-0 fs-9 text-nowrap">
          <span>
            <span class="label">${definition.label}: </span>
            <strong>${options[current]}</strong>
          </span>
          <post-icon
            class="flex-shrink-0 w-16 h-16"
            name="chevrondown"
            aria-hidden="true"
          ></post-icon>
        </button>
      </post-menu-trigger>
      <post-menu id=${menuId} label=${definition.label} placement="bottom-start">
        ${Object.entries(options).map(([value, label]) => {
          const isCurrent = value === current;

          return html`
            <post-menu-item>
              <button
                type="button"
                aria-current=${isCurrent ? 'true' : nothing}
                @click=${() => this.select(name, value)}
              >
                <span class="flex-fill text-start">${label}</span>
                ${isCurrent
                  ? html`<post-icon name="checkmark" aria-hidden="true"></post-icon>`
                  : nothing}
              </button>
            </post-menu-item>
          `;
        })}
      </post-menu>
    `;
  }

  protected override render(): TemplateResult[] {
    return SHARABLE_GLOBAL_NAMES.map(name => this.renderMenu(name));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-globals-menus': PostDocsGlobalsMenus;
  }
}

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { STATUS_TAG_PREFIX, type StatusTag } from '@shared/tags';
import type { Page } from '../../catalog';
import { CATEGORY_ICON } from '../../config';
import { getRootDefinition } from '../../navigation/root';
import {
  getAncestorKeys,
  type NavigationNode,
  type NavigationSection,
} from '../../navigation/tree';
import './post-docs-navigation-tree.scss';

const NEW_TAG: StatusTag = `${STATUS_TAG_PREFIX}new`;

@customElement('post-docs-navigation-tree')
export class PostDocsNavigationTree extends LitElement {
  @property({ attribute: false }) public sections: NavigationSection[] = [];
  @property({ attribute: false }) public activePage: Page | null = null;

  /** Prefixes the ids of the collapsibles, so that two trees can be on the same page. */
  @property({ attribute: 'id-prefix' }) public idPrefix = 'navigation';

  // read once per collapsible, `post-collapsible` owns its state after the first render
  private readonly initiallyExpanded = new Map<string, boolean>();

  override createRenderRoot() {
    return this;
  }

  protected override willUpdate() {
    if (!this.activePage) return;

    // new folders leading to the active page start expanded, rendered ones are expanded in `updated`
    for (const key of getAncestorKeys(this.sections, this.activePage.id)) {
      if (!this.initiallyExpanded.has(key)) this.initiallyExpanded.set(key, true);
    }
  }

  protected override updated(changed: Map<string, unknown>) {
    if (changed.has('activePage')) void this.revealActivePage();
  }

  /**
   * Expands the folders leading to the active page and scrolls it into view.
   * A hidden tree is skipped, `post-collapsible` cannot animate it: its owner calls this again once it is shown.
   */
  public async revealActivePage() {
    if (!this.activePage || this.getClientRects().length === 0) return;

    // the collapsibles render in the next frame, collapsed ones only take their height then
    await new Promise(resolve => requestAnimationFrame(resolve));

    const toggles: Promise<boolean>[] = [];
    for (const key of getAncestorKeys(this.sections, this.activePage.id)) {
      const collapsible = this.querySelector<HTMLPostCollapsibleElement>(
        `#${CSS.escape(this.collapsibleId(key))}`,
      );
      if (collapsible) toggles.push(collapsible.toggle(true));
    }
    await Promise.all(toggles);

    this.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
  }

  override render() {
    return html`
      <ul class="list-unstyled">
        ${this.sections.map(section => this.renderSection(section))}
      </ul>
    `;
  }

  private renderSection(section: NavigationSection): unknown {
    if (section.type === 'flat') return section.nodes.map(node => this.renderNode(node, 0));

    const nodes = section.nodes.map(node => this.renderNode(node, node.depth));

    if (section.type === 'home') {
      return html`
        <li>
          <div class="item heading py-8 fw-black">
            ${renderIcon('home-solid')} ${renderLabel(section.label)}
          </div>
          <ul class="list-unstyled">
            ${nodes}
          </ul>
        </li>
      `;
    }

    return html`
      <li>
        ${this.renderTrigger(
          section.key,
          html`
            <button type="button" class="item heading py-8 fw-black">
              ${renderIcon('chevrondown', 'chevron')} ${renderLabel(section.label)}
              ${renderIcon(CATEGORY_ICON)}
            </button>
          `,
        )}
        ${this.renderCollapsible(section.key, nodes)}
      </li>
    `;
  }

  private renderNode(node: NavigationNode, depth: number): unknown {
    const isActive = node.page !== null && node.page.id === this.activePage?.id;
    const definition = getRootDefinition(node.root);
    const weight = definition.weight === 'regular' ? 'fw-normal' : 'fw-bold';
    const palette = isActive ? 'palette palette-accent' : '';

    if (node.children.length === 0) {
      return html`
        <li>
          <a
            class="item py-4 fs-8 ${weight} ${palette}"
            data-depth=${depth}
            href=${node.href ?? nothing}
            aria-current=${isActive ? 'page' : nothing}
          >
            ${renderIcon(definition.icon)} ${this.renderPageLabel(node)}
          </a>
        </li>
      `;
    }

    const children = node.children.map(child => this.renderNode(child, child.depth));

    // a page with subpages: the chevron expands the subpages, the label opens the page
    if (node.page) {
      return html`
        <li>
          <div class="item py-8 fs-8 ${weight} ${palette}" data-depth=${depth}>
            ${this.renderTrigger(
              node.key,
              html`
                <button type="button" class="toggle d-flex border-0">
                  ${renderIcon('chevrondown', 'chevron')}
                  <span class="visually-hidden">Subpages of ${node.label}</span>
                </button>
              `,
            )}
            <a
              class="flex-fill d-flex align-items-center gap-8 min-w-0"
              href=${node.href ?? nothing}
              aria-current=${isActive ? 'page' : nothing}
            >
              ${this.renderPageLabel(node)}
            </a>
            ${renderIcon('folder')}
          </div>
          ${this.renderCollapsible(node.key, children)}
        </li>
      `;
    }

    return html`
      <li>
        ${this.renderTrigger(
          node.key,
          html`
            <button type="button" class="item py-8 fs-8 ${weight}" data-depth=${depth}>
              ${renderIcon('chevrondown', 'chevron')} ${renderLabel(node.label)}
              ${renderIcon('folder')}
            </button>
          `,
        )}
        ${this.renderCollapsible(node.key, children)}
      </li>
    `;
  }

  private renderPageLabel(node: NavigationNode): unknown {
    const isNew = node.page?.tags.includes(NEW_TAG) ?? false;

    return html`
      ${renderLabel(node.label)}
      ${isNew ? html`<span class="tag tag-sm flex-shrink-0">New</span>` : nothing}
    `;
  }

  private renderTrigger(key: string, button: unknown): unknown {
    return html`
      <post-collapsible-trigger for=${this.collapsibleId(key)}>${button}</post-collapsible-trigger>
    `;
  }

  private renderCollapsible(key: string, content: unknown): unknown {
    if (!this.initiallyExpanded.has(key)) this.initiallyExpanded.set(key, false);

    return html`
      <post-collapsible
        id=${this.collapsibleId(key)}
        ?collapsed=${!this.initiallyExpanded.get(key)}
      >
        <ul class="list-unstyled">
          ${content}
        </ul>
      </post-collapsible>
    `;
  }

  private collapsibleId(key: string): string {
    return `${this.idPrefix}-${key}`;
  }
}

function renderIcon(name: string, className: string | null = null): unknown {
  return html`
    <post-icon
      class="flex-shrink-0 w-16 h-16 ${className ?? ''}"
      name=${name}
      aria-hidden="true"
    ></post-icon>
  `;
}

function renderLabel(label: string): unknown {
  return html`<span class="flex-fill min-w-0 text-truncate">${label}</span>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-navigation-tree': PostDocsNavigationTree;
  }
}

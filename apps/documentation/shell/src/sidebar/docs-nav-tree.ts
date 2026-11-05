import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  CATEGORY_ICON,
  REGULAR_WEIGHT_ROOTS,
  TAG_DEPRECATED,
  TAG_NEW,
  getPageIcon,
} from './config';
import { SidebarSection, TreeNode, getAncestorKeys } from './tree';

/**
 * The navigation tree, used in the desktop sidebar and in the mobile navigation sheet.
 * Rendered in the light DOM, so the design-system styles and `post-collapsible-trigger[for]` work.
 */
@customElement('docs-nav-tree')
export class DocsNavTree extends LitElement {
  @property({ attribute: false }) sections: SidebarSection[] = [];
  @property({ attribute: false }) activeId?: string;
  /** Prefix for the ids of the collapsibles, so two trees can live on the same page. */
  @property({ attribute: 'id-prefix' }) idPrefix = 'nav';

  /**
   * The initial state of every collapsible, by key. The state is read once per collapsible and
   * never re-bound, because `post-collapsible` owns it after the first render.
   */
  private readonly initiallyExpanded = new Map<string, boolean>();

  createRenderRoot() {
    return this;
  }

  protected willUpdate() {
    if (!this.activeId) return;

    // open the folders that lead to the current page; new folders start open, rendered ones are toggled in `updated`
    getAncestorKeys(this.sections, this.activeId).forEach(key => {
      if (!this.initiallyExpanded.has(key)) this.initiallyExpanded.set(key, true);
    });
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('activeId')) this.revealActive();
  }

  /**
   * Opens the folders that lead to the current page and scrolls it into view.
   * A hidden tree (e.g. the closed mobile sheet) is skipped: `post-collapsible` cannot animate
   * elements that are not rendered, so its owner calls this again once the tree is shown.
   */
  revealActive() {
    if (!this.activeId || this.getClientRects().length === 0) return;

    getAncestorKeys(this.sections, this.activeId).forEach(key => {
      this.querySelector<HTMLPostCollapsibleElement>(`#${this.collapsibleId(key)}`)?.toggle(true);
    });

    this.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
  }

  render() {
    return html`<ul class="nav-tree">
      ${this.sections.map(section => this.renderSection(section))}
    </ul>`;
  }

  private renderSection(section: SidebarSection) {
    switch (section.type) {
      case 'home':
        return html`<li>
          <div class="nav-row nav-heading">
            <post-icon name="home-solid" aria-hidden="true"></post-icon>
            <span class="nav-label">${section.label}</span>
          </div>
          <ul>
            ${section.nodes.map(node => this.renderNode(node))}
          </ul>
        </li>`;

      case 'flat':
        return section.nodes.map(node => this.renderNode(node, 0));

      case 'category':
        return html`<li>
          ${this.renderTrigger(
            section.key,
            html`<button type="button" class="nav-row nav-heading">
              <post-icon class="nav-chevron" name="chevrondown" aria-hidden="true"></post-icon>
              <span class="nav-label">${section.label}</span>
              <post-icon name=${CATEGORY_ICON} aria-hidden="true"></post-icon>
            </button>`,
          )}
          ${this.renderCollapsible(
            section.key,
            true,
            section.nodes.map(node => this.renderNode(node)),
          )}
        </li>`;
    }
  }

  private renderNode(node: TreeNode, depth = node.depth): unknown {
    const style = `--nav-depth: ${depth}`;
    const weight = REGULAR_WEIGHT_ROOTS.includes(node.root) ? 'nav-regular' : '';

    if (!node.children.length) {
      return html`<li>
        <a
          class="nav-row nav-page ${weight}"
          style=${style}
          href=${ifDefined(node.page?.path)}
          aria-current=${node.page?.id === this.activeId ? 'page' : nothing}
        >
          <post-icon name=${getPageIcon(node.root)} aria-hidden="true"></post-icon>
          ${this.renderLabel(node)}
        </a>
      </li>`;
    }

    const children = node.children.map(child => this.renderNode(child));
    const folderIcon = html`<post-icon name="folder" aria-hidden="true"></post-icon>`;
    const chevron = html`<post-icon
      class="nav-chevron"
      name="chevrondown"
      aria-hidden="true"
    ></post-icon>`;

    // a page with subpages: the label opens the page, the chevron opens the subpages
    if (node.page) {
      const isActive = node.page.id === this.activeId;
      return html`<li>
        <div class="nav-row nav-folder ${isActive ? 'nav-active' : ''}" style=${style}>
          ${this.renderTrigger(
            node.key,
            html`<button type="button" class="nav-toggle">
              ${chevron}
              <span class="visually-hidden">Subpages of ${node.label}</span>
            </button>`,
          )}
          <a class="nav-link" href=${node.page.path} aria-current=${isActive ? 'page' : nothing}>
            ${this.renderLabel(node)}
          </a>
          ${folderIcon}
        </div>
        ${this.renderCollapsible(node.key, false, children)}
      </li>`;
    }

    return html`<li>
      ${this.renderTrigger(
        node.key,
        html`<button type="button" class="nav-row nav-folder" style=${style}>
          ${chevron}
          <span class="nav-label">${node.label}</span>
          ${folderIcon}
        </button>`,
      )}
      ${this.renderCollapsible(node.key, false, children)}
    </li>`;
  }

  private renderLabel(node: TreeNode) {
    const tags = node.page?.tags ?? [];
    const isNew = tags.includes(TAG_NEW);

    if (tags.includes(TAG_DEPRECATED)) {
      return html`<span class="nav-label nav-deprecated"><s>${node.label}</s> (deprecated)</span>`;
    }

    return html`<span class="nav-label">${node.label}</span>${isNew
        ? html`<span class="tag tag-sm nav-new">New</span>`
        : nothing}`;
  }

  private renderTrigger(key: string, button: unknown) {
    return html`<post-collapsible-trigger for=${this.collapsibleId(key)}
      >${button}</post-collapsible-trigger
    >`;
  }

  private renderCollapsible(key: string, defaultExpanded: boolean, content: unknown) {
    if (!this.initiallyExpanded.has(key)) this.initiallyExpanded.set(key, defaultExpanded);

    return html`<post-collapsible
      id=${this.collapsibleId(key)}
      ?collapsed=${!this.initiallyExpanded.get(key)}
    >
      <ul>
        ${content}
      </ul>
    </post-collapsible>`;
  }

  private collapsibleId(key: string) {
    return `${this.idPrefix}-${key}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-nav-tree': DocsNavTree;
  }
}

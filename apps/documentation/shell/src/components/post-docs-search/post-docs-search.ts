import { LitElement, type PropertyValues, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SEARCH_SHORTCUT } from '@shared/shortcuts';
import { STATUS_TAG_PREFIX, type StatusTag } from '@shared/tags';
import { getRootDefinition } from '../../navigation/navigation';
import type { SearchIndex, SearchResult } from '../../catalog/search-index';
import './post-docs-search.scss';

const NEW_TAG: StatusTag = `${STATUS_TAG_PREFIX}new`;

/**
 * A combobox whose options are links. The field and the results are laid out by the container,
 * which hides its navigation while the results are shown.
 *
 * @fires postDocsSearchToggle - The results are shown (`detail: true`) or hidden (`detail: false`).
 * @fires postDocsSearchExit - The search is left: Escape in the empty field, or a result opened with Enter.
 */
@customElement('post-docs-search')
export class PostDocsSearch extends LitElement {
  @property({ attribute: false }) public index: SearchIndex | null = null;

  /** Prefixes the ids of the field and the results, so that two searches can be on the same page. */
  @property({ attribute: 'id-prefix' }) public idPrefix = 'search';

  @state() private query = '';
  @state() private activeIndex = 0;

  @query('input') private input!: HTMLInputElement;

  private results: SearchResult[] = [];

  override createRenderRoot() {
    return this;
  }

  /** Focuses the field and selects its text, e.g. for the search shortcut. */
  public override focus() {
    this.input.focus();
    this.input.select();
  }

  /** Empties the field, the navigation is shown again. */
  public clear() {
    this.query = '';
  }

  private get isActive(): boolean {
    return this.query.trim() !== '';
  }

  protected override willUpdate(changed: PropertyValues) {
    if (changed.has('query') || changed.has('index')) {
      this.results = this.index?.search(this.query) ?? [];
      this.activeIndex = 0;
    }
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has('query')) {
      const previousQuery = (changed.get('query') as string | undefined) ?? '';

      if ((previousQuery.trim() !== '') !== this.isActive) {
        this.dispatchEvent(
          new CustomEvent<boolean>('postDocsSearchToggle', {
            detail: this.isActive,
            bubbles: true,
          }),
        );
      }
    }

    if (changed.has('activeIndex') || changed.has('query')) {
      this.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }
  }

  override render() {
    const fieldId = `${this.idPrefix}-field`;
    const listId = `${this.idPrefix}-results`;
    const hasResults = this.results.length > 0;

    return html`
      <div class="p-16">
        <div class="field position-relative">
          <label class="visually-hidden" for=${fieldId}>Search the documentation</label>
          <post-icon class="icon w-16 h-16" name="search" aria-hidden="true"></post-icon>
          <input
            id=${fieldId}
            class="form-control form-control-sm"
            type="search"
            role="combobox"
            placeholder="Find Components"
            autocomplete="off"
            spellcheck="false"
            enterkeyhint="go"
            aria-autocomplete="list"
            aria-controls=${listId}
            aria-expanded=${String(hasResults)}
            aria-activedescendant=${hasResults ? this.optionId(this.activeIndex) : nothing}
            aria-keyshortcuts=${SEARCH_SHORTCUT.keys}
            .value=${this.query}
            @input=${this.onInput}
            @keydown=${this.onKeydown}
          />
          ${this.isActive
            ? html`
                <button type="button" class="clear d-flex" @click=${this.onClear}>
                  <post-icon class="w-16 h-16" name="closex" aria-hidden="true"></post-icon>
                  <span class="visually-hidden">Clear the search</span>
                </button>
              `
            : html`
                <kbd class="shortcut fs-11 fw-bold" aria-hidden="true"
                  >${SEARCH_SHORTCUT.label}</kbd
                >
              `}
        </div>
      </div>

      <div class="results flex-fill overflow-y-auto pb-40" ?hidden=${!this.isActive}>
        <ul
          id=${listId}
          class="list-unstyled m-0"
          role="listbox"
          aria-label="Search results"
          ?hidden=${!hasResults}
        >
          ${this.results.map((result, index) => this.renderOption(result, index))}
        </ul>
        ${this.isActive && !hasResults
          ? html`<p class="px-16 py-8 m-0 fs-8">No pages found for “${this.query.trim()}”.</p>`
          : nothing}
      </div>

      <div class="visually-hidden" role="status">${this.renderStatus()}</div>
    `;
  }

  private renderOption(result: SearchResult, index: number): unknown {
    const entry = result.entry;
    const isNew = entry.page.tags.includes(NEW_TAG);

    return html`
      <li role="presentation">
        <a
          id=${this.optionId(index)}
          class="option d-flex align-items-start gap-8 px-16 py-8 fs-8"
          role="option"
          tabindex="-1"
          href=${entry.href}
          aria-selected=${String(index === this.activeIndex)}
          @click=${this.onOptionClick}
        >
          <post-icon
            class="flex-shrink-0 w-16 h-16 mt-4"
            name=${getRootDefinition(entry.page.segments[0]).icon}
            aria-hidden="true"
          ></post-icon>
          <span class="d-flex flex-column min-w-0">
            <span class="d-flex align-items-center gap-8 fw-bold">
              ${entry.name}
              ${isNew ? html`<span class="tag tag-sm flex-shrink-0">New</span>` : nothing}
            </span>
            ${entry.context ? html`<span class="detail fs-9">${entry.context}</span>` : nothing}
            ${result.keyword
              ? html`<span class="detail fs-9">Keyword: “${result.keyword}”</span>`
              : nothing}
          </span>
        </a>
      </li>
    `;
  }

  private renderStatus(): string {
    if (!this.isActive) return '';

    const count = this.results.length;
    if (count === 0) return 'No results';
    return count === 1 ? '1 result' : `${count} results`;
  }

  private optionId(index: number): string {
    return `${this.idPrefix}-option-${index}`;
  }

  private onInput(event: InputEvent) {
    this.query = (event.target as HTMLInputElement).value;
  }

  private onKeydown(event: KeyboardEvent) {
    const count = this.results.length;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        if (count === 0) return;

        event.preventDefault();
        const step = event.key === 'ArrowDown' ? 1 : count - 1;
        this.activeIndex = (this.activeIndex + step) % count;
        break;
      }

      case 'Enter':
        if (count === 0) return;

        // a click on the link, the router opens it like any other link, then the page takes the focus
        event.preventDefault();
        this.querySelector<HTMLAnchorElement>(`#${this.optionId(this.activeIndex)}`)?.click();
        this.exit();
        break;

      case 'Escape':
        // the search owns Escape: a query is cleared, an empty field leaves the search
        event.preventDefault();
        event.stopPropagation();

        if (this.query) this.clear();
        else this.exit();
        break;
    }
  }

  private exit() {
    this.dispatchEvent(new CustomEvent('postDocsSearchExit', { bubbles: true }));
  }

  private onClear() {
    this.clear();
    this.input.focus();
  }

  // a click that opens the page elsewhere, e.g. in a new tab, keeps the results
  private onOptionClick(event: MouseEvent) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    this.clear();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-search': PostDocsSearch;
  }
}

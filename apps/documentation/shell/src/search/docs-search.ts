import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { TAG_NEW, getPageIcon } from '../sidebar/config';
import { SearchEntry, SearchResult, search } from './search-index';

const IS_APPLE = /Mac|iPhone|iPad/.test(navigator.userAgent);

/**
 * The search field of the sidebar and the mobile navigation (Figma "Search / Desktop").
 * A combobox: the results replace the navigation below the field while there is a query.
 * Results are links, so opening one goes through the shell's link handling like any other link.
 *
 * The host reflects `active` while results are shown, so its container can hide the navigation,
 * and fires `search-active-change` (detail: `active`) when that changes.
 */
@customElement('docs-search')
export class DocsSearch extends LitElement {
  @property({ attribute: false }) entries: SearchEntry[] = [];
  /** Makes the element ids unique when the search is rendered more than once */
  @property({ attribute: 'id-prefix' }) idPrefix = 'search';
  @property({ type: Boolean, reflect: true }) active = false;

  @state() private query = '';
  @state() private activeIndex = 0;

  @query('input') private input!: HTMLInputElement;

  private results: SearchResult[] = [];

  createRenderRoot() {
    return this;
  }

  /** Focuses the field and selects its text, e.g. for the ⌘K shortcut. */
  focus() {
    this.input.focus();
    this.input.select();
  }

  /** Empties the field; the navigation is shown again. */
  clear() {
    this.query = '';
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('query') || changed.has('entries')) {
      this.results = search(this.entries, this.query);
      this.activeIndex = 0;
    }
    this.active = this.query.trim() !== '';
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('active') && changed.get('active') !== undefined) {
      this.dispatchEvent(
        new CustomEvent('search-active-change', { detail: this.active, bubbles: true }),
      );
    }
    if (changed.has('activeIndex')) {
      this.querySelector('[role="option"][aria-selected="true"]')?.scrollIntoView({
        block: 'nearest',
      });
    }
  }

  render() {
    const listId = `${this.idPrefix}-results`;
    const hasResults = this.active && this.results.length > 0;

    return html`
      <div class="search-band">
        <div class="search-field">
          <post-icon class="search-icon" name="search" aria-hidden="true"></post-icon>
          <input
            class="form-control form-control-sm search-input"
            type="search"
            role="combobox"
            aria-label="Search components and pages"
            placeholder="Find Components"
            autocomplete="off"
            spellcheck="false"
            enterkeyhint="go"
            aria-autocomplete="list"
            aria-controls=${listId}
            aria-expanded=${String(hasResults)}
            aria-activedescendant=${hasResults ? this.optionId(this.activeIndex) : nothing}
            aria-keyshortcuts=${IS_APPLE ? 'Meta+K' : 'Control+K'}
            .value=${this.query}
            @input=${this.onInput}
            @keydown=${this.onKeydown}
          />
          ${this.active
            ? html`<button type="button" class="search-clear" @click=${this.onClear}>
                <post-icon name="closex" aria-hidden="true"></post-icon>
                <span class="visually-hidden">Clear search</span>
              </button>`
            : html`<kbd class="search-shortcut" aria-hidden="true"
                >${IS_APPLE ? '⌘K' : 'Ctrl K'}</kbd
              >`}
        </div>
      </div>

      <div class="search-results" ?hidden=${!this.active}>
        <ul id=${listId} role="listbox" aria-label="Search results" ?hidden=${!hasResults}>
          ${hasResults ? this.results.map((result, i) => this.renderOption(result, i)) : nothing}
        </ul>
        ${this.active && !hasResults
          ? html`<p class="search-empty">No pages found for “${this.query.trim()}”.</p>`
          : nothing}
      </div>

      <div class="visually-hidden" role="status">${this.getStatus()}</div>
    `;
  }

  private renderOption({ entry, alias }: SearchResult, index: number) {
    return html`<li role="presentation">
      <a
        id=${this.optionId(index)}
        class="search-option"
        role="option"
        tabindex="-1"
        href=${entry.page.path}
        aria-selected=${String(index === this.activeIndex)}
        @click=${this.onOptionClick}
      >
        <post-icon name=${getPageIcon(entry.page.segments[0])} aria-hidden="true"></post-icon>
        <span class="search-option-text">
          <span class="search-option-name"
            >${entry.name}${entry.page.tags.includes(TAG_NEW)
              ? html` <span class="tag tag-sm">New</span>`
              : nothing}</span
          >
          ${entry.context || alias
            ? html`<span class="search-option-detail">
                ${entry.context ? html`<span>${entry.context}</span>` : nothing}
                ${alias ? html`<span>Also known as “${alias}”</span>` : nothing}
              </span>`
            : nothing}
        </span>
      </a>
    </li>`;
  }

  private getStatus(): string {
    if (!this.active) return '';
    const count = this.results.length;
    if (count === 0) return 'No results';
    return count === 1 ? '1 result' : `${count} results`;
  }

  private optionId(index: number) {
    return `${this.idPrefix}-option-${index}`;
  }

  private onInput(event: InputEvent) {
    this.query = (event.target as HTMLInputElement).value;
  }

  private onKeydown(event: KeyboardEvent) {
    const count = this.results.length;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!count) return;
        event.preventDefault();
        this.activeIndex = (this.activeIndex + (event.key === 'ArrowDown' ? 1 : count - 1)) % count;
        break;

      case 'Enter':
        if (!count) return;
        event.preventDefault();
        // a click on the link: the shell opens it like any other internal link
        this.querySelector<HTMLAnchorElement>(`#${this.optionId(this.activeIndex)}`)?.click();
        break;

      case 'Escape':
        // with an empty field, Escape is left to the container (e.g. it closes the mobile navigation)
        if (!this.query) return;
        event.preventDefault();
        event.stopPropagation();
        this.clear();
        break;
    }
  }

  private onClear() {
    this.clear();
    this.input.focus();
  }

  /**
   * The shell opens the page (document click handler); the search makes way for the navigation.
   * A click that opens the page elsewhere (new tab or window) keeps the results.
   */
  private onOptionClick(event: MouseEvent) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    this.clear();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-search': DocsSearch;
  }
}

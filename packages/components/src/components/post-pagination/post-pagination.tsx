import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { checkEmptyOrType, checkRequiredAndType } from '@/utils';

const ELLIPSIS = '...';
const DELTA = 2;

/**
 * Type-safe pagination item definition using discriminated union.
 * This ensures TypeScript can distinguish between page and ellipsis items.
 */
type PaginationItem = 
  | { type: 'page'; page: number }
  | { type: 'ellipsis' };

@Component({
  tag: 'post-pagination',
  styleUrl: './post-pagination.scss',
  shadow: false,
})
export class PostPagination {
  @Element() host: HTMLPostPaginationElement;

  @State() private paginationId: string;

  /**
   * The current active page number (1-indexed).
   */
  @Prop({ mutable: true }) page: number = 1;

  /**
   * The number of items per page.
   */
  @Prop() pageSize: number = 10;

  /**
   * The total number of items in the collection.
   */
  @Prop() collectionSize: number = 0;

  /**
   * Accessible label for the pagination navigation.
   */
  @Prop() readonly ariaLabel: string = 'Pagination';

  /**
   * Accessible label for the previous page button.
   */
  @Prop() readonly labelPrevious: string = 'Previous page';

  /**
   * Accessible label for the next page button.
   */
  @Prop() readonly labelNext: string = 'Next page';

  /**
   * Prefix text for page number labels.
   */
  @Prop() readonly labelPage: string = 'Page';

  /**
   * Prefix text for the first page label.
   */
  @Prop() readonly labelFirst: string = 'First page';

  /**
   * Prefix text for the last page label.
   */
  @Prop() readonly labelLast: string = 'Last page';

  /**
   * If true, the pagination is disabled.
   */
  @Prop() readonly disabled: boolean = false;

  /**
   * Type-safe array of pagination items.
   * Uses discriminated union type for better type safety.
   * Contains page numbers and ellipsis markers.
   */
  @State() private items: PaginationItem[] = [];

  /**
   * Event emitted when the page changes.
   */
  @Event({
    eventName: 'postChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  postChange: EventEmitter<number>;

  @Watch('page')
  validatePage() {
    checkEmptyOrType(this, 'page', 'number');
  }

  @Watch('pageSize')
  validatePageSize() {
    checkEmptyOrType(this, 'pageSize', 'number');
  }

  @Watch('collectionSize')
  validateCollectionSize() {
    checkEmptyOrType(this, 'collectionSize', 'number');
  }

  @Watch('ariaLabel')
  validateAriaLabel() {
    checkRequiredAndType(this, 'ariaLabel', 'string');
  }

  @Watch('labelPrevious')
  validateLabelPrevious() {
    checkRequiredAndType(this, 'labelPrevious', 'string');
  }

  @Watch('labelNext')
  validateLabelNext() {
    checkRequiredAndType(this, 'labelNext', 'string');
  }

  @Watch('labelPage')
  validateLabelPage() {
    checkRequiredAndType(this, 'labelPage', 'string');
  }

  @Watch('labelFirst')
  validateLabelFirst() {
    checkRequiredAndType(this, 'labelFirst', 'string');
  }

  @Watch('labelLast')
  validateLabelLast() {
    checkRequiredAndType(this, 'labelLast', 'string');
  }

  @Watch('disabled')
  validateDisabled() {
    checkEmptyOrType(this, 'disabled', 'boolean');
  }

  @Watch('page')
  @Watch('pageSize')
  @Watch('collectionSize')
  handlePropsChange() {
    this.validateAndUpdatePages();
  }

  componentWillLoad() {
    this.paginationId = `pagination-${this.host.id || nanoid(6)}`;

    this.validatePage();
    this.validatePageSize();
    this.validateCollectionSize();
    this.validateAriaLabel();
    this.validateLabelPrevious();
    this.validateLabelNext();
    this.validateLabelPage();
    this.validateLabelFirst();
    this.validateLabelLast();
    this.validateDisabled();
    this.validateAndUpdatePages();
  }

  /**
   * Validates and clamps the page number to valid range.
   */
  private validateAndUpdatePages() {
    const totalPages = this.getTotalPages();

    if (this.page < 1) {
      this.page = 1;
    } else if (totalPages > 0 && this.page > totalPages) {
      this.page = totalPages;
    }

    if (totalPages === 0 || this.collectionSize === 0) {
      this.page = 1;
    }

    this.generatePages(totalPages);
  }

  /**
   * Calculates the total number of pages.
   */
  private getTotalPages(): number {
    if (this.collectionSize === 0 || this.pageSize === 0) {
      return 1;
    }
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  /**
   * Generates the page numbers array with ellipsis where appropriate.
   * Returns a typed array of PaginationItem objects.
   * 
   * Algorithm:
   * - If total pages <= 7: show all pages
   * - Otherwise: show first page, pages around current (±DELTA), and last page
   * - Add ellipsis for gaps > 1 page
   * 
   * @param totalPages - Total number of pages to display
   */
  private generatePages(totalPages: number) {
    const items: PaginationItem[] = [];

    // If total pages is small, show all pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      this.items = items;
      return;
    }

    // Generate range around current page
    const range: number[] = [];

    // Always include first page
    range.push(1);

    // Add pages around current page (±DELTA)
    for (let i = this.page - DELTA; i <= this.page + DELTA; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always include last page
    range.push(totalPages);

    // Add ellipsis where there are gaps, then add to items array
    let lastPage: number | undefined;
    for (const page of range) {
      if (lastPage !== undefined) {
        const gap = page - lastPage;
        
        if (gap === 2) {
          // Gap of 1 page: show the page instead of ellipsis
          items.push({ type: 'page', page: lastPage + 1 });
        } else if (gap > 2) {
          // Gap of 2+ pages: show ellipsis
          items.push({ type: 'ellipsis' });
        }
      }
      
      items.push({ type: 'page', page });
      lastPage = page;
    }

    this.items = items;
  }

  /**
   * Handles page change when a page button is clicked.
   */
  private handlePageClick(pageNumber: number) {
    if (this.disabled || pageNumber === this.page) {
      return;
    }

    this.page = pageNumber;
    this.postChange.emit(pageNumber);
  }

  /**
   * Handles previous button click.
   */
  private handlePrevious() {
    if (this.disabled || this.page <= 1) {
      return;
    }

    const newPage = this.page - 1;
    this.page = newPage;
    this.postChange.emit(newPage);
  }

  /**
   * Handles next button click.
   */
  private handleNext() {
    const totalPages = this.getTotalPages();
    if (this.disabled || this.page >= totalPages) {
      return;
    }

    const newPage = this.page + 1;
    this.page = newPage;
    this.postChange.emit(newPage);
  }

  /**
   * Handles keyboard events on page buttons.
   */
  private handleKeyDown(event: KeyboardEvent, pageNumber: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlePageClick(pageNumber);
    }
  }

  /**
   * Builds accessible label for a page button.
   */
  private buildPageLabel(pageNumber: number): string {
    const totalPages = this.getTotalPages();
    const isFirst = pageNumber === 1;
    const isLast = pageNumber === totalPages;

    if (isFirst) {
      return `${this.labelFirst}, ${this.labelPage} ${pageNumber}`;
    } else if (isLast) {
      return `${this.labelLast}, ${this.labelPage} ${pageNumber}`;
    }

    return `${this.labelPage} ${pageNumber}`;
  }

  /**
   * Renders an ellipsis item.
   * Non-interactive, hidden from screen readers.
   * 
   * @returns JSX element for ellipsis
   */
  private renderEllipsis() {
    return (
      <li class="pagination-item pagination-ellipsis">
        <span class="pagination-ellipsis-content" aria-hidden="true">
          {ELLIPSIS}
        </span>
      </li>
    );
  }

  /**
   * Renders a page button.
   * Type-narrowed version: only receives page numbers.
   * 
   * @param pageNumber - The page number for this button
   * @returns JSX element for page button
   */
  private renderPageButton(pageNumber: number) {
    const isCurrent = pageNumber === this.page;
    const ariaLabel = this.buildPageLabel(pageNumber);

    return (
      <li class="pagination-item" key={`page-${pageNumber}`}>
        <button
          type="button"
          class={{
            'pagination-link': true,
            'pagination-link-active': isCurrent,
          }}
          aria-label={ariaLabel}
          aria-current={isCurrent ? 'page' : undefined}
          onClick={() => this.handlePageClick(pageNumber)}
          onKeyDown={(e) => this.handleKeyDown(e, pageNumber)}
          disabled={this.disabled}
          tabIndex={this.disabled ? -1 : 0}
        >
          <span aria-hidden="true">{pageNumber}</span>
        </button>
      </li>
    );
  }

  /**
   * Renders a pagination item.
   * Uses type narrowing to call appropriate render method based on item type.
   * 
   * @param item - PaginationItem (either page or ellipsis)
   * @param index - Index for key
   * @returns JSX element
   */
  private renderItem(item: PaginationItem, index: number) {
    if (item.type === 'ellipsis') {
      return <div key={`ellipsis-${index}`}>{this.renderEllipsis()}</div>;
    }

    // TypeScript knows item.page exists due to type narrowing
    return this.renderPageButton(item.page);
  }

  render() {
    const totalPages = this.getTotalPages();
    const isPrevDisabled = this.disabled || this.page <= 1;
    const isNextDisabled = this.disabled || this.page >= totalPages;

    if (totalPages <= 1) {
      return null;
    }

    return (
      <Host slot="post-pagination" data-version={version}>
        <nav
          class="pagination"
          aria-label={this.ariaLabel}
          id={this.paginationId}
        >
          <ul class="pagination-list" role="list">
            {/* Previous Button */}
            <li class="pagination-item pagination-control">
              <button
                type="button"
                class={{
                  'pagination-link': true,
                  'pagination-control-button': true,
                  'pagination-link-disabled': isPrevDisabled,
                }}
                aria-label={this.labelPrevious}
                onClick={() => this.handlePrevious()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handlePrevious();
                  }
                }}
                disabled={isPrevDisabled}
                tabIndex={isPrevDisabled ? -1 : 0}
              >
                <post-icon name="chevronleft" aria-hidden="true"></post-icon>
                <span class="visually-hidden">{this.labelPrevious}</span>
              </button>
            </li>

            {/* Page Items - Rendered with type-safe items */}
            {this.items.map((item, index) => this.renderItem(item, index))}

            {/* Next Button */}
            <li class="pagination-item pagination-control">
              <button
                type="button"
                class={{
                  'pagination-link': true,
                  'pagination-control-button': true,
                  'pagination-link-disabled': isNextDisabled,
                }}
                aria-label={this.labelNext}
                onClick={() => this.handleNext()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleNext();
                  }
                }}
                disabled={isNextDisabled}
                tabIndex={isNextDisabled ? -1 : 0}
              >
                <post-icon name="chevronright" aria-hidden="true"></post-icon>
                <span class="visually-hidden">{this.labelNext}</span>
              </button>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}
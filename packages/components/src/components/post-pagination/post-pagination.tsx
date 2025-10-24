import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';

const ELLIPSIS = '...';
const DELTA = 2; // Number of pages to show on each side of current page

@Component({
  tag: 'post-pagination',
  styleUrl: './post-pagination.scss',
  shadow: false,
})
export class PostPagination {
  private paginationId = `pagination-${PostPagination.paginationCounter++}`;
  private static paginationCounter = 0;

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
  @Prop() ariaLabel: string = 'Pagination';

  /**
   * If true, the pagination is disabled.
   */
  @Prop() disabled: boolean = false;

  @State() private pages: (number | string)[] = [];

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
  @Watch('pageSize')
  @Watch('collectionSize')
  handlePropsChange() {
    this.validateAndUpdatePage();
    this.updatePages();
  }

  componentWillLoad() {
    this.validateAndUpdatePage();
    this.updatePages();
  }

  /**
   * Validates and clamps the page number to valid range.
   */
  private validateAndUpdatePage() {
    const totalPages = this.getTotalPages();

    // Clamp page to valid range
    if (this.page < 1) {
      this.page = 1;
    } else if (totalPages > 0 && this.page > totalPages) {
      this.page = totalPages;
    }

    // Handle edge case: if collectionSize is 0 or smaller than pageSize
    if (totalPages === 0 || this.collectionSize === 0) {
      this.page = 1;
    }
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
   * Algorithm based on common pagination patterns with configurable delta.
   */
  private updatePages() {
    const totalPages = this.getTotalPages();
    const current = this.page;
    const delta = DELTA;

    // If total pages is small, show all pages
    if (totalPages <= 7) {
      this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      return;
    }

    // Generate range around current page
    const range: number[] = [];
    const rangeWithEllipsis: (number | string)[] = [];

    // Always include first page
    range.push(1);

    // Add pages around current page
    for (let i = current - delta; i <= current + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always include last page
    range.push(totalPages);

    // Add ellipsis where there are gaps
    let lastPage: number | undefined;
    for (const page of range) {
      if (lastPage !== undefined) {
        if (page - lastPage === 2) {
          // If gap is exactly 2, show the page in between
          rangeWithEllipsis.push(lastPage + 1);
        } else if (page - lastPage !== 1) {
          // If gap is larger than 2, add ellipsis
          rangeWithEllipsis.push(ELLIPSIS);
        }
      }
      rangeWithEllipsis.push(page);
      lastPage = page;
    }

    this.pages = rangeWithEllipsis;
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
   * Renders a page button.
   */
  private renderPageButton(pageItem: number | string, index: number) {
    const isEllipsis = pageItem === ELLIPSIS;
    const isCurrent = pageItem === this.page;
    const totalPages = this.getTotalPages();

    if (isEllipsis) {
      return (
        <li class="pagination-item pagination-ellipsis" key={`ellipsis-${index}`}>
          <span class="pagination-link" aria-hidden="true">
            {ELLIPSIS}
          </span>
        </li>
      );
    }

    const pageNumber = pageItem as number;
    const isFirst = pageNumber === 1;
    const isLast = pageNumber === totalPages;

    // Generate accessible label
    let ariaLabel = `Page ${pageNumber}`;
    if (isFirst) {
      ariaLabel = `First page, page ${pageNumber}`;
    } else if (isLast) {
      ariaLabel = `Last page, page ${pageNumber}`;
    }

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
          disabled={this.disabled}
        >
          {pageNumber}
        </button>
      </li>
    );
  }

  render() {
    const totalPages = this.getTotalPages();
    const isPrevDisabled = this.disabled || this.page <= 1;
    const isNextDisabled = this.disabled || this.page >= totalPages;

    // Don't render pagination if there's only one page or no items
    if (totalPages <= 1) {
      return null;
    }

    return (
      <Host slot="post-pagination" version={version}>
        <nav class="pagination" aria-label={this.ariaLabel} id={this.paginationId}>
          <ul class="pagination-list">
            {/* Previous Button */}
            <li class="pagination-item pagination-control">
              <button
                type="button"
                class={{
                  'pagination-link': true,
                  'pagination-link-disabled': isPrevDisabled,
                }}
                aria-label="Previous page"
                onClick={() => this.handlePrevious()}
                disabled={isPrevDisabled}
                tabIndex={isPrevDisabled ? -1 : 0}
              >
                <post-icon name="chevronleft" aria-hidden="true"></post-icon>
                <span class="sr-only">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {this.pages.map((pageItem, index) => this.renderPageButton(pageItem, index))}

            {/* Next Button */}
            <li class="pagination-item pagination-control">
              <button
                type="button"
                class={{
                  'pagination-link': true,
                  'pagination-link-disabled': isNextDisabled,
                }}
                aria-label="Next page"
                onClick={() => this.handleNext()}
                disabled={isNextDisabled}
                tabIndex={isNextDisabled ? -1 : 0}
              >
                <post-icon name="chevronright" aria-hidden="true"></post-icon>
                <span class="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}

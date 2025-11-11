import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { checkEmptyOrType, checkRequiredAndType } from '@/utils';

const ELLIPSIS = '...';
const DELTA = 2;

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
   * Used for screen readers and accessible name generation.
   */
  @Prop() readonly labelPrevious: string = 'Previous page';

  /**
   * Accessible label for the next page button.
   * Used for screen readers and accessible name generation.
   */
  @Prop() readonly labelNext: string = 'Next page';

  /**
   * Prefix text for page number labels.
   * Used in aria-label construction (e.g., "Page 5").
   */
  @Prop() readonly labelPage: string = 'Page';

  /**
   * Prefix text for the first page label.
   * Used in aria-label construction (e.g., "First page, page 1").
   */
  @Prop() readonly labelFirst: string = 'First page';

  /**
   * Prefix text for the last page label.
   * Used in aria-label construction (e.g., "Last page, page 20").
   */
  @Prop() readonly labelLast: string = 'Last page';

  /**
   * If true, the pagination is disabled.
   */
  @Prop() readonly disabled: boolean = false;

  @State() private pages: (number | string)[] = [];

  /**
   * Event emitted when the page changes.
   * Payload is the new page number.
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
    // Get the id set on the host element or use a random id by default
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
   * Algorithm uses DELTA=2 to show pages around current page.
   * If total pages <= 7, all pages are shown.
   * Otherwise, first page, pages around current (±DELTA), and last page are shown with ellipsis for gaps.
   */
  private generatePages(totalPages: number) {
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
    for (let i = this.page - DELTA; i <= this.page + DELTA; i++) {
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
          rangeWithEllipsis.push(lastPage + 1);
        } else if (page - lastPage !== 1) {
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
   * Includes contextual information for first and last pages.
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
   * Renders a page button.
   */
  private renderPageButton(pageItem: number | string, index: number) {
    const isEllipsis = pageItem === ELLIPSIS;
    const isCurrent = pageItem === this.page;

    if (isEllipsis) {
      return (
        <li class="pagination-item pagination-ellipsis" key={`ellipsis-${index}`}>
          <span class="pagination-ellipsis-content" aria-hidden="true">
            {ELLIPSIS}
          </span>
        </li>
      );
    }

    const pageNumber = pageItem as number;
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

  render() {
    const totalPages = this.getTotalPages();
    const isPrevDisabled = this.disabled || this.page <= 1;
    const isNextDisabled = this.disabled || this.page >= totalPages;

    if (totalPages <= 1) {
      return null;
    }

    return (
      <Host slot="post-pagination" version={version}>
        <nav class="pagination" aria-label={this.ariaLabel} id={this.paginationId}>
          <ul class="pagination-list" role="list">
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

            {this.pages.map((pageItem, index) => this.renderPageButton(pageItem, index))}

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
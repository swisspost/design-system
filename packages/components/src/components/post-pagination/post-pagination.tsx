import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { checkEmptyOrType, checkRequiredAndType, debounce } from '@/utils';

const ELLIPSIS = '...';

/**
 * Type-safe pagination item definition using discriminated union.
 */
type PaginationItem = 
  | { type: 'page'; page: number }
  | { type: 'ellipsis' };

// Helper type used when generating sections around the page range
type SectionType = 'none' | 'page' | 'ellipsis';

@Component({
  tag: 'post-pagination',
  styleUrl: './post-pagination.scss',
  shadow: false,
})
export class PostPagination {
  @Element() host: HTMLPostPaginationElement;
  
  @State() private paginationId: string;
  @State() private maxVisiblePages: number;
  
  /**
   * The current active page number (1-indexed).
   */
  @Prop({ mutable: true }) page?: number;
  
  /**
   * The number of items per page.
   */
  @Prop({ reflect: true }) pageSize!: number;
  
  /**
   * The total number of items in the collection.
   */
  @Prop({ reflect: true }) collectionSize!: number;
  
  /**
   * Accessible label for the pagination navigation.
   */
  @Prop({ reflect: true }) readonly label!: string;

  /**
   * Accessible label for the previous page button.
   */
  @Prop({ reflect: true }) readonly labelPrevious!: string;

  /**
   * Accessible label for the next page button.
   */
  @Prop({ reflect: true }) readonly labelNext!: string;

  /**
   * Prefix text for page number labels.
   */
  @Prop({ reflect: true }) readonly labelPage!: string;

  /**
   * Prefix text for the first page label.
   */
  @Prop({ reflect: true }) readonly labelFirst!: string;

  /**
   * Prefix text for the last page label.
   */
  @Prop({ reflect: true }) readonly labelLast!: string;

  /**
   * If true, the pagination is disabled.
   */
  @Prop() readonly disabled: boolean = false;

  /**
   * Type-safe array of pagination items.
   */
  @State() private items: PaginationItem[] = [];

  /**
   * Event emitted when the page changes.
   */
  @Event() postChange: EventEmitter<number>;

  private navRef?: HTMLElement;
  private hiddenItemsRef?: HTMLElement;
  private lastWindowWidth: number;

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
  
  @Watch('label')
  validateLabel() {
    checkRequiredAndType(this, 'label', 'string');
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
    this.validateLabel();
    this.validateLabelPrevious();
    this.validateLabelNext();
    this.validateLabelPage();
    this.validateLabelFirst();
    this.validateLabelLast();
    this.validateDisabled();
  }

  componentDidLoad() {
    window.addEventListener('resize', this.handleResize);
    this.waitForMeasurement();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Waits for the pagination elements to be available and measures them
   */
  private waitForMeasurement = debounce(() => {
    if (this.navRef?.clientWidth > 0 && this.hiddenItemsRef) {
      this.measureAndCalculateVisiblePages();
    } else {
      this.waitForMeasurement();
    }
  }, 50);

  /**
   * Handles window resize events
   */
  private handleResize = () => {
    if (window.innerWidth === this.lastWindowWidth) return;
    this.lastWindowWidth = window.innerWidth;
    this.measureAndCalculateVisiblePages();
  };

  /**
   * Measures actual rendered elements to determine how many pages can fit
   */
  private measureAndCalculateVisiblePages() {
    if (!this.navRef || !this.hiddenItemsRef) return;

    const totalPages = this.getTotalPages();
    if (totalPages <= 1) return;

    // Get available width and subtract pagination padding
    const paginationPadding = this.getPaginationPadding();
    const availableWidth = this.getAvailableWidth() - paginationPadding;

    // Measure control buttons (prev/next)
    const controlButtons = Array.from(
      this.hiddenItemsRef.querySelectorAll('.hidden-control-button')
    );
    const controlButtonsWidth = controlButtons.reduce((sum, el) => {
      return sum + (el as HTMLElement).getBoundingClientRect().width;
    }, 0);

    const allHiddenItems = Array.from(
      this.hiddenItemsRef.querySelectorAll('.hidden-page-button, .hidden-ellipsis')
    );

    if (allHiddenItems.length === 0) {
      return;
    }

    // Measure single page button width
    const singleButtonWidth = (allHiddenItems[0] as HTMLElement).getBoundingClientRect().width;

    // Calculate available width for page buttons
    const widthForPages = availableWidth - controlButtonsWidth;

    // Calculate gap between items
    let gap = 0;
    if (allHiddenItems.length >= 2) {
      const first = allHiddenItems[0] as HTMLElement;
      const second = allHiddenItems[1] as HTMLElement;
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      gap = secondRect.left - firstRect.right;
    }

    // Calculate max pages: Math.floor((widthForPages + gap) / (singleButtonWidth + gap))
    // This accounts for the gap between each button
    const maxPages = Math.floor((widthForPages + gap) / (singleButtonWidth + gap));

    this.maxVisiblePages = Math.max(3, Math.min(maxPages, totalPages));

    this.validateAndUpdatePages();
  }

  /** 
   * Gets the horizontal padding of the pagination container
   */
  private getPaginationPadding(): number {
    if (!this.navRef) return 0;
    const computedStyle = window.getComputedStyle(this.navRef);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    return paddingLeft + paddingRight;
  }

  /**
   * Gets available width from parent container
   */
  private getAvailableWidth(): number {
    if (!this.navRef) return 0;
    
    // Try to get parent width (like breadcrumbs does)
    let parent = this.host.parentNode;
    while (parent && !(parent instanceof HTMLElement)) {
      parent = parent.parentNode;
    }
    
    return parent instanceof HTMLElement ? parent.clientWidth : window.innerWidth;
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

  // Convert numeric gap to a section type used when deciding whether to
  // render a page, nothing, or an ellipsis.
  private sectionForGap(gap: number): SectionType {
    if (gap === 0 || gap === 1) return 'none';
    if (gap === 2) return 'page';
    return 'ellipsis';
  }

  // Compute the left/right sections and numeric gaps for a given start/end
  private getSections(s: number, e: number, totalPages: number) {
    const leftGap = s - 1;
    const rightGap = totalPages - e;
    return {
      leftSection: this.sectionForGap(leftGap),
      rightSection: this.sectionForGap(rightGap),
      leftGap,
      rightGap,
    };
  }


  /**
   * Generates the page numbers array with ellipsis based on available space.
   */
  private generatePages(totalPages: number) {
    const maxVisible = this.maxVisiblePages;
    const items: PaginationItem[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      this.items = items;
      return;
    }

    const middleSlots = Math.max(1, maxVisible - 4);
    const delta = Math.floor(middleSlots / 2);
    let startPage = this.page - delta;
    let endPage = this.page + delta;

    if (startPage < 2) startPage = 2;
    if (endPage > totalPages - 1) endPage = totalPages - 1;


    for (let iter = 0; iter < 20; iter++) {
      const { leftSection, rightSection } = this.getSections(startPage, endPage, totalPages);

      const slotsTaken = 2 + (leftSection !== 'none' ? 1 : 0) + (rightSection !== 'none' ? 1 : 0);
      const middleCount = maxVisible - slotsTaken;

      let newStart = Math.max(2, this.page - Math.floor((middleCount - 1) / 2));
      let newEnd = newStart + middleCount - 1;
      if (newEnd > totalPages - 1) {
        newEnd = totalPages - 1;
        newStart = Math.max(2, newEnd - middleCount + 1);
      }

      if (newStart === startPage && newEnd === endPage) break;

      startPage = newStart;
      endPage = newEnd;
    }

    const { leftSection, rightSection } = this.getSections(startPage, endPage, totalPages);

    const pushLeft = () => {
      if (leftSection === 'page') items.push({ type: 'page', page: 2 });
      else if (leftSection === 'ellipsis') items.push({ type: 'ellipsis' });
    };

    const pushRight = () => {
      if (rightSection === 'page') items.push({ type: 'page', page: totalPages - 1 });
      else if (rightSection === 'ellipsis') items.push({ type: 'ellipsis' });
    };

    items.push({ type: 'page', page: 1 });
    pushLeft();
    for (let i = startPage; i <= endPage; i++) items.push({ type: 'page', page: i });
    pushRight();
    items.push({ type: 'page', page: totalPages });

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
   */
  private renderEllipsis(key: string) {
    return (
      <li class="pagination-item pagination-ellipsis" key={key}>
        <span class="pagination-ellipsis-content" aria-hidden="true">
          {ELLIPSIS}
        </span>
      </li>
    );
  }

  /**
   * Renders a page button.
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
   */
  private renderItem(item: PaginationItem, index: number) {
    if (item.type === 'ellipsis') {
      return this.renderEllipsis(`ellipsis-${index}`);
    }

    return this.renderPageButton(item.page);
  }

  /**
   * Renders all pages in a hidden container for measurement
   */
  private renderHiddenItems(totalPages: number) {
    const items = [];
    
    // Render control buttons
    items.push(
      <button class="pagination-link pagination-control-button hidden-control-button" disabled>
        <post-icon name="chevronleft" aria-hidden="true"></post-icon>
      </button>
    );

    // Render all possible page buttons
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <button class="pagination-link hidden-page-button" disabled>
          <span>{i}</span>
        </button>
      );
    }

    // Render ellipsis
    items.push(
      <span class="pagination-ellipsis-content hidden-ellipsis">
        {ELLIPSIS}
      </span>
    );

    items.push(
      <button class="pagination-link pagination-control-button hidden-control-button" disabled>
        <post-icon name="chevronright" aria-hidden="true"></post-icon>
      </button>
    );

    return items;
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
          aria-label={this.label}
          id={this.paginationId}
          ref={el => (this.navRef = el)}
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

            {/* Page Items */}
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

          {/* Hidden items container for width measurement */}
          <div class="hidden-items" ref={el => (this.hiddenItemsRef = el)}>
            {this.renderHiddenItems(totalPages)}
          </div>
        </nav>
      </Host>
    );
  }
}

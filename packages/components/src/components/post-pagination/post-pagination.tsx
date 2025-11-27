import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { checkEmptyOrType, checkRequiredAndType, debounce } from '@/utils';

const ELLIPSIS = '...';
const MEASUREMENT_DEBOUNCE_MS = 50;
const RESIZE_DEBOUNCE_MS = 150;
const MIN_VISIBLE_PAGES = 3;

/**
 * Type-safe pagination item definition using discriminated union.
 */
type PaginationItem = 
  | { type: 'page'; page: number }
  | { type: 'ellipsis' };

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
  @State() private items: PaginationItem[] = [];
  
  /**
   * **The current active page number. If not passed, defaults to the first page.**
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
   * Event emitted when the page changes.
   */
  @Event() postChange: EventEmitter<number>;

  private navRef?: HTMLElement;
  private hiddenItemsRef?: HTMLElement;
  private lastWindowWidth: number;
  private connected: boolean = false;
  
  private debouncedResize: (() => void) | null = null;
  private measurementTimeoutId: number | null = null;

  @Watch('page')
  validatePage() {
    checkEmptyOrType(this, 'page', 'number');
  }
  
  @Watch('pageSize')
  validatePageSize() {
    checkRequiredAndType(this, 'pageSize', 'number');
  }
  
  @Watch('collectionSize')
  validateCollectionSize() {
    checkRequiredAndType(this, 'collectionSize', 'number');
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
    const totalPages = this.getTotalPages();
    
    // Clamp page to valid range
    if (totalPages === 0 || this.collectionSize === 0 || isNaN(totalPages)) {
      this.page = 1;
    } else if (!this.page || this.page < 1 || isNaN(this.page)) {
      this.page = 1;
    } else if (this.page > totalPages) {
      this.page = totalPages;
    }
    this.generatePages(totalPages);
  }

  componentWillLoad() {
    this.paginationId = `pagination-${this.host.id || nanoid(6)}`;

    if (this.page == null) {
      this.page = 1;
    }

    this.runAllValidations();
  }

  componentDidLoad() {
    this.connected = true;
    
    this.debouncedResize = debounce(this.handleResizeInternal.bind(this), RESIZE_DEBOUNCE_MS);
    
    window.addEventListener('resize', this.debouncedResize);
    this.lastWindowWidth = window.innerWidth;
    
    this.scheduleMeasurement();
  }

  disconnectedCallback() {
    this.connected = false;
    
    if (this.debouncedResize) {
      window.removeEventListener('resize', this.debouncedResize);
    }
    
    if (this.measurementTimeoutId !== null) {
      clearTimeout(this.measurementTimeoutId);
      this.measurementTimeoutId = null;
    }
  }

  /**
   * Run all prop validations
   */
  private runAllValidations() {
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

  /**
   * Schedule measurement attempt with timeout
   */
  private scheduleMeasurement() {
    if (!this.connected) {
      return;
    }
    
    this.measurementTimeoutId = window.setTimeout(() => {
      this.attemptMeasurement();
    }, MEASUREMENT_DEBOUNCE_MS);
  }

  /**
   * Attempt to measure, reschedule if not ready
   */
  private attemptMeasurement() {
    if (!this.connected) {
      return;
    }
    
    const canMeasure = this.navRef?.clientWidth > 0 && this.hiddenItemsRef;
    
    if (canMeasure) {
      this.measureAndCalculateVisiblePages();
    } else {
      this.scheduleMeasurement();
    }
  }

  /**
   * Internal resize handler
   */
  private handleResizeInternal() {
    if (!this.connected) {
      return;
    }
    
    const newWidth = window.innerWidth;
    
    if (newWidth === this.lastWindowWidth) {
      return;
    }
    
    this.lastWindowWidth = newWidth;
    this.measureAndCalculateVisiblePages();
  }

  /**
   * Calculates gap between two elements
   */
  private calculateGap(first: Element, second: Element): number {
    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();
    return secondRect.left - firstRect.right;
  }

  /**
   * Measures actual rendered elements to determine how many pages can fit
   */
  private measureAndCalculateVisiblePages() {
    if (!this.navRef || !this.hiddenItemsRef || !this.connected) {
      return;
    }

    const totalPages = this.getTotalPages();
    if (totalPages <= 1) {
      return;
    }

    const paginationPadding = this.getPaginationPadding();
    const availableWidth = this.getAvailableWidth();
    const netWidth = availableWidth - paginationPadding;

    const controlButtonsWidth = this.getControlButtonsWidth();
    const pageButton = this.hiddenItemsRef.querySelector('.hidden-page-button');
    const ellipsis = this.hiddenItemsRef.querySelector('.hidden-ellipsis');
    
    if (!pageButton) {
      return;
    }

    const singleButtonWidth = pageButton.getBoundingClientRect().width;
    const gap = pageButton && ellipsis ? this.calculateGap(pageButton, ellipsis) : 0;
    const widthForPages = netWidth - controlButtonsWidth;

    // Calculate how many page buttons can fit
    const maxPages = Math.floor((widthForPages + gap) / (singleButtonWidth + gap));
    const clampedMaxPages = Math.max(MIN_VISIBLE_PAGES, Math.min(maxPages, totalPages));
    
    this.maxVisiblePages = clampedMaxPages;
    this.validateAndUpdatePages();
  }

  /**
   * Gets total width of control buttons (prev/next)
   */
  private getControlButtonsWidth(): number {
    if (!this.hiddenItemsRef) return 0;
    
    const controlButtons = Array.from(
      this.hiddenItemsRef.querySelectorAll('.hidden-control-button')
    );
    
    const totalWidth = controlButtons.reduce((sum, el) => {
      return sum + el.getBoundingClientRect().width;
    }, 0);
    
    return totalWidth;
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
    
    // Clamp page to valid range with better edge case handling
    if (totalPages === 0 || this.collectionSize === 0 || isNaN(totalPages)) {
      this.page = 1;
    } else if (!this.page || this.page < 1 || isNaN(this.page)) {
      this.page = 1;
    } else if (this.page > totalPages) {
      this.page = totalPages;
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
   * Convert numeric gap to a section type
   */
  private sectionForGap(gap: number): SectionType {
    if (gap <= 0) return 'none';
    if (gap === 1) return 'none'; // Only one page gap - it's already shown as first/last
    if (gap === 2) return 'page';
    return 'ellipsis';
  }

  /**
   * Compute the left/right sections and numeric gaps for a given range
   */
  private getSections(startPage: number, endPage: number, totalPages: number) {
    const leftGap = startPage - 1;
    const rightGap = totalPages - endPage;
    
    return {
      leftSection: this.sectionForGap(leftGap),
      rightSection: this.sectionForGap(rightGap),
      leftGap,
      rightGap,
    };
  }

  /**
   * Build a full list of pages (1..totalPages)
   */
  private buildAllPages(totalPages: number): PaginationItem[] {
    const items: PaginationItem[] = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push({ type: 'page', page: i });
    }
    return items;
  }

  /**
   * Calculate optimal page range centered around current page
   */
  private calculatePageRange(currentPage: number, totalPages: number, maxVisible: number) {
    // Reserve slots for first, last, and potential ellipses
    // maxVisible includes: first + last + up to 2 ellipses + middle pages
    const reservedSlots = 2; // first and last pages
    const ellipsisSlots = 2; // maximum possible ellipses
    const middleSlots = Math.max(0, maxVisible - reservedSlots - ellipsisSlots);

    if (middleSlots <= 0) {
      return { startPage: 2, endPage: 1 };
    }

    const halfMiddle = Math.floor(middleSlots / 2);

    let startPage = currentPage - halfMiddle;
    let endPage = startPage + middleSlots - 1;

    if (startPage < 2) {
      startPage = 2;
      endPage = startPage + middleSlots - 1;
    }

    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = endPage - middleSlots + 1;
    }
    startPage = Math.max(2, startPage);
    endPage = Math.min(totalPages - 1, endPage);

    // CRITICAL FIX: Prevent rightGap=2 scenario which causes visual inconsistency
    // When rightGap is 2, the buildPaginationItems adds (totalPages-1) as a separate item.
    // To maintain consistent visual count, we need to ensure we're always in a state
    // where rightGap is either 1 (no extra page) or >=3 (ellipsis).
    // Solution: When rightGap would be 2, extend endPage to totalPages-1 to make it 1.
    const rightGap = totalPages - endPage;
    if (rightGap === 2) {
      endPage = totalPages - 1;
      startPage = endPage - middleSlots + 1;
      startPage = Math.max(2, startPage);
    }

    // Similarly for leftGap=2 to maintain symmetry
    const leftGap = startPage - 1;
    if (leftGap === 2) {
      startPage = 2;
      endPage = startPage + middleSlots - 1;
      endPage = Math.min(totalPages - 1, endPage);
    }

    // Ensure we maintain middleSlots pages if possible
    const actualSlots = endPage - startPage + 1;

    if (actualSlots < middleSlots && endPage < totalPages - 1) {
      endPage = Math.min(totalPages - 1, startPage + middleSlots - 1);
    }
    if (actualSlots < middleSlots && startPage > 2) {
      startPage = Math.max(2, endPage - middleSlots + 1);
    }

    // Post-process to keep the total number of rendered items stable (when possible).
    // totalItems = first + last + leftSection(if any) + rightSection(if any) + middle pages
    // Try to adjust start/end so that totalItems === maxVisible (if space allows).
    const MAX_VISIBLE = this.maxVisiblePages || maxVisible;
    const computeTotalItems = (s: number, e: number) => {
      const { leftSection, rightSection } = this.getSections(s, e, totalPages);
      const middle = Math.max(0, e - s + 1);
      const leftCount = leftSection === 'none' ? 0 : 1;
      const rightCount = rightSection === 'none' ? 0 : 1;
      return 2 + leftCount + rightCount + middle; // first + last
    };

    let totalItems = computeTotalItems(startPage, endPage);

    // If we have too many items, trim the middle range preferentially from the side
    // that is further away from the current page to keep current page centered.
    while (totalItems > MAX_VISIBLE) {
        const distLeft = currentPage - startPage;
        const distRight = endPage - currentPage;
      // Prefer trimming the side that has more spare pages
      if (distRight >= distLeft && endPage > startPage) {
        endPage = Math.max(startPage - 1, endPage - 1);
      } else if (startPage < endPage) {
        startPage = Math.min(endPage + 1, startPage + 1);
      } else {
        break;
      }
      const newTotal = computeTotalItems(startPage, endPage);
      if (newTotal === totalItems) break; // no progress
      totalItems = newTotal;
    }

    // If we have too few items, try to expand middle into available space.
    while (totalItems < MAX_VISIBLE) {
      const canExpandLeft = startPage > 2;
      const canExpandRight = endPage < totalPages - 1;
      if (canExpandLeft) {
        startPage = Math.max(2, startPage - 1);
      } else if (canExpandRight) {
        endPage = Math.min(totalPages - 1, endPage + 1);
      } else {
        break;
      }
      const newTotal = computeTotalItems(startPage, endPage);
      if (newTotal === totalItems) break; // no progress
      totalItems = newTotal;
    }

    return { startPage, endPage };
  }

  /**
   * Build pagination items with ellipsis
   */
  private buildPaginationItems(startPage: number, endPage: number, totalPages: number): PaginationItem[] {
    const items: PaginationItem[] = [];
    const { leftSection, rightSection } = this.getSections(startPage, endPage, totalPages);

    // First page
    items.push({ type: 'page', page: 1 });
    
    // Left section (ellipsis or page 2)
    if (leftSection === 'page') {
      items.push({ type: 'page', page: 2 });
    } else if (leftSection === 'ellipsis') {
      items.push({ type: 'ellipsis' });
    }
    
    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push({ type: 'page', page: i });
    }
    
    // Right section (ellipsis or second-to-last page)
    if (rightSection === 'page') {
      items.push({ type: 'page', page: totalPages - 1 });
    } else if (rightSection === 'ellipsis') {
      items.push({ type: 'ellipsis' });
    }
    
    // Last page
    items.push({ type: 'page', page: totalPages });

    return items;
  }

  /**
   * Generates the page numbers array with ellipsis based on available space.
   */
  private generatePages(totalPages: number) {
    const maxVisible = this.maxVisiblePages;

    if (totalPages <= maxVisible) {
      this.items = this.buildAllPages(totalPages);
      return;
    }

    const { startPage, endPage } = this.calculatePageRange(this.page || 1, totalPages, maxVisible);
    this.items = this.buildPaginationItems(startPage, endPage, totalPages);
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
   * Handles keyboard navigation
   */
  private handleKeyDown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  /**
   * Builds accessible label for a page button.
   */
  private buildPageLabel(pageNumber: number): string {
    const totalPages = this.getTotalPages();
    
    if (pageNumber === 1) {
      return `${this.labelFirst}, ${this.labelPage} ${pageNumber}`;
    }
    if (pageNumber === totalPages) {
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

    return (
      <li class="pagination-item" key={`page-${pageNumber}`}>
        <button
          type="button"
          class={{
            'pagination-link': true,
            'pagination-link-active': isCurrent,
          }}
          aria-label={this.buildPageLabel(pageNumber)}
          aria-current={isCurrent ? 'page' : undefined}
          onClick={() => this.handlePageClick(pageNumber)}
          onKeyDown={(e) => this.handleKeyDown(e, () => this.handlePageClick(pageNumber))}
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
    return item.type === 'ellipsis' 
      ? this.renderEllipsis(`ellipsis-${index}`)
      : this.renderPageButton(item.page);
  }

  /**
   * Renders control button (prev/next)
   */
  private renderControlButton(
    iconName: string,
    label: string,
    isDisabled: boolean,
    onClick: () => void,
    rotateIcon: boolean = false
  ) {
    return (
      <li class="pagination-item pagination-control">
        <button
          type="button"
          class={{
            'pagination-link': true,
            'pagination-control-button': true,
            'pagination-link-disabled': isDisabled,
          }}
          aria-label={label}
          onClick={onClick}
          onKeyDown={(e) => this.handleKeyDown(e, onClick)}
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
        >
          <post-icon name={iconName} class={rotateIcon ? 'pagination-icon-rotated' : undefined} aria-hidden="true"></post-icon>
          <span class="visually-hidden">{label}</span>
        </button>
      </li>
    );
  }

  /**
   * Renders minimal hidden items for measurement
   */
  private renderHiddenItems(totalPages: number) {
    return [
      <button class="pagination-link pagination-control-button hidden-control-button" disabled>
        <post-icon name="chevronleft" aria-hidden="true"></post-icon>
      </button>,
      <button
        class="pagination-link pagination-control-button hidden-page-button"
        aria-label={this.buildPageLabel(totalPages)}
        disabled
      >
        <span aria-hidden="true">{totalPages}</span>
      </button>,
      <span class="pagination-ellipsis-content hidden-ellipsis" aria-hidden="true">
        {ELLIPSIS}
      </span>,
      <button class="pagination-link pagination-control-button hidden-control-button" disabled>
        <post-icon name="chevronleft" class="pagination-icon-rotated" aria-hidden="true"></post-icon>
      </button>
    ];
  }

  render() {
    const totalPages = this.getTotalPages();
    
    if (totalPages <= 1) {
      return null;
    }

    const isPrevDisabled = this.disabled || this.page <= 1;
    const isNextDisabled = this.disabled || this.page >= totalPages;

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
            {this.renderControlButton(
              'chevronleft',
              this.labelPrevious,
              isPrevDisabled,
              () => this.handlePrevious()
            )}

            {/* Page Items */}
            {this.items.map((item, index) => this.renderItem(item, index))}

            {/* Next Button */}
            {this.renderControlButton(
              'chevronleft',
              this.labelNext,
              isNextDisabled,
              () => this.handleNext(),
              true
            )}
          </ul>

          {/* Hidden items container for width measurement */}
          <div class="hidden-items" aria-hidden="true" ref={el => (this.hiddenItemsRef = el)}>
            {this.renderHiddenItems(totalPages)}
          </div>
        </nav>
      </Host>
    );
  }
}
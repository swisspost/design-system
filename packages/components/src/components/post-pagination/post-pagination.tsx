import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { checkEmptyOrType, checkRequiredAndType, debounce } from '@/utils';

const ELLIPSIS = '...';
const MAX_PAGINATION_ITERATIONS = 20;
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
  @State() private maxVisiblePages: number = 7;
  @State() private items: PaginationItem[] = [];
  
  /**
   * The current active page number.
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
  private isConnected: boolean = false;

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
    this.runAllValidations();
  }

  componentDidLoad() {
    this.isConnected = true;
    window.addEventListener('resize', this.handleResize);
    this.waitForMeasurement();
  }

  disconnectedCallback() {
    this.isConnected = false;
    window.removeEventListener('resize', this.handleResize);
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
   * Waits for the pagination elements to be available and measures them
   */
  private waitForMeasurement = debounce(() => {
    if (!this.isConnected) return;
    
    if (this.navRef?.clientWidth > 0 && this.hiddenItemsRef) {
      this.measureAndCalculateVisiblePages();
    } else {
      this.waitForMeasurement();
    }
  }, MEASUREMENT_DEBOUNCE_MS);

  /**
   * Handles window resize events
   */
  private handleResize = debounce(() => {
    if (!this.isConnected) return;
    if (window.innerWidth === this.lastWindowWidth) return;
    
    this.lastWindowWidth = window.innerWidth;
    this.measureAndCalculateVisiblePages();
  }, RESIZE_DEBOUNCE_MS);

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
    if (!this.navRef || !this.hiddenItemsRef || !this.isConnected) return;

    const totalPages = this.getTotalPages();
    if (totalPages <= 1) return;

    const paginationPadding = this.getPaginationPadding();
    const availableWidth = this.getAvailableWidth() - paginationPadding;

    const controlButtonsWidth = this.getControlButtonsWidth();
    const pageButton = this.hiddenItemsRef.querySelector('.hidden-page-button');
    const ellipsis = this.hiddenItemsRef.querySelector('.hidden-ellipsis');
    
    if (!pageButton) return;

    const singleButtonWidth = pageButton.getBoundingClientRect().width;
    const widthForPages = availableWidth - controlButtonsWidth;
    const gap = pageButton && ellipsis ? this.calculateGap(pageButton, ellipsis) : 0;

    const maxPages = Math.floor((widthForPages + gap) / (singleButtonWidth + gap));
    this.maxVisiblePages = Math.max(MIN_VISIBLE_PAGES, Math.min(maxPages, totalPages));

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
    
    return controlButtons.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
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
    
    // Clamp page to valid range
    if (totalPages === 0 || this.collectionSize === 0) {
      this.page = 1;
    } else if (this.page < 1) {
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
    if (gap <= 1) return 'none';
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
  private calculatePageRange(totalPages: number, maxVisible: number) {
    const middleSlots = Math.max(1, maxVisible - 4);
    const delta = Math.floor(middleSlots / 2);
    
    let startPage = Math.max(2, this.page - delta);
    let endPage = Math.min(totalPages - 1, this.page + delta);

    // Iteratively adjust range to fill available slots
    for (let iter = 0; iter < MAX_PAGINATION_ITERATIONS; iter++) {
      const { leftSection, rightSection } = this.getSections(startPage, endPage, totalPages);
      
      const slotsTaken = 2 + (leftSection !== 'none' ? 1 : 0) + (rightSection !== 'none' ? 1 : 0);
      const middleCount = maxVisible - slotsTaken;

      const newStart = Math.max(2, this.page - Math.floor((middleCount - 1) / 2));
      let newEnd = newStart + middleCount - 1;
      
      if (newEnd > totalPages - 1) {
        newEnd = totalPages - 1;
        startPage = Math.max(2, newEnd - middleCount + 1);
      } else {
        startPage = newStart;
      }
      
      endPage = newEnd;

      // Break if range stabilized
      if (newStart === startPage && newEnd === endPage) break;
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

    const { startPage, endPage } = this.calculatePageRange(totalPages, maxVisible);
    this.items = this.buildPaginationItems(startPage, endPage, totalPages);
  }

  /**
   * Handles page change when a page button is clicked.
   */
  private handlePageClick(pageNumber: number) {
    if (this.disabled || pageNumber === this.page) return;
    
    this.page = pageNumber;
    this.postChange.emit(pageNumber);
  }

  /**
   * Handles previous button click.
   */
  private handlePrevious() {
    if (this.disabled || this.page <= 1) return;
    
    const newPage = this.page - 1;
    this.page = newPage;
    this.postChange.emit(newPage);
  }

  /**
   * Handles next button click.
   */
  private handleNext() {
    const totalPages = this.getTotalPages();
    if (this.disabled || this.page >= totalPages) return;
    
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
    onClick: () => void
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
          <post-icon name={iconName} aria-hidden="true"></post-icon>
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
      <button class="pagination-link hidden-page-button" disabled>
        <span>{totalPages}</span>
      </button>,
      <span class="pagination-ellipsis-content hidden-ellipsis">
        {ELLIPSIS}
      </span>,
      <button class="pagination-link pagination-control-button hidden-control-button" disabled>
        <post-icon name="chevronright" aria-hidden="true"></post-icon>
      </button>
    ];
  }

  render() {
    const totalPages = this.getTotalPages();
    
    if (totalPages <= 1) return null;

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
              'chevronright',
              this.labelNext,
              isNextDisabled,
              () => this.handleNext()
            )}
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
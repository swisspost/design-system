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

/**
 * Valid prop names for validation
 */
type ValidatableProp = 'page' | 'pageSize' | 'collectionSize' | 'label' | 'labelPrevious' | 'labelNext' | 'labelPage' | 'labelFirst' | 'labelLast' | 'disabled';

@Component({
  tag: 'post-pagination',
  styleUrl: './post-pagination.scss',
  shadow: true,
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
  private lastWindowWidth = window.innerWidth;
  private loaded: boolean = false;
  
  private debouncedResize = debounce(this.handleResizeInternal.bind(this), RESIZE_DEBOUNCE_MS);
  private measurementTimeoutId: number | null = null;

  @Watch('page')
  validatePage() {
    this.validateProp('page', 'number', false);
  }
  
  @Watch('pageSize')
  validatePageSize() {
    this.validateProp('pageSize', 'number', true);
  }
  
  @Watch('collectionSize')
  validateCollectionSize() {
    this.validateProp('collectionSize', 'number', true);
  }
  
  @Watch('label')
  validateLabel() {
    this.validateProp('label', 'string', true);
  }
  
  @Watch('labelPrevious')
  validateLabelPrevious() {
    this.validateProp('labelPrevious', 'string', true);
  }
  
  @Watch('labelNext')
  validateLabelNext() {
    this.validateProp('labelNext', 'string', true);
  }
  
  @Watch('labelPage')
  validateLabelPage() {
    this.validateProp('labelPage', 'string', true);
  }
  
  @Watch('labelFirst')
  validateLabelFirst() {
    this.validateProp('labelFirst', 'string', true);
  }
  
  @Watch('labelLast')
  validateLabelLast() {
    this.validateProp('labelLast', 'string', true);
  }
  
  @Watch('disabled')
  validateDisabled() {
    this.validateProp('disabled', 'boolean', false);
  }
  
  @Watch('page')
  @Watch('pageSize')
  @Watch('collectionSize')
  handlePropsChange() {
    this.updatePagesWithValidation();
  }

  componentWillLoad() {
    this.paginationId = `pagination-${this.host.id || nanoid(6)}`;

    if (this.page == null) {
      this.page = 1;
    }
  }

  connectedCallback() {
    window.addEventListener('resize', this.debouncedResize);
  }

  componentDidLoad() {
    this.loaded = true;
    this.runAllValidations();
    
    this.scheduleMeasurement();
  }

  disconnectedCallback() {
    this.loaded = false;
    
    window.removeEventListener('resize', this.debouncedResize);
    
    if (this.measurementTimeoutId !== null) {
      clearTimeout(this.measurementTimeoutId);
      this.measurementTimeoutId = null;
    }
  }

  /**
   * Validate a prop with the appropriate check function
   */
  private validateProp(propName: ValidatableProp, type: 'string' | 'number' | 'boolean', required: boolean = true) {
    if (required) {
      checkRequiredAndType(this, propName, type);
    } else {
      checkEmptyOrType(this, propName, type);
    }
  }

  /**
   * Run all prop validations
   */
  private runAllValidations() {
    this.validateProp('page', 'number', false);
    this.validateProp('pageSize', 'number', true);
    this.validateProp('collectionSize', 'number', true);
    this.validateProp('label', 'string', true);
    this.validateProp('labelPrevious', 'string', true);
    this.validateProp('labelNext', 'string', true);
    this.validateProp('labelPage', 'string', true);
    this.validateProp('labelFirst', 'string', true);
    this.validateProp('labelLast', 'string', true);
    this.validateProp('disabled', 'boolean', false);
  }

  /**
   * Schedule measurement attempt with timeout
   */
  private scheduleMeasurement() {
    if (!this.loaded) return;
    
    this.measurementTimeoutId = window.setTimeout(() => {
      const canMeasure = this.navRef?.clientWidth > 0 && this.hiddenItemsRef;
      
      if (canMeasure) {
        this.measureAndCalculateVisiblePages();
      } else {
        this.scheduleMeasurement();
      }
    }, MEASUREMENT_DEBOUNCE_MS);
  }

  /**
   * Internal resize handler
   */
  private handleResizeInternal() {
    if (!this.loaded) return;
    
    if (window.innerWidth === this.lastWindowWidth) return;
    
    this.lastWindowWidth = window.innerWidth;
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
    if (!this.navRef || !this.hiddenItemsRef || !this.loaded) return;

    const totalPages = this.getTotalPages();
    if (totalPages <= 1) return;

    const paginationPadding = this.getPaginationPadding();
    const availableWidth = this.getAvailableWidth();
    const netWidth = availableWidth - paginationPadding;

    const controlButtonsWidth = this.getControlButtonsWidth();
    const pageButton = this.hiddenItemsRef.querySelector('.hidden-page-button');
    const ellipsis = this.hiddenItemsRef.querySelector('.hidden-ellipsis');
    
    if (!pageButton) return;

    const singleButtonWidth = pageButton.getBoundingClientRect().width;
    const gap = pageButton && ellipsis ? this.calculateGap(pageButton, ellipsis) : 0;
    const widthForPages = netWidth - controlButtonsWidth;

    // Calculate how many page buttons can fit
    const maxPages = Math.floor((widthForPages + gap) / (singleButtonWidth + gap));
    const clampedMaxPages = Math.max(MIN_VISIBLE_PAGES, Math.min(maxPages, totalPages));
    
    this.maxVisiblePages = clampedMaxPages;
    this.updatePagesWithValidation();
  }

  /**
   * Gets total width of control buttons (prev/next)
   */
  private getControlButtonsWidth(): number {
    if (!this.hiddenItemsRef) return 0;
    
    const controlButtons = Array.from(
      this.hiddenItemsRef.querySelectorAll('.hidden-control-button')
    );
    
    const totalWidth = controlButtons
      .reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
    
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
    
    return this.host.parentElement?.clientWidth ?? window.innerWidth;
  }

  /**
   * Returns true if collection size or page size is invalid
   */
  private get invalidSize(): boolean {
    return this.collectionSize === 0 || this.pageSize === 0;
  }

  /**
   * Clamps the page number to valid range
   */
  private clampPageToValidRange(totalPages: number): number {
    const invalidTotalPages = totalPages === 0 || this.invalidSize || isNaN(totalPages);
    const invalidPage = !this.page || this.page < 1 || isNaN(this.page);
    const pageExceedsTotal = this.page > totalPages;

    if (invalidTotalPages || invalidPage) {
      return 1;
    } else if (pageExceedsTotal) {
      return totalPages;
    } else {
      return this.page;
    }
  }

  /**
   * Validates and updates pages with clamped page number
   */
  private updatePagesWithValidation() {
    const totalPages = this.getTotalPages();
    this.page = this.clampPageToValidRange(totalPages);
    this.generatePages(totalPages);
  }

  /**
   * Calculates the total number of pages.
   */
  private getTotalPages(): number {
    if (this.invalidSize) return 1;
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  /**
   * Convert numeric gap to a section type
   */
  private sectionForGap(gap: number): SectionType {
    if (gap <= 1) return 'none';
    return gap === 2 ? 'page' : 'ellipsis';
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
   * Compute total items that would be rendered for a given range
   */
  private computeTotalItems(startPage: number, endPage: number, totalPages: number): number {
    const { leftSection, rightSection } = this.getSections(startPage, endPage, totalPages);
    const middle = Math.max(0, endPage - startPage + 1);
    const leftCount = leftSection === 'none' ? 0 : 1;
    const rightCount = rightSection === 'none' ? 0 : 1;
    
    // Always include first page (1) and last page (totalPages) = 2 pages
    // Plus any left/right sections (ellipsis or pages) and middle pages
    return 2 + leftCount + rightCount + middle;
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
   * Adjust start/end pages to avoid gap=2 scenarios
   */
  private adjustForGapTwo(startPage: number, endPage: number, totalPages: number, middleSlots: number) {
    const adjusted = { startPage, endPage };
    
    // Fix rightGap=2 to maintain visual consistency
    const rightGap = totalPages - endPage;
    if (rightGap === 2) {
      adjusted.endPage = totalPages - 1;
      adjusted.startPage = Math.max(2, adjusted.endPage - middleSlots + 1);
    }
    
    // Fix leftGap=2 to maintain symmetry
    const leftGap = adjusted.startPage - 1;
    if (leftGap === 2) {
      adjusted.startPage = 2;
      adjusted.endPage = Math.min(totalPages - 1, adjusted.startPage + middleSlots - 1);
    }
    
    return adjusted;
  }

  /**
   * Ensure we have the desired number of middle slots
   */
  private ensureMiddleSlots(startPage: number, endPage: number, totalPages: number, middleSlots: number) {
    const adjusted = { startPage, endPage };
    const actualSlots = endPage - startPage + 1;

    if (actualSlots < middleSlots && endPage < totalPages - 1) {
      adjusted.endPage = Math.min(totalPages - 1, startPage + middleSlots - 1);
    }
    if (actualSlots < middleSlots && startPage > 2) {
      adjusted.startPage = Math.max(2, endPage - middleSlots + 1);
    }

    return adjusted;
  }

  /**
   * Balance total items to match maxVisible by trimming or expanding
   */
  private balanceTotalItems(
    startPage: number, 
    endPage: number, 
    totalPages: number, 
    maxVisible: number, 
    currentPage: number
  ) {
    const adjusted = { startPage, endPage };
    let totalItems = this.computeTotalItems(adjusted.startPage, adjusted.endPage, totalPages);

    // Trim if too many items
    while (totalItems > maxVisible) {
      const distLeft = currentPage - adjusted.startPage;
      const distRight = adjusted.endPage - currentPage;
      
      if (distRight >= distLeft && adjusted.endPage > adjusted.startPage) {
        adjusted.endPage = Math.max(adjusted.startPage - 1, adjusted.endPage - 1);
      } else if (adjusted.startPage < adjusted.endPage) {
        adjusted.startPage = Math.min(adjusted.endPage + 1, adjusted.startPage + 1);
      } else {
        break;
      }
      
      const newTotal = this.computeTotalItems(adjusted.startPage, adjusted.endPage, totalPages);
      if (newTotal === totalItems) break;
      totalItems = newTotal;
    }

    // Expand if too few items
    while (totalItems < maxVisible) {
      const canExpandLeft = adjusted.startPage > 2;
      const canExpandRight = adjusted.endPage < totalPages - 1;
      
      if (canExpandLeft) {
        adjusted.startPage = Math.max(2, adjusted.startPage - 1);
      } else if (canExpandRight) {
        adjusted.endPage = Math.min(totalPages - 1, adjusted.endPage + 1);
      } else {
        break;
      }
      
      const newTotal = this.computeTotalItems(adjusted.startPage, adjusted.endPage, totalPages);
      if (newTotal === totalItems) break;
      totalItems = newTotal;
    }

    return adjusted;
  }

  /**
   * Calculate optimal page range centered around current page
   */
  private calculatePageRange(currentPage: number, totalPages: number, maxVisible: number) {
    // Reserve slots for first, last, and potential ellipses
    const reservedSlots = 2; // first and last pages
    const ellipsisSlots = 2; // maximum possible ellipses
    const middleSlots = Math.max(0, maxVisible - reservedSlots - ellipsisSlots);

    if (middleSlots <= 0) {
      return { startPage: 2, endPage: 1 };
    }

    // Center around current page
    const halfMiddle = Math.floor(middleSlots / 2);
    let startPage = currentPage - halfMiddle;
    let endPage = startPage + middleSlots - 1;

    // Adjust if out of bounds
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

    // Fix gap=2 scenarios
    const gapAdjusted = this.adjustForGapTwo(startPage, endPage, totalPages, middleSlots);
    startPage = gapAdjusted.startPage;
    endPage = gapAdjusted.endPage;

    // Ensure we have the desired middle slots
    const slotAdjusted = this.ensureMiddleSlots(startPage, endPage, totalPages, middleSlots);
    startPage = slotAdjusted.startPage;
    endPage = slotAdjusted.endPage;

    // Balance total items to match maxVisible
    const balanced = this.balanceTotalItems(startPage, endPage, totalPages, maxVisible, currentPage);

    return balanced;
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
   * Emit page change event and update page
   */
  private emitPageChange(newPage: number) {
    this.page = newPage;
    this.postChange.emit(newPage);
  }

  /**
   * Handles page change when a page button is clicked.
   */
  private handlePageClick(pageNumber: number) {
    if (this.disabled || pageNumber === this.page) return;

    this.emitPageChange(pageNumber);
  }

  /**
   * Handles previous button click.
   */
  private handlePrevious() {
    if (this.disabled || this.page <= 1) return;
    
    this.emitPageChange(this.page - 1);
  }

  /**
   * Handles next button click.
   */
  private handleNext() {
    const totalPages = this.getTotalPages();
    if (this.disabled || this.page >= totalPages) return;
    
    this.emitPageChange(this.page + 1);
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
import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { nanoid } from 'nanoid';
import { breakpoint, checkEmptyOrType, checkRequiredAndType, Device } from '@/utils';


const ELLIPSIS = '...';

/**
 * Button sizes per device (in pixels)
 */
const BUTTON_SIZES = {
  mobile: 32,
  tablet: 40,
  desktop: 48,
} as const;

/**
 * Gap between buttons (in pixels)
 */
const BUTTON_GAP = 4;

/**
 * Type-safe pagination item definition using discriminated union.
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
  @State() private containerWidth: number = 0;
  @State() private currentDevice: Device = 'desktop';
  
  /**
   * The current active page number (1-indexed).
   */
  @Prop({ mutable: true }) page: number;
  
  /**
   * The number of items per page.
   */
  @Prop() pageSize: number;
  
  /**
   * The total number of items in the collection.
   */
  @Prop() collectionSize: number;
  
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

  private resizeObserver: ResizeObserver | null = null;

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
  @Watch('containerWidth')
  @Watch('currentDevice')
  handlePropsChange() {
    this.validateAndUpdatePages();
  }

  componentWillLoad() {
    this.paginationId = `pagination-${this.host.id || nanoid(6)}`;
    this.currentDevice = breakpoint.get('device');

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
    // Set up ResizeObserver to measure container width
    this.setupResizeObserver();
    
    // Listen for device changes
    this.setupDeviceListener();
    
    // Initial measurement
    this.measureContainer();
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    window.removeEventListener('postBreakpoint:device', this.handleDeviceChange);
  }

  /**
   * Sets up ResizeObserver to track container width changes
   */
  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') {
      console.warn('[Pagination] ResizeObserver not available, using fallback');
      // Fallback: measure once if ResizeObserver not available
      this.measureContainer();
      return;
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Get width from contentRect (most compatible)
        const width = entry.contentRect.width;
        if (width !== this.containerWidth) {
          this.containerWidth = width;
        }
      }
    });

    // Observe the nav element
    const nav = this.host.querySelector('nav');
    if (nav) {
      this.resizeObserver.observe(nav);
    } else {
      console.warn('[Pagination] Nav element not found for observation');
    }
  }

  /**
   * Sets up listener for device/breakpoint changes
   */
  private setupDeviceListener() {
    window.addEventListener('postBreakpoint:device', this.handleDeviceChange);
  }

  /**
   * Handles device change events
   */
  private handleDeviceChange = (event: CustomEvent<Device>) => {
    this.currentDevice = event.detail;
  };

  /**
   * Manually measures the container width (fallback method)
   */
  private measureContainer() {
    const nav = this.host.querySelector('nav');
    if (nav) {
      this.containerWidth = nav.getBoundingClientRect().width;
    }
  }

  /**
   * Calculates how many page buttons can fit in the available width
   */
  private calculateMaxVisiblePages(): number {
    if (this.containerWidth === 0) {
      // Default fallback
      return 7;
    }

    const buttonSize = BUTTON_SIZES[this.currentDevice];
    
    // Space used by prev and next buttons (2 buttons + gaps)
    const controlButtonsWidth = 2 * buttonSize + 2 * BUTTON_GAP;
    
    // Available width for page buttons
    const availableWidth = this.containerWidth - controlButtonsWidth;
    
    // Calculate how many buttons can fit
    // Each button is: buttonSize + BUTTON_GAP (except the last one)
    // We need space for: first page, last page, and pages around current
    // Also account for potential ellipsis (same size as button)
    const buttonWithGap = buttonSize + BUTTON_GAP;
    const maxButtons = Math.floor(availableWidth / buttonWithGap);
    
    // Ensure at least 3 buttons (first, current, last) or all pages if fewer
    const totalPages = this.getTotalPages();
    const result = Math.max(3, Math.min(maxButtons, totalPages));
    
    return result;
    
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
   * Generates the page numbers array with ellipsis based on available space.
   * 
   * Algorithm:
   * - Calculate max visible pages based on container width
   * - If total pages <= max visible: show all pages
   * - Otherwise: show adaptive pattern maintaining EXACTLY maxVisible items
   * - Intelligently replaces ellipsis with actual page when gap is only 1
   * - Adjusts middle range to compensate when ellipsis is replaced
   * 
   * @param totalPages - Total number of pages to display
   */
  private generatePages(totalPages: number) {
    const maxVisible = this.calculateMaxVisiblePages();
    const items: PaginationItem[] = [];

    

    // If we can show all pages, do so
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      
      this.items = items;
      return;
    }

    // We need to show exactly maxVisible items
    // Format: [1] [left-section] [middle-pages] [right-section] [last]
    // Where left-section and right-section are either ellipsis or a page

    // Start with a middle range centered on current page (rough draft)
    const middleSlots = Math.max(1, maxVisible - 4); // initial guess
    const delta = Math.floor(middleSlots / 2);
    let startPage = this.page - delta;
    let endPage = this.page + delta;

    // Clamp to valid inner page range [2, totalPages-1]
    if (startPage < 2) {
      startPage = 2;
    }
    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
    }

    // Iteratively balance start/end and the left/right sections so that
    // the total number of items (including first/last and potential
    // ellipses/pages) equals maxVisible. This avoids off-by-one cases
    // when a gap becomes 'page' (2) or 'none' (1) near edges.
    let leftSection: 'none' | 'page' | 'ellipsis' = 'none';
    let rightSection: 'none' | 'page' | 'ellipsis' = 'none';

    const computeSections = () => {
      const leftGap = startPage - 1; // gap between 1 and startPage
      const rightGap = totalPages - endPage; // gap between endPage and last

      if (leftGap === 0 || leftGap === 1) leftSection = 'none';
      else if (leftGap === 2) leftSection = 'page';
      else leftSection = 'ellipsis';

      if (rightGap === 0 || rightGap === 1) rightSection = 'none';
      else if (rightGap === 2) rightSection = 'page';
      else rightSection = 'ellipsis';

      return { leftGap, rightGap };
    };

    // Limit iterations to avoid infinite loops
    let iter = 0;
    while (iter < 20) {
      iter++;

      computeSections();

      const slotsTaken = 2 + (leftSection !== 'none' ? 1 : 0) + (rightSection !== 'none' ? 1 : 0); // first + last + left/right sections
      const middleCount = maxVisible - slotsTaken;

      // Re-center middle range around current page with middleCount slots
      let newStart = Math.max(2, this.page - Math.floor((middleCount - 1) / 2));
      let newEnd = newStart + middleCount - 1;
      if (newEnd > totalPages - 1) {
        newEnd = totalPages - 1;
        newStart = Math.max(2, newEnd - middleCount + 1);
      }

      // If nothing changed, break
      if (newStart === startPage && newEnd === endPage) {
        break;
      }

      startPage = newStart;
      endPage = newEnd;
    }

    (() => {
      const leftGap = startPage - 1;
      const rightGap = totalPages - endPage;

      if (leftGap === 0 || leftGap === 1) leftSection = 'none';
      else if (leftGap === 2) leftSection = 'page';
      else leftSection = 'ellipsis';

      if (rightGap === 0 || rightGap === 1) rightSection = 'none';
      else if (rightGap === 2) rightSection = 'page';
      else rightSection = 'ellipsis';

      return { leftGap, rightGap, leftSection, rightSection };
    })();

    

    // Build items - now we'll have exactly maxVisible items
    items.push({ type: 'page', page: 1 });
    
    if (leftSection === 'page') {
      items.push({ type: 'page', page: 2 });
    } else if (leftSection === 'ellipsis') {
      items.push({ type: 'ellipsis' });
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push({ type: 'page', page: i });
    }
    
    if (rightSection === 'page') {
      items.push({ type: 'page', page: totalPages - 1 });
    } else if (rightSection === 'ellipsis') {
      items.push({ type: 'ellipsis' });
    }
    
    items.push({ type: 'page', page: totalPages });

    const pageCount = items.filter(item => item.type === 'page').length;

    // Check for potential overflow
    const expectedWidth = (pageCount + 2) * (BUTTON_SIZES[this.currentDevice] + BUTTON_GAP);
    if (expectedWidth > this.containerWidth) {
      console.warn('[Pagination] ⚠️ POTENTIAL OVERFLOW DETECTED!', {
        expectedWidth: expectedWidth,
        containerWidth: this.containerWidth,
        overflow: expectedWidth - this.containerWidth,
      });
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
        </nav>
      </Host>
    );
  }
}

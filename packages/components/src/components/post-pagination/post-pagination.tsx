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
  @Prop() readonly paginationLabel: string = 'Pagination';

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
   * Type-safe array of pagination items to render.
   */
  @State() private items: PaginationItem[] = [];

  /**
   * All page numbers (used for width calculation in hidden container)
   */
  @State() private allPages: number[] = [];

  /**
   * Whether pagination should show ellipsis due to width constraints
   */
  @State() private shouldCondense: boolean = false;

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

  private hiddenContainerRef?: HTMLElement;
  private lastWindowWidth: number = 0;
  private resizeObserver?: ResizeObserver;

  /**
   * Maximum number of page buttons that can fit (calculated from width)
   */
  @State() private maxPageButtons: number = 7;

  /**
   * Flag to prevent measurement loops
   */
  private isMeasuring: boolean = false;

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

  @Watch('paginationLabel')
  validatePaginationLabel() {
    checkRequiredAndType(this, 'paginationLabel', 'string');
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
    this.lastWindowWidth = window.innerWidth;

    this.validatePage();
    this.validatePageSize();
    this.validateCollectionSize();
    this.validatePaginationLabel();
    this.validateLabelPrevious();
    this.validateLabelNext();
    this.validateLabelPage();
    this.validateLabelFirst();
    this.validateLabelLast();
    this.validateDisabled();
    this.validateAndUpdatePages();
  }

  componentDidLoad() {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (this.hiddenContainerRef) {
        this.checkIfShouldCondense();
      }
    });
    
    // Use ResizeObserver for smoother resize handling
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      let parent = this.host.parentNode;
      while (parent && !(parent instanceof HTMLElement)) {
        parent = parent.parentNode;
      }
      if (parent instanceof HTMLElement) {
        this.resizeObserver.observe(parent);
      }
    } else {
      window.addEventListener('resize', this.handleResize);
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Handles window resize to recalculate condensation
   */
  private handleResize = debounce(() => {
    const currentWidth = window.innerWidth;
    
    // Only recalculate if width actually changed significantly (avoid subpixel triggers)
    if (Math.abs(currentWidth - this.lastWindowWidth) < 2) return;
    
    this.lastWindowWidth = currentWidth;
    
    if (!this.isMeasuring && this.hiddenContainerRef) {
      this.checkIfShouldCondense();
    }
  }, 100);

  /**
   * Waits for pagination reference to be available before checking width
   */
  private waitForPaginationRef = () => {
    if (this.hiddenContainerRef?.clientWidth > 0 && !this.isMeasuring) {
      this.checkIfShouldCondense();
    } else if (!this.isMeasuring) {
      requestAnimationFrame(() => this.waitForPaginationRef());
    }
  };

  /**
   * Gets the available width for pagination
   */
  private getAvailableWidth(): number {
    let parent = this.host.parentNode;
    while (parent && !(parent instanceof HTMLElement)) {
      parent = parent.parentNode;
    }
    return parent instanceof HTMLElement ? parent.clientWidth : window.innerWidth;
  }

  /**
   * Read the configured gap (CSS variable or computed gap) and return pixels.
   */
  private getGapPx(el?: HTMLElement): number {
    try {
      const target = el || this.hiddenContainerRef || document.documentElement;
      const cs = window.getComputedStyle(target as Element);
      let gap = cs.getPropertyValue('--pagination-gap') || cs.gap || cs.columnGap || '8px';
      gap = gap.trim();

      const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      if (gap.endsWith('rem')) {
        return parseFloat(gap) * rootFont;
      }
      if (gap.endsWith('px')) {
        return parseFloat(gap);
      }
      return parseFloat(gap) || 8;
    } catch (e) {
      return 8;
    }
  }

  /**
   * Calculates how many page buttons can fit in available width
   */
  private checkIfShouldCondense() {
    if (!this.hiddenContainerRef || this.isMeasuring) return;

    this.isMeasuring = true;

    const totalPages = this.getTotalPages();
    const availableWidth = this.getAvailableWidth();
    
    const hiddenItems: HTMLElement[] = [];
    const measureWrapper = document.createElement('div');
    measureWrapper.setAttribute('aria-hidden', 'true');
    
    Object.assign(measureWrapper.style, {
      position: 'absolute',
      left: '-9999px',
      top: '0px',
      visibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      gap: '8px',
      overflow: 'hidden'
    });

    try {
      const sourceItems = this.hiddenContainerRef
        ? Array.from(this.hiddenContainerRef.querySelectorAll('.hidden-pagination-item'))
        : [];

      const copyStyles = (src: HTMLElement, dest: HTMLElement) => {
        try {
          const cs = window.getComputedStyle(src);
          const props = [
            'box-sizing', 'min-width', 'height', 'padding', 'padding-left', 'padding-right', 
            'padding-top', 'padding-bottom', 'border', 'border-width', 'border-style', 
            'border-color', 'border-radius', 'font-size', 'font-family', 'font-weight', 
            'line-height', 'display', 'align-items', 'justify-content', 'white-space'
          ];

          for (const p of props) {
            const v = cs.getPropertyValue(p);
            if (v) dest.style.setProperty(p, v);
          }
        } catch (e) {
          // Ignore style copy errors
        }
      };

      for (const node of sourceItems) {
        const clone = node.cloneNode(true) as HTMLElement;

        try {
          copyStyles(node as HTMLElement, clone);

          const srcBtn = (node as HTMLElement).querySelector('.pagination-link') as HTMLElement | null;
          const cloneBtn = clone.querySelector('.pagination-link') as HTMLElement | null;
          if (srcBtn && cloneBtn) {
            copyStyles(srcBtn, cloneBtn);
          }
        } catch (e) {
          // Ignore
        }

        measureWrapper.appendChild(clone);
      }

      const appendTarget = this.hiddenContainerRef?.parentElement || document.body;
      if (this.hiddenContainerRef && this.hiddenContainerRef.className) {
        measureWrapper.className = this.hiddenContainerRef.className + ' measurement-wrapper';
      }
      appendTarget.appendChild(measureWrapper);

      Array.from(measureWrapper.querySelectorAll('.hidden-pagination-item')).forEach((el) => {
        hiddenItems.push(el as HTMLElement);
        (el as HTMLElement).getBoundingClientRect().width;
      });
    } catch (e) {
      // Measurement failed
    }

    if (hiddenItems.length === 0) {
      this.isMeasuring = false;
      if (measureWrapper && measureWrapper.parentNode) {
        measureWrapper.parentNode.removeChild(measureWrapper);
      }
      return;
    }

    const pageButtons = hiddenItems.filter(item => 
      !item.classList.contains('pagination-control')
    );
    
    const controlButtons = hiddenItems.filter(item =>
      item.classList.contains('pagination-control')
    );

    if (pageButtons.length === 0) {
      this.isMeasuring = false;
      if (measureWrapper && measureWrapper.parentNode) {
        measureWrapper.parentNode.removeChild(measureWrapper);
      }
      return;
    }

    const totalPageButtonsWidth = pageButtons.reduce((sum, item) => {
      return sum + item.getBoundingClientRect().width;
    }, 0);

    const totalControlsWidth = controlButtons.reduce((sum, item) => {
      return sum + item.getBoundingClientRect().width;
    }, 0);

    const gapPxForAll = this.getGapPx(this.hiddenContainerRef);
    const totalItemsCount = pageButtons.length + controlButtons.length;
    const totalWidth = totalPageButtonsWidth + totalControlsWidth + Math.max(0, totalItemsCount - 1) * gapPxForAll;
    
    if (totalWidth <= availableWidth) {
      const previousCondense = this.shouldCondense;
      const previousMax = this.maxPageButtons;
      
      this.shouldCondense = false;
      this.maxPageButtons = totalPages;
      
      if (previousCondense !== this.shouldCondense || previousMax !== this.maxPageButtons) {
        this.generatePages(totalPages);
      }

      this.isMeasuring = false;
      if (measureWrapper && measureWrapper.parentNode) {
        measureWrapper.parentNode.removeChild(measureWrapper);
      }
      return;
    }

    const gapPx = this.getGapPx(this.hiddenContainerRef);
    const avgPageButtonWidth = totalPageButtonsWidth / pageButtons.length;
    const ellipsisWidth = avgPageButtonWidth * 0.6;
    const reservedForEllipses = (ellipsisWidth + gapPx) * 2;
    const availableForPages = availableWidth - totalControlsWidth - reservedForEllipses;
    const maxButtons = Math.floor((availableForPages + gapPx) / (avgPageButtonWidth + gapPx));
    
    const previousCondense = this.shouldCondense;
    const previousMax = this.maxPageButtons;
    
    this.shouldCondense = true;
    this.maxPageButtons = Math.max(5, Math.min(maxButtons, totalPages));
    
    if (previousCondense !== this.shouldCondense || previousMax !== this.maxPageButtons) {
      this.generatePages(totalPages);
    }

    if (measureWrapper && measureWrapper.parentNode) {
      measureWrapper.parentNode.removeChild(measureWrapper);
    }

    this.isMeasuring = false;
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

    this.allPages = [];
    for (let i = 1; i <= totalPages; i++) {
      this.allPages.push(i);
    }

    if (this.hiddenContainerRef) {
      this.checkIfShouldCondense();
      this.generatePages(totalPages);
    } else {
      this.generatePages(totalPages);
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
   * Generates exactly maxPageButtons page numbers, using ellipsis where needed.
   */
  private generatePages(totalPages: number) {
    const items: PaginationItem[] = [];

    if (!this.shouldCondense) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      this.items = items;
      return;
    }

    const buttonsToShow = this.maxPageButtons;
    const middleSlots = buttonsToShow - 2;
    
    let start = this.page - Math.floor(middleSlots / 2);
    let end = start + middleSlots - 1;

    if (start < 2) {
      start = 2;
      end = Math.min(totalPages - 1, start + middleSlots - 1);
    }

    if (end > totalPages - 1) {
      end = Math.max(2, totalPages - 1);
      start = Math.max(2, end - middleSlots + 1);
    }
    
    const pages: number[] = [];
    pages.push(1);
    
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    let lastPage: number | undefined;
    for (const page of pages) {
      if (lastPage !== undefined) {
        const gap = page - lastPage;
        
        if (gap === 2) {
          items.push({ type: 'page', page: lastPage + 1 });
        } else if (gap > 2) {
          items.push({ type: 'ellipsis' });
        }
      }
      
      items.push({ type: 'page', page });
      lastPage = page;
    }

    const ellipsisCount = items.filter(i => i.type === 'ellipsis').length;
    const desiredNumeric = Math.max(1, this.maxPageButtons - Math.max(0, ellipsisCount - 1));
    const numericIndices = () => items.map((it, idx) => (it.type === 'page' ? idx : -1)).filter(i => i >= 0);

    let currentNumeric = numericIndices().length;
    while (currentNumeric > desiredNumeric) {
      const pageIdxs = numericIndices();
      let removeIdx = -1;
      let maxDist = -1;

      for (const idx of pageIdxs) {
        const p = (items[idx] as any).page as number;
        if (p === 1 || p === totalPages) continue;
        const dist = Math.abs(p - this.page);
        if (dist > maxDist) {
          maxDist = dist;
          removeIdx = idx;
        }
      }

      if (removeIdx === -1) break;
      items.splice(removeIdx, 1);
      currentNumeric = numericIndices().length;
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
  private renderEllipsis(index: number) {
    return (
      <li class="pagination-item pagination-ellipsis" key={`ellipsis-${index}`}>
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
      return this.renderEllipsis(index);
    }

    return this.renderPageButton(item.page);
  }

  /**
   * Renders a hidden page button for width measurement
   */
  private renderHiddenPageButton(pageNumber: number) {
    return (
      <li class="pagination-item hidden-pagination-item" key={`hidden-${pageNumber}`}>
        <button
          type="button"
          class="pagination-link"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span>{pageNumber}</span>
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
      <Host slot="post-pagination" data-version={version}>
        <nav
          class="pagination"
          aria-label={this.paginationLabel}
          id={this.paginationId}
        >
          {/* Visible pagination list */}
          <ul 
            class="pagination-list" 
            role="list"
          >
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

          {/* Hidden container for width measurement */}
          <ul 
            class="pagination-list hidden-pagination-container" 
            ref={el => (this.hiddenContainerRef = el)}
            aria-hidden="true"
            role="list"
          >
            {/* Render prev button */}
            <li class="pagination-item pagination-control hidden-pagination-item">
              <button type="button" class="pagination-link pagination-control-button" tabIndex={-1}>
                <post-icon name="chevronleft" aria-hidden="true"></post-icon>
              </button>
            </li>

            {/* Render all page buttons for measurement */}
            {this.allPages.map(page => this.renderHiddenPageButton(page))}

            {/* Render next button */}
            <li class="pagination-item pagination-control hidden-pagination-item">
              <button type="button" class="pagination-link pagination-control-button" tabIndex={-1}>
                <post-icon name="chevronright" aria-hidden="true"></post-icon>
              </button>
            </li>
          </ul>
        </nav>
      </Host>
    );
  }
}
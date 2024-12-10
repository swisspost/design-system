import { Component, Element, Host, Listen, h, State, Watch } from '@stencil/core';

const SCROLL_REPEAT_INTERVAL = 100; // Interval for repeated scrolling when holding down scroll button
const NAVBAR_DISABLE_DURATION = 400; // Duration to temporarily disable navbar interactions during scrolling

/**
 * @slot default - Slot for the navigation bar.
 * @slot back-button - Slot for the back button (only visible on mobile).
 */
@Component({
  tag: 'post-mainnavigation',
  styleUrl: './post-mainnavigation.scss',
  shadow: false,
})
export class PostMainnavigation {
  private header: HTMLPostHeaderElement | null;
  private navbar: HTMLElement | null;
  private scrollRepeatTimer: ReturnType<typeof setInterval>;
  private navbarDisableTimer: ReturnType<typeof setInterval>;
  private observer = new MutationObserver(() =>
    setTimeout(() => {
      this.checkScrollability(); // Recalculate scroll position after DOM changes
    }, 100),
  );

  @Element() host: HTMLPostMainnavigationElement;

  @State() canScrollLeft = false;
  @State() canScrollRight = true;
  @State() translateAmount = 0;

  @Watch('translateAmount')
  translateNav(value: number) {
    this.navbar.style.transform = `translateX(-${value}px)`;
    this.checkScrollability();
  }

  /**
   * Retrieves a reference to the closest 'post-header' element when the main navigation is added to the DOM.
   */
  connectedCallback() {
    this.header = this.host.closest('post-header');
  }

  /**
   * Cleans up references and disconnects the MutationObserver when the main navigation is removed from the DOM.
   */
  disconnectedCallback() {
    this.header = null;
    this.navbar = null;
    this.observer.disconnect();
  }

  /**
   * Finds the navbar element, sets up the MutationObserver, and scroll event listener after the main navigation is loaded.
   */
  componentDidLoad() {
    this.navbar = this.host.querySelector('& > nav > post-list > [role="list"]');
    if (!this.navbar) {
      throw new Error('The main navigation is missing navigation items');
    }

    setTimeout(() => this.checkScrollability()); // Initial scroll state check
    this.observer.observe(this.navbar, { childList: true });
    window.addEventListener('resize', () => this.checkScrollability());
  }

  /**
   * Stops the repeated scrolling when the mouse is released.
   */
  @Listen('mouseup', { target: 'window' })
  stopScrolling() {
    if (this.scrollRepeatTimer) clearInterval(this.scrollRepeatTimer);
  }

  /**
   * Handles the back button click to toggle the mobile menu in the header.
   */
  private handleBackButtonClick() {
    if (this.header) {
      this.header.toggleMobileMenu();
    }
  }

  private scrollLeft() {
    for (const item of Array.from(this.navigationItems).reverse()) {
      if (item.offsetLeft >= this.translateAmount) continue;

      this.translateAmount = item.offsetLeft;
      break;
    }
  }

  private scrollRight() {
    for (const item of this.navigationItems) {
      const offsetRight = item.offsetLeft + item.offsetWidth;

      if (offsetRight <= this.navbar.clientWidth + this.translateAmount) continue;

      this.translateAmount = offsetRight - this.navbar.clientWidth;
      break;
    }
  }

  /**
   * Scrolls the navbar (left or right) and sets up repeat scrolling at intervals.
   *
   * @param scrollFn
   */
  private handleScroll = (scrollFn: () => void) => () => {
    if (!this.canScroll) return; // Exit if scrolling is not possible

    this.preventNavbarInteractions(); // Temporarily disable interaction with navbar while scrolling

    scrollFn(); // Perform the scroll action

    // Repeat the scrolling action at regular intervals
    this.scrollRepeatTimer = setInterval(() => {
      scrollFn();
    }, SCROLL_REPEAT_INTERVAL);
  };

  private get navigationItems(): HTMLElement[] {
    const listItems = this.navbar.querySelectorAll('post-list-item');
    return Array.from(listItems) as HTMLElement[];
  }

  /**
   * Temporarily disables interactions with the navbar during scrolling.
   * Re-enables interactions after a short duration.
   */
  private preventNavbarInteractions() {
    if (this.navbarDisableTimer) clearTimeout(this.navbarDisableTimer);

    // Disable pointer events (e.g., clicking)
    this.navbar.style.pointerEvents = 'none';

    // Re-enable pointer events after a brief delay
    this.navbarDisableTimer = setTimeout(() => {
      this.navbar.style.pointerEvents = 'initial';
    }, NAVBAR_DISABLE_DURATION);
  }

  /**
   * Checks if scrolling is possible in either the left or right direction based on the current scroll position.
   * Updates the state of `isScrollLeftEnabled` and `isScrollRightEnabled`.
   */
  private checkScrollability() {
    const { scrollWidth, clientWidth } = this.navbar;

    if (scrollWidth === clientWidth) {
      // If content is fully visible, disable scrolling in both directions
      this.canScrollLeft = this.canScrollRight = false;
    } else {
      // If not, enable scrolling at the start or end
      this.canScrollLeft = this.translateAmount !== 0;
      this.canScrollRight = clientWidth + this.translateAmount !== scrollWidth;
    }
  }

  /**
   * Returns whether scrolling is enabled in either the left or right direction.
   */
  private get canScroll(): boolean {
    return this.canScrollLeft || this.canScrollRight;
  }

  render() {
    return (
      <Host slot="post-mainnavigation">
        <div onClick={() => this.handleBackButtonClick()} class="back-button">
          <slot name="back-button"></slot>
        </div>
        <nav>
          <slot></slot>
          <button
            type="button"
            aria-hidden="true"
            tabindex="-1"
            class={`scroll-left-button${this.canScrollLeft ? '' : ' d-none'}`}
            onMouseDown={this.handleScroll(() => this.scrollLeft())}
          >
            <post-icon aria-hidden="true" name="chevronleft"></post-icon>
          </button>
          <button
            type="button"
            aria-hidden="true"
            tabindex="-1"
            class={`scroll-right-button${this.canScrollRight ? '' : ' d-none'}`}
            onMouseDown={this.handleScroll(() => this.scrollRight())}
          >
            <post-icon aria-hidden="true" name="chevronright"></post-icon>
          </button>
        </nav>
      </Host>
    );
  }
}

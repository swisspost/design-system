import { Component, Element, Host, Listen, h, State } from '@stencil/core';

const SCROLL_OFFSET = 50; // Amount to scroll on each scroll button press
const SCROLL_REPEAT_INTERVAL = 100; // Interval for repeated scrolling when holding down scroll button
const NAVBAR_DISABLE_DURATION = 400; // Duration to temporarily disable navbar interactions during scrolling

/**
 * @slot default - Slot for the navigation bar.
 * @slot back-button - Slot for the back button (only visible on mobile).
 */
@Component({
  tag: 'post-mainnavigation',
  shadow: false,
  styleUrl: './post-mainnavigation.scss',
})
export class PostMainnavigation {
  private header: HTMLPostHeaderElement | null;
  private navbar: HTMLElement | null;
  private currentScrollPosition = 0;
  private scrollRepeatTimer: ReturnType<typeof setInterval>;
  private navbarDisableTimer: ReturnType<typeof setInterval>;
  private observer = new MutationObserver(() =>
    setTimeout(() => {
      this.updateScroll(); // Recalculate scroll position after DOM changes
    }, 100),
  );

  @Element() host: HTMLPostMainnavigationElement;

  @State() scrollSnapAlign: 'end' | 'start' = 'end';
  @State() canScrollLeft = false;
  @State() canScrollRight = false;

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
    if (this.navbar) {
      setTimeout(() => this.updateScroll()); // Initial scroll state check
      this.observer.observe(this.navbar, { childList: true });
      this.navbar.addEventListener('scroll', () => this.updateScroll());
    }
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

  /**
   * Updates the scroll position and determines if the scroll direction has changed.
   */
  private updateScroll() {
    this.checkScrollability(); // Check if scroll is possible in either direction
    if (!this.canScroll) return; // Exit if scrolling is not possible

    const newScrollSnap = this.currentScrollPosition > this.navbar.scrollLeft ? 'start' : 'end';
    if (this.scrollSnapAlign !== newScrollSnap) this.scrollSnapAlign = newScrollSnap;

    this.currentScrollPosition = this.navbar.scrollLeft; // Update scroll position
  }

  /**
   * Scrolls the navbar by a given offset (left or right) and sets up repeat scrolling at intervals.
   *
   * @param {number} offset - The amount to scroll (positive for right, negative for left)
   */
  private scrollBy(offset: number) {
    if (!this.canScroll) return; // Exit if scrolling is not possible

    this.preventNavbarInteractions(); // Temporarily disable interaction with navbar while scrolling
    this.navbar.scrollTo(this.navbar.scrollLeft + offset, 0); // Perform the scroll action

    // Repeat the scrolling action at regular intervals
    this.scrollRepeatTimer = setInterval(() => {
      this.navbar.scrollTo(this.navbar.scrollLeft + offset, 0);
    }, SCROLL_REPEAT_INTERVAL);
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
    const { scrollLeft, scrollWidth, clientWidth } = this.navbar;

    if (scrollWidth === clientWidth) {
      // If content is fully visible, disable scrolling in both directions
      this.canScrollLeft = this.canScrollRight = false;
    } else {
      // If not, enable scrolling at the start or end
      this.canScrollLeft = scrollLeft !== 0;
      this.canScrollRight = scrollLeft !== scrollWidth - clientWidth;
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
        <nav class={`scroll-snap-align-${this.scrollSnapAlign}`}>
          <button
            type="button"
            aria-hidden="true"
            tabindex="-1"
            class={`scroll-left-button${this.canScrollLeft ? '' : ' d-none'}`}
            onMouseDown={() => this.scrollBy(-SCROLL_OFFSET)} // Scroll left
          >
            <post-icon aria-hidden="true" name="2110"></post-icon>
          </button>
          <slot></slot>
          <button
            type="button"
            aria-hidden="true"
            tabindex="-1"
            class={`scroll-right-button${this.canScrollRight ? '' : ' d-none'}`}
            onMouseDown={() => this.scrollBy(SCROLL_OFFSET)} // Scroll right
          >
            <post-icon aria-hidden="true" name="2111"></post-icon>
          </button>
        </nav>
      </Host>
    );
  }
}

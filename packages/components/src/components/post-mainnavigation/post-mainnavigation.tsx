import { Component, Element, Host, h, State, Listen, Prop, Watch } from '@stencil/core';
import { checkRequiredAndType } from '@/utils';
import { version } from '@root/package.json';

const SCROLL_REPEAT_INTERVAL = 100; // Interval for repeated scrolling when holding down scroll button
const NAVBAR_DISABLE_DURATION = 400; // Duration to temporarily disable navbar interactions during scrolling

@Component({
  tag: 'post-mainnavigation',
  styleUrl: './post-mainnavigation.scss',
  shadow: true,
})
export class PostMainnavigation {
  @Element() host: HTMLPostMainnavigationElement;

  private navbar: HTMLElement;

  private scrollRepeatInterval: ReturnType<typeof setInterval>;
  private navbarDisableTimer: ReturnType<typeof setInterval>;

  private resizeObserver: ResizeObserver;
  private mutationObserver: MutationObserver;

  @State() canScrollLeft = false;
  @State() canScrollRight = false;

  /**
   * Defines the accessible label for the navigation element. This text is used as the `aria-label` attribute to provide screen reader users with a description of the navigation's purpose.
   */
  @Prop({ reflect: true }) textMain!: string;

  @Watch('textMain')
  validateTextMain() {
    checkRequiredAndType(this, 'textMain', 'string');
  }

  constructor() {
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.checkScrollability = this.checkScrollability.bind(this);

    this.resizeObserver = new ResizeObserver(this.checkScrollability);
    this.mutationObserver = new MutationObserver(this.checkScrollability);
  }

  componentDidLoad() {
    this.validateTextMain();

    setTimeout(() => {
      this.checkScrollability();
    });

    // Observe the navbar for size changes
    this.resizeObserver.observe(this.navbar);

    // Observe the navabar for mutation changes
    this.mutationObserver.observe(this.navbar, { subtree: true, childList: true }); // Recheck scrollability when navigation list changes

    // Ensure the scroll buttons are correctly displayed or hidden whenever the navbar is scrolled
    this.navbar.addEventListener('scrollend', this.checkScrollability);
  }

  /**
   * Disconnects observers and remove event listeners when the main navigation is removed from the DOM.
   */
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    this.navbar.removeEventListener('scrollend', this.checkScrollability);
  }

  /**
   * Stops the repeated scrolling when the mouse button is released.
   */
  @Listen('mouseup', { target: 'window' })
  @Listen('mouseleave', { target: 'window' })
  stopScrolling() {
    if (this.scrollRepeatInterval) clearInterval(this.scrollRepeatInterval);
  }

  private get navigationItems(): HTMLElement[] {
    return Array.from(
      this.host.querySelectorAll('a:not(post-megadropdown *), post-megadropdown-trigger'),
    );
  }

  /**
   * Returns whether scrolling is enabled in either the left or right direction.
   */
  private get canScroll(): boolean {
    return this.canScrollLeft || this.canScrollRight;
  }

  /**
   * Checks if scrolling is possible in either direction (left or right) and updates the state accordingly.
   */
  private checkScrollability() {
    const { scrollLeft, scrollWidth, clientWidth } = this.navbar;
    if (scrollWidth === clientWidth) {
      // If scroll width equals client width, scrolling is disabled in both directions
      this.canScrollLeft = this.canScrollRight = false;
    } else {
      this.canScrollLeft = Math.floor(scrollLeft) > 0; // Scrolling left is possible if not at the start
      this.canScrollRight = Math.ceil(clientWidth + scrollLeft) < scrollWidth; // Scrolling right is possible if not at the end
    }
  }

  /**
   * Handles the scrolling behavior when a user clicks on the left or right scroll buttons.
   */
  private handleScrollButtonClick(e: MouseEvent, direction: 'left' | 'right') {
    if (!this.canScroll || e.button !== 0) return;

    // Disable interaction with the navbar during scrolling
    this.temporarilyDisableNavbar();

    // Set up the correct scroll function
    const scroll = direction === 'right' ? this.scrollRight : this.scrollLeft;
    scroll();

    // Repeat the scrolling action while the button is held down
    this.scrollRepeatInterval = setInterval(() => {
      scroll();
    }, SCROLL_REPEAT_INTERVAL);
  }

  private scrollRight() {
    const scrollRightLeftEdge = this.host.shadowRoot
      .querySelector('.scroll-right')
      .getBoundingClientRect().left;

    for (const navigationItem of this.navigationItems) {
      const { right, width } = navigationItem.getBoundingClientRect();

      // Scroll to the first navigation item that is less than 75% visible
      const isThreeQuartersVisible = right - 0.25 * width < scrollRightLeftEdge;
      if (!isThreeQuartersVisible) {
        this.navbar.scrollBy({ left: right - scrollRightLeftEdge });
        return;
      }
    }
  }

  private scrollLeft() {
    const scrollLeftRightEdge = this.host.shadowRoot
      .querySelector('.scroll-left')
      .getBoundingClientRect().right;

    for (const navigationItem of this.navigationItems.reverse()) {
      const { left, width } = navigationItem.getBoundingClientRect();

      // Scroll to the first navigation item that is less than 75% visible
      const isThreeQuartersVisible = left + 0.25 * width > scrollLeftRightEdge;
      if (!isThreeQuartersVisible) {
        this.navbar.scrollBy({ left: left - scrollLeftRightEdge });
        return;
      }
    }
  }

  /**
   * Temporarily disables interactions with the navbar during scrolling to prevent accidental clicks.
   * Re-enables interactions after a brief delay to avoid blocking the user entirely.
   */
  private temporarilyDisableNavbar() {
    if (this.navbarDisableTimer) clearTimeout(this.navbarDisableTimer);

    this.navbar.setAttribute('inert', '');

    this.navbarDisableTimer = setTimeout(() => {
      this.navbar.removeAttribute('inert');
    }, NAVBAR_DISABLE_DURATION);
  }

  render() {
    return (
      <Host version={version} class={this.canScroll ? 'scrollable' : ''}>
        <div
          aria-hidden="true"
          class={{ 'scroll-control scroll-left': true, 'd-none': !this.canScrollLeft }}
          onMouseDown={e => this.handleScrollButtonClick(e, 'left')}
        >
          <post-icon aria-hidden="true" name="chevronleft"></post-icon>
        </div>

        <nav ref={el => (this.navbar = el)} aria-label={this.textMain}>
          <slot></slot>
        </nav>

        <div
          aria-hidden="true"
          class={{ 'scroll-control scroll-right': true, 'd-none': !this.canScrollRight }}
          onMouseDown={e => this.handleScrollButtonClick(e, 'right')}
        >
          <post-icon aria-hidden="true" name="chevronright"></post-icon>
        </div>
      </Host>
    );
  }
}

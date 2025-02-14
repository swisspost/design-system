import { Component, Host, h, Element, State, Watch, Listen } from '@stencil/core';
import { throttle } from 'throttle-debounce';

const SCROLL_REPEAT_INTERVAL = 100; // Interval for repeated scrolling when holding down scroll button
const NAVBAR_DISABLE_DURATION = 400; // Duration to temporarily disable navbar interactions during scrolling

const NAVIGATION_LIST_SELECTOR = 'post-list > [role="list"]:not(post-megadropdown *)';
const NAVIGATION_ITEM_SELECTOR = 'post-list-item :is(a, button):not(post-megadropdown *)';

@Component({
  tag: 'post-mainnavigation',
  shadow: false,
  styleUrl: './post-mainnavigation.scss',
})
export class PostMainnavigation {
  private header: HTMLPostHeaderElement | null;
  private navbar: HTMLElement;
  private rightScrollButton: HTMLButtonElement;
  private leftScrollButton: HTMLButtonElement;

  private scrollRepeatInterval: ReturnType<typeof setInterval>;
  private navbarDisableTimer: ReturnType<typeof setInterval>;

  private mutationObserver = new MutationObserver(async mutations => {
    // Wait for all elements to be hydrated
    await Promise.all(
      mutations
        .flatMap((mutation: MutationRecord) => Array.from(mutation.addedNodes))
        .map((item: HTMLPostListItemElement) =>
          item.componentOnReady ? item.componentOnReady() : Promise.resolve(item),
        ),
    );

    // Recalculate scrollability after DOM changes
    this.checkScrollability();
  });

  @Element() host: HTMLPostMainnavigationElement;

  @State() canScrollLeft = false;
  @State() canScrollRight = false;
  @State() translationAmount = 0;

  /**
   * Update navbar translation when 'translateAmount' changes and recalculate scrollability
   */
  @Watch('translationAmount')
  onTranslateAmountChanges(value: number) {
    this.navbar.style.marginInlineStart = `-${value}px`;
    this.checkScrollability();
  }

  /**
   * Retrieves a reference to the closest 'post-header' element when the main navigation is added to the DOM.
   * This ensures that we can interact with the header for mobile menu toggling.
   */
  connectedCallback() {
    this.header = this.host.closest('post-header');
  }

  /**
   * Cleans up references and disconnects the MutationObserver when the main navigation is removed from the DOM.
   */
  disconnectedCallback() {
    this.header = null;
    this.mutationObserver.disconnect();
  }

  componentDidLoad() {
    setTimeout(() => this.checkScrollability()); // Initial check to determine if scrolling is needed
    this.mutationObserver.observe(this.navigationList, { subtree: true, childList: true }); // Recheck scrollability when navigation list changes
    window.addEventListener(
      'resize', // Recheck scrollability on window resize
      throttle(100, () => this.checkScrollability()),
    );

    // Handle focus changes and adjust scroll as needed
    this.navbar.addEventListener('focusin', e => this.adjustTranslation(e));
  }

  private handleBackButtonClick() {
    if (this.header) this.header.toggleMobileMenu();
  }

  /**
   * Moves focus on the navbar and adjusts scrolling to bring focused element into view.
   */
  private adjustTranslation(e: FocusEvent) {
    const focusedElement = e.target as HTMLElement;
    if (!this.canScroll || !focusedElement.matches(NAVIGATION_ITEM_SELECTOR)) return;

    // We need to move the element into the view before it is focused to avoid browser default behavior
    e.preventDefault();

    this.withoutTransition(() => {
      // Try scrolling in both directions, only the necessary translation will actually occur
      this.translateRightTo(focusedElement);
      this.translateLeftTo(focusedElement);

      focusedElement.focus();
    });
  }

  /**
   * Checks if scrolling is possible in either direction (left or right) and updates the state accordingly.
   */
  private checkScrollability() {
    const { scrollWidth, clientWidth } = this.navbar;
    const couldScroll = this.canScroll;

    if (scrollWidth === clientWidth) {
      // If scroll width equals client width, scrolling is disabled in both directions
      this.canScrollLeft = this.canScrollRight = false;
    } else {
      this.canScrollLeft = this.translationAmount > 0; // Scrolling left is possible if not at the start
      this.canScrollRight = clientWidth + this.translationAmount < scrollWidth; // Scrolling right is possible if not at the end
    }

    if (couldScroll && !this.canScroll) {
      this.withoutTransition(() => (this.translationAmount = 0));
    }
  }

  /**
   * Returns whether scrolling is enabled in either the left or right direction.
   */
  private get canScroll(): boolean {
    return this.canScrollLeft || this.canScrollRight;
  }

  /**
   * Handles the scrolling behavior when a user clicks on the left or right scroll buttons.
   */
  private handleScrollButtonClick(direction: 'left' | 'right') {
    if (!this.canScroll) return;

    // Disable interaction with the navbar during scrolling
    this.disableNavbar();

    // Perform the initial scroll action
    this.scroll(direction);

    // Repeat the scrolling action while the button is held down
    this.scrollRepeatInterval = setInterval(() => {
      this.scroll(direction);
    }, SCROLL_REPEAT_INTERVAL);
  }

  /**
   * Stops the repeated scrolling when the mouse button is released.
   */
  @Listen('mouseup', { target: 'window' })
  stopScrolling() {
    if (this.scrollRepeatInterval) clearInterval(this.scrollRepeatInterval);
  }

  private scroll(direction: 'left' | 'right') {
    const navigationItems = Array.from(this.navigationItems);
    if (direction === 'left') navigationItems.reverse();

    for (const item of navigationItems) {
      const couldScroll =
        direction === 'left' ? this.translateLeftTo(item, true) : this.translateRightTo(item, true);
      if (couldScroll) break;
    }
  }

  private translateRightTo(navigationItem: HTMLElement, skipSmallTranslation = false) {
    const listItem: HTMLElement = navigationItem.closest('post-list-item');

    // Calculate the right edge position of the list item relative to the left of the screen
    const rightEdgePosition = listItem.offsetLeft + listItem.offsetWidth;

    // Calculate the last visible position on the screen, right before the right scroll button
    const lastVisiblePosition = this.host.clientWidth - this.rightScrollButton.clientWidth;

    // If the item is already fully visible, no translation is needed
    if (rightEdgePosition < lastVisiblePosition) return false;

    const translationIncrease = rightEdgePosition - lastVisiblePosition + 1; // + 1 because offset values are rounded

    // If the required scroll distance is too small (less than half the width of the item), avoid unnecessary scroll
    if (skipSmallTranslation && translationIncrease < listItem.clientWidth / 2) return false;

    // Calculate the maximum translation amount to prevent scrolling past the end of the content
    const maximumTranslation = this.navbar.scrollWidth - this.host.clientWidth;

    // Adjust the translation amount, ensuring it doesn't exceed the maximum scrollable area
    const { marginRight } = getComputedStyle(this.navigationList);
    this.translationAmount =
      Math.min(this.translationAmount + translationIncrease, maximumTranslation) +
      parseInt(marginRight);

    return true;
  }

  private translateLeftTo(navigationItem: HTMLElement, skipSmallTranslation = false) {
    const listItem: HTMLElement = navigationItem.closest('post-list-item');

    // Get the left edge position of the list item relative to the left of the screen
    const leftEdgePosition = listItem.offsetLeft;

    // Calculate the first visible position on the screen to the left, right after the left scroll button
    const firstVisiblePosition = this.leftScrollButton.clientWidth;

    // If the item is already fully visible, no translation is needed
    if (leftEdgePosition > firstVisiblePosition) return false;

    const translationDecrease = firstVisiblePosition - leftEdgePosition + 1; // + 1 because offset values are rounded

    // If the required scroll distance is too small (less than half the width of the item), don't perform the scroll
    if (skipSmallTranslation && translationDecrease < listItem.clientWidth / 2) return false;

    // Calculate the minimum allowed translation amount (no negative scrolling allowed)
    const minimumTranslation = 0;

    // Adjust the translation amount, ensuring it doesn't go below the minimum scrollable area
    const { marginLeft } = getComputedStyle(this.navigationList);
    this.translationAmount = Math.max(
      this.translationAmount - translationDecrease - parseInt(marginLeft),
      minimumTranslation,
    );

    return true;
  }

  /**
   * Returns the navigation list container element
   */
  private get navigationList(): HTMLElement {
    return this.navbar.querySelector(NAVIGATION_LIST_SELECTOR);
  }

  /**
   * Returns the navigation items
   */
  private get navigationItems(): NodeListOf<HTMLElement> {
    return this.navbar.querySelectorAll(NAVIGATION_ITEM_SELECTOR);
  }

  /**
   * Temporarily disables interactions with the navbar during scrolling to prevent accidental clicks.
   * Re-enables interactions after a brief delay to avoid blocking the user entirely.
   */
  private disableNavbar() {
    if (this.navbarDisableTimer) clearTimeout(this.navbarDisableTimer);

    this.navbar.style.pointerEvents = 'none';

    this.navbarDisableTimer = setTimeout(() => {
      this.navbar.style.pointerEvents = 'initial';
    }, NAVBAR_DISABLE_DURATION);
  }

  /**
   * Allows to translate the navbar without a transition
   */
  private withoutTransition(callback: () => void) {
    const transition = this.navbar.style.transition;
    this.navbar.style.transition = 'none';

    callback();

    setTimeout(() => {
      this.navbar.style.transition = transition;
    });
  }

  render() {
    return (
      <Host slot="post-mainnavigation">
        <div onClick={() => this.handleBackButtonClick()} class="back-button">
          <slot name="back-button"></slot>
        </div>

        <nav ref={el => (this.navbar = el)}>
          <slot></slot>
        </nav>

        <div class={`left-scroll-button${this.canScrollLeft ? '' : ' d-none'}`} aria-hidden="true">
          <button
            type="button"
            tabindex="-1"
            ref={el => (this.leftScrollButton = el)}
            onMouseDown={() => this.handleScrollButtonClick('left')}
          >
            <post-icon aria-hidden="true" name="chevronleft"></post-icon>
          </button>
        </div>

        <div
          class={`right-scroll-button${this.canScrollRight ? '' : ' d-none'}`}
          aria-hidden="true"
        >
          <button
            type="button"
            tabindex="-1"
            ref={el => (this.rightScrollButton = el)}
            onMouseDown={() => this.handleScrollButtonClick('right')}
          >
            <post-icon aria-hidden="true" name="chevronright"></post-icon>
          </button>
        </div>
      </Host>
    );
  }
}

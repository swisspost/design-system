import { Component, Host, h, State, Listen } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot back-button - Back button for mobile navigation.
 * @slot target-group - Target group buttons (appears in global header on desktop, mobile menu on mobile).
 * @slot default - Main navigation items.
 */

const SCROLL_REPEAT_INTERVAL = 100;
const NAVBAR_DISABLE_DURATION = 400;

@Component({
  tag: 'post-mainnavigation',
  styleUrl: './post-mainnavigation.scss',
  shadow: false,
})
export class PostMainnavigation {
  private navbar: HTMLElement;
  private scrollRepeatInterval: ReturnType<typeof setInterval>;
  private navbarDisableTimer: ReturnType<typeof setInterval>;
  private resizeObserver: ResizeObserver;
  private mutationObserver: MutationObserver;

  @State() canScrollLeft = false;
  @State() canScrollRight = false;

  constructor() {
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.handleMutations = this.handleMutations.bind(this);
    this.checkScrollability = this.checkScrollability.bind(this);

    this.resizeObserver = new ResizeObserver(this.checkScrollability);
    this.mutationObserver = new MutationObserver(this.handleMutations);
  }

  componentDidLoad() {
    setTimeout(() => {
      this.fixLayoutShift();
      this.checkScrollability();
    });

    this.resizeObserver.observe(this.navbar);
    this.mutationObserver.observe(this.navbar, { subtree: true, childList: true });
    this.navbar.addEventListener('scrollend', this.checkScrollability);
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    this.navbar.removeEventListener('scrollend', this.checkScrollability);
  }

  @Listen('mouseup', { target: 'window' })
  @Listen('mouseleave', { target: 'window' })
  stopScrolling() {
    if (this.scrollRepeatInterval) clearInterval(this.scrollRepeatInterval);
  }

  private async handleMutations(mutations: MutationRecord[]) {
    const addedNodes = mutations.flatMap((mutation: MutationRecord) => {
      return Array.from(mutation.addedNodes);
    });

    await Promise.all(
      addedNodes.map((item: HTMLPostListItemElement) =>
        item.componentOnReady ? item.componentOnReady() : Promise.resolve(item),
      ),
    );

    this.fixLayoutShift();
    this.checkScrollability();
  }

  private get navigationItems(): HTMLElement[] {
    // Query the slotted post-list content for navigation items
    return Array.from(this.navbar.querySelectorAll('post-list-item a, post-list-item button, post-megadropdown-trigger button'));
  }

  private fixLayoutShift() {
    this.navigationItems
      .filter(item => !item.matches(':has(.nav-el-active)'))
      .forEach(item => {
        item.innerHTML = `
          <span class="nav-el-active">${item.innerHTML}</span>
          <span class="nav-el-inactive" aria-hidden="true">${item.innerHTML}</span>
        `;
      });
  }

  private handleBackButtonClick() {
    const header = this.navbar.closest<HTMLPostHeaderElement>('post-header');
    if (header) header.toggleMobileMenu();
  }

  private get canScroll(): boolean {
    return this.canScrollLeft || this.canScrollRight;
  }

  private checkScrollability() {
    const { scrollLeft, scrollWidth, clientWidth } = this.navbar;
    if (scrollWidth === clientWidth) {
      this.canScrollLeft = this.canScrollRight = false;
    } else {
      this.canScrollLeft = Math.floor(scrollLeft) > 0;
      this.canScrollRight = Math.ceil(clientWidth + scrollLeft) < scrollWidth;
    }
  }

  private handleScrollButtonClick(e: MouseEvent, direction: 'left' | 'right') {
    if (!this.canScroll || e.button !== 0) return;

    this.temporarilyDisableNavbar();

    const scroll = direction === 'right' ? this.scrollRight : this.scrollLeft;
    scroll();

    this.scrollRepeatInterval = setInterval(() => {
      scroll();
    }, SCROLL_REPEAT_INTERVAL);
  }

  private scrollRight() {
    const scrollRightLeftEdge = this.navbar.querySelector('.scroll-right')?.getBoundingClientRect().left || 0;

    for (const navigationItem of this.navigationItems) {
      const { right, width } = navigationItem.getBoundingClientRect();

      const isThreeQuartersVisible = right - 0.25 * width < scrollRightLeftEdge;
      if (!isThreeQuartersVisible) {
        this.navbar.scrollBy({ left: right - scrollRightLeftEdge });
        return;
      }
    }
  }

  private scrollLeft() {
    const scrollLeftRightEdge = this.navbar.querySelector('.scroll-left')?.getBoundingClientRect().right || 0;

    for (const navigationItem of this.navigationItems.reverse()) {
      const { left, width } = navigationItem.getBoundingClientRect();

      const isThreeQuartersVisible = left + 0.25 * width > scrollLeftRightEdge;
      if (!isThreeQuartersVisible) {
        this.navbar.scrollBy({ left: left - scrollLeftRightEdge });
        return;
      }
    }
  }

  private temporarilyDisableNavbar() {
    if (this.navbarDisableTimer) clearTimeout(this.navbarDisableTimer);

    this.navbar.setAttribute('inert', '');

    this.navbarDisableTimer = setTimeout(() => {
      this.navbar.removeAttribute('inert');
    }, NAVBAR_DISABLE_DURATION);
  }

  render() {
    return (
      <Host version={version}>
        {/* Back button */}
        <div onClick={() => this.handleBackButtonClick()} class="back-button">
          <slot name="back-button"></slot>
        </div>

        {/* Target group - positioned via CSS for desktop/mobile */}
        <div class="target-group">
          <slot name="target-group"></slot>
        </div>

        {/* Scroll controls for desktop */}
        <div
          aria-hidden="true"
          class={{ 'scroll-control scroll-left': true, 'd-none': !this.canScrollLeft }}
          onMouseDown={e => this.handleScrollButtonClick(e, 'left')}
        >
          <post-icon aria-hidden="true" name="chevronleft"></post-icon>
        </div>

        {/* Main navigation */}
        <nav ref={el => (this.navbar = el)}>
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

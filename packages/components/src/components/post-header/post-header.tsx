import { Component, h, Host, State, Element, Method, Watch } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { SwitchVariant } from '@/components';
import { breakpoint, Device } from '@/utils/breakpoints';
import { slideDown, slideUp } from '@/animations/slide';
import { getFocusableChildren } from '@/utils/get-focusable-children';
import { EventFrom } from '@/utils/event-from';

/**
 * @slot post-logo - Should be used together with the `<post-logo>` component.
 * @slot meta-navigation - Holds an `<ul>` with meta navigation links.
 * @slot post-togglebutton - Holds the mobile menu toggler.
 * @slot post-language-switch - Should be used with the `<post-language-switch>` component.
 * @slot title - Holds the application title.
 * @slot default - Custom controls or content, right aligned in the local header.
 * @slot post-mainnavigation - Has a default slot because it's only meant to be used in the `<post-header>`.
 * @slot target-group - Holds the list of buttons to choose the target group.
 * @slot global-login - Holds the user menu or login button in the global header.
 * @slot navigation-controls - Custom controls, right aligned with the main navigation.
 */

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;
  private mobileMenu: HTMLElement;
  private mobileMenuAnimation: Animation;
  private readonly throttledResize = throttle(50, () => this.updateLocalHeaderHeight());
  private scrollParentResizeObserver: ResizeObserver;
  private localHeaderResizeObserver: ResizeObserver;

  private get hasMobileMenu(): boolean {
    return this.device !== 'desktop' && this.hasNavigation;
  }

  get scrollParent(): HTMLElement {
    const frozenScrollParent: HTMLElement | null = document.querySelector(
      '[data-post-scroll-locked]',
    );

    if (frozenScrollParent) return frozenScrollParent;

    let element: HTMLElement | null = this.host.parentElement;

    while (element) {
      const overflow = getComputedStyle(element).overflowY;

      if (['auto', 'scroll'].includes(overflow)) {
        return element;
      }

      element = element.parentElement;
    }

    return document.body;
  }

  @Element() host: HTMLPostHeaderElement;

  @State() device: Device = breakpoint.get('device');
  @State() hasNavigation: boolean = false;
  @State() hasTitle: boolean = false;
  @State() mobileMenuExtended: boolean = false;
  @State() megadropdownOpen: boolean = false;

  @Watch('device')
  @Watch('mobileMenuExtended')
  lockBody(newValue: boolean | string, _oldValue: boolean | string, propName: string) {
    const scrollParent = this.scrollParent;
    const mobileMenuExtended =
      propName === 'mobileMenuExtended' ? newValue : this.mobileMenuExtended;

    if (this.device !== 'desktop' && mobileMenuExtended) {
      scrollParent.setAttribute('data-post-scroll-locked', '');
      this.host.addEventListener('keydown', this.keyboardHandler);
    } else {
      scrollParent.removeAttribute('data-post-scroll-locked');
      this.host.removeEventListener('keydown', this.keyboardHandler);
    }
  }

  constructor() {
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.updateScrollParentHeight = this.updateScrollParentHeight.bind(this);
    this.updateLocalHeaderHeight = this.updateLocalHeaderHeight.bind(this);
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  private readonly breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
    this.switchLanguageSwitchMode();

    if (this.device === 'desktop' && this.mobileMenuExtended) {
      this.closeMobileMenu();
    }

    if (this.device !== 'desktop') {
      Array.from(this.host.querySelectorAll('post-megadropdown')).forEach(dropdown => {
        dropdown.hide(false, true);
      });
      this.megadropdownOpen = false;
    }
  };

  connectedCallback() {
    window.addEventListener('resize', this.throttledResize, { passive: true });
    window.addEventListener('scroll', this.handleScrollEvent, {
      passive: true,
    });
    this.scrollParent.addEventListener('scroll', this.handleScrollEvent, {
      passive: true,
    });
    document.addEventListener('postToggleMegadropdown', this.megadropdownStateHandler);
    this.host.addEventListener('click', this.handleLinkClick);
    window.addEventListener('postBreakpoint:device', this.breakpointChange);

    this.checkNavigationExistence();
    this.checkTitleExistence();
    this.switchLanguageSwitchMode();

    this.handleScrollParentResize();
    this.lockBody(false, this.mobileMenuExtended, 'mobileMenuExtended');
  }

  componentWillRender() {
    this.handleScrollEvent();
  }

  componentDidRender() {
    this.getFocusableElements();
    this.handleLocalHeaderResize();
  }

  componentDidLoad() {
    this.updateLocalHeaderHeight();
  }

  // Clean up possible side effects when post-header is disconnected
  disconnectedCallback() {
    const scrollParent = this.scrollParent;

    window.removeEventListener('postBreakpoint:device', this.breakpointChange);
    window.removeEventListener('resize', this.throttledResize);
    window.removeEventListener('scroll', this.handleScrollEvent);
    scrollParent.removeEventListener('scroll', this.handleScrollEvent);
    document.removeEventListener('postToggleMegadropdown', this.megadropdownStateHandler);
    this.host.removeEventListener('keydown', this.keyboardHandler);
    this.host.removeEventListener('click', this.handleLinkClick);

    if (this.scrollParentResizeObserver) {
      this.scrollParentResizeObserver.disconnect();
      this.scrollParentResizeObserver = null;
    }
    if (this.localHeaderResizeObserver) {
      this.localHeaderResizeObserver.disconnect();
      this.localHeaderResizeObserver = null;
    }

    this.mobileMenuExtended = false;
  }

  private checkNavigationExistence(): void {
    this.hasNavigation = this.host.querySelectorAll('post-mainnavigation').length > 0;
  }

  private checkTitleExistence(): void {
    this.hasTitle = this.host.querySelectorAll('[slot="title"]').length > 0;
  }

  private async closeMobileMenu() {
    this.mobileMenuAnimation.finish();

    const menuButton = this.getMenuButton();
    if (menuButton) {
      menuButton.toggled = false;
    }

    this.mobileMenuExtended = false;
  }

  /**
   * Toggles the mobile navigation.
   */
  @Method()
  async toggleMobileMenu(force?: boolean) {
    if (this.device === 'desktop') return;
    this.mobileMenuAnimation = this.mobileMenuExtended
      ? slideUp(this.mobileMenu)
      : slideDown(this.mobileMenu);

    // Update the state of the toggle button
    const menuButton = this.host.querySelector<HTMLPostTogglebuttonElement>('post-togglebutton');
    menuButton.toggled = force ?? !this.mobileMenuExtended;

    if (this.mobileMenuExtended) {
      // Wait for the close animation to finish before hiding megadropdowns
      await this.mobileMenuAnimation.finished;
      this.mobileMenuExtended = force ?? !this.mobileMenuExtended;

      if (this.mobileMenuExtended === false) {
        this.closeAllMegadropdowns();
      }
    } else {
      this.mobileMenuExtended = force ?? !this.mobileMenuExtended;
      // If opening, close any open megadropdowns immediately
      if (this.megadropdownOpen) {
        this.closeAllMegadropdowns();
      }
    }
  }

  @EventFrom('post-megadropdown')
  private megadropdownStateHandler = (event: CustomEvent) => {
    this.megadropdownOpen = event.detail.isVisible;
  };

  // Get all the focusable elements in the post-header mobile menu
  private getFocusableElements() {
    // Get elements in the correct order (different as the DOM order)
    const focusableEls = [
      ...Array.from(this.host.querySelectorAll('.list-inline:not([slot="meta-navigation"]) > li')),
      ...Array.from(
        this.host.querySelectorAll(
          'nav > post-list > div > post-list-item, post-megadropdown-trigger',
        ),
      ),
      ...Array.from(
        this.host.querySelectorAll(
          '.list-inline[slot="meta-navigation"] > li, post-language-option',
        ),
      ),
    ];

    // Add the main toggle menu button to the list of focusable children
    const focusableChildren = [
      this.host.querySelector('post-togglebutton'),
      ...focusableEls.flatMap(el => Array.from(getFocusableChildren(el))),
    ];

    this.firstFocusableEl = focusableChildren[0];
    this.lastFocusableEl = focusableChildren[focusableChildren.length - 1];
  }

  private getMenuButton(): HTMLPostTogglebuttonElement | null {
    return this.host.querySelector<HTMLPostTogglebuttonElement>('post-togglebutton');
  }

  private keyboardHandler(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.mobileMenuExtended) {
      if (e.shiftKey && document.activeElement === this.firstFocusableEl) {
        // If back tab (Tab + Shift) and first element is focused, focus goes to the last element of the megadropdown
        e.preventDefault();
        this.lastFocusableEl.focus();
      } else if (!e.shiftKey && document.activeElement === this.lastFocusableEl) {
        // If Tab and last element is focused, focus goes back to the first element of the megadropdown
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    }
  }

  private closeAllMegadropdowns() {
    Array.from(this.host.querySelectorAll('post-megadropdown')).forEach(dropdown => {
      dropdown.hide(false, true);
    });
    this.megadropdownOpen = false;
  }

  private handleScrollEvent() {
    const scrollTop =
      this.scrollParent === document.body ? window.scrollY : this.scrollParent.scrollTop;
    document.documentElement.style.setProperty('--post-header-scroll-top', `${scrollTop}px`);
  }

  private updateLocalHeaderHeight() {
    const localHeaderElement = this.host.shadowRoot.querySelector('.local-header');

    if (localHeaderElement) {
      document.documentElement.style.setProperty(
        '--post-local-header-expanded-height',
        `${localHeaderElement.clientHeight}px`,
      );
    }
  }

  private updateScrollParentHeight() {
    this.host.style.setProperty(
      '--post-header-scroll-parent-height',
      `${this.scrollParent.clientHeight}px`,
    );
  }

  private handleLinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const isLinkInMainNav = target.closest('post-mainnavigation a');
    const isLinkInMegadropdown = target.closest('post-megadropdown a');

    if (!isLinkInMainNav && !isLinkInMegadropdown) {
      return;
    }

    if (this.mobileMenuExtended && (isLinkInMainNav || isLinkInMegadropdown)) {
      this.toggleMobileMenu(false);
    }

    if (this.device === 'desktop' && isLinkInMegadropdown) {
      const megadropdownLink = target.closest('post-megadropdown a');
      if (megadropdownLink) {
        target.closest('post-megadropdown').hide(true);
      }
    }
  }

  private handleScrollParentResize() {
    if (this.scrollParent) {
      this.scrollParentResizeObserver = new ResizeObserver(this.updateScrollParentHeight);
      this.scrollParentResizeObserver.observe(this.scrollParent);
    }
  }

  private handleLocalHeaderResize() {
    const localHeader = this.host.shadowRoot.querySelector('.local-header');

    if (localHeader && !this.localHeaderResizeObserver) {
      this.localHeaderResizeObserver = new ResizeObserver(this.updateLocalHeaderHeight);
      this.localHeaderResizeObserver.observe(localHeader);
    }
  }

  private switchLanguageSwitchMode() {
    const variant: SwitchVariant = this.hasMobileMenu ? 'list' : 'menu';
    Array.from(this.host.querySelectorAll('post-language-switch')).forEach(languageSwitch => {
      languageSwitch?.setAttribute('variant', variant);
    });
  }

  private renderNavigation() {
    const mainNavigation = (
      <slot name="post-mainnavigation" onSlotchange={() => this.checkNavigationExistence()}></slot>
    );

    if (this.device === 'desktop') {
      return (
        <div class={{ 'navigation': true, 'megadropdown-open': this.megadropdownOpen }}>
          {mainNavigation}
          <slot name="navigation-controls"></slot>
        </div>
      );
    }

    return (
      <div
        class={{ navigation: true, extended: this.mobileMenuExtended }}
        style={{ '--post-header-navigation-current-inset': `${this.mobileMenu?.scrollTop ?? 0}px` }}
      >
        <div class="mobile-menu" ref={el => (this.mobileMenu = el)}>
          <div class="navigation-header">
            <slot name="navigation-controls"></slot>
            <slot name="target-group"></slot>
          </div>
          {mainNavigation}
          <div class="navigation-footer">
            <slot name="meta-navigation"></slot>
            <slot name="post-language-switch"></slot>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const localHeaderClasses = ['local-header'];
    if (this.mobileMenuExtended) localHeaderClasses.push('local-header-mobile-extended');
    if (this.device !== 'desktop' || !this.hasNavigation) localHeaderClasses.push('no-navigation');
    if (!this.hasTitle) localHeaderClasses.push('no-title');

    return (
      <Host data-version={version} data-color-scheme="light">
        <div class="global-header">
          <div class="global-sub">
            <div class="logo">
              <slot name="post-logo"></slot>
            </div>
          </div>
          <div class="global-sub">
            {this.device === 'desktop' && <slot name="target-group"></slot>}
          </div>
          <div class="global-sub">
            {!this.hasMobileMenu && <slot name="meta-navigation"></slot>}
            <slot name="global-controls"></slot>
            {!this.hasMobileMenu && <slot name="post-language-switch"></slot>}
            <slot name="global-login"></slot>
            {this.hasNavigation && (
              <div onClick={() => this.toggleMobileMenu()} class="mobile-toggle">
                <slot name="post-togglebutton"></slot>
              </div>
            )}
          </div>
        </div>
        <div class={localHeaderClasses.join(' ')}>
          <slot name="title" onSlotchange={() => this.checkTitleExistence()}></slot>
          {this.hasTitle && (
            <div class="local-sub">
              <slot name="local-controls"></slot>
              <slot></slot>
            </div>
          )}
          {this.device === 'desktop' && this.renderNavigation()}
        </div>
        {this.device !== 'desktop' && this.renderNavigation()}
      </Host>
    );
  }
}

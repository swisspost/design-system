import { Component, h, Host, State, Element, Method, Watch, Listen, Prop } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { SwitchVariant } from '@/components';
import { breakpoint, Device } from '@/utils/breakpoints';
import { slideDown, slideUp } from '@/animations/slide';
import { getFocusableChildren } from '@/utils/get-focusable-children';
import { EventFrom } from '@/utils/event-from';
import { checkRequiredAndType } from '@/utils';

/**
 * @slot post-logo - Should be used together with the `<post-logo>` component.
 * @slot global-nav-primary - Holds search button in the global header.
 * @slot global-nav-secondary - Holds an `<ul>` with meta navigation links.
 * @slot post-togglebutton - Holds the burger menu toggler.
 * @slot language-menu - Should be used with the `<post-language-switch>` component.
 * @slot title - Holds the application title.
 * @slot main-nav - Has a default slot because it's only meant to be used in the `<post-header>`.
 * @slot audience - Holds the list of buttons to choose the target group.
 * @slot post-login - Holds the user menu or login button in the global header.
 * @slot local-nav - Holds controls specific to the current application.
 */

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;
  private burgerMenuButton: HTMLPostTogglebuttonElement | null;
  private burgerMenu: HTMLElement;
  private burgerMenuAnimation: Animation;
  private readonly throttledResize = throttle(50, () => this.updateLocalHeaderHeight());
  private scrollParentResizeObserver: ResizeObserver;
  private localHeaderResizeObserver: ResizeObserver;
  private slottedContentObserver: MutationObserver;

  private get hasBurgerMenu(): boolean {
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
  @State() hasLocalNav: boolean = false;
  @State() hasTargetGroup: boolean = false;
  @State() hasTitle: boolean = false;
  @State() burgerMenuExtended: boolean = false;
  @State() megadropdownOpen: boolean = false;

  /**
   * The label of the burger menu button.
   */
  @Prop({ reflect: true }) labelBurgerMenu!: string;

  @Watch('labelBurgerMenu')
  validateLabelBurgerMenu() {
    checkRequiredAndType(this, 'labelBurgerMenu', 'string');
  }

  @Watch('device')
  @Watch('burgerMenuExtended')
  lockBody(newValue: boolean | string, _oldValue: boolean | string, propName: string) {
    const scrollParent = this.scrollParent;
    const burgerMenuExtended =
      propName === 'burgerMenuExtended' ? newValue : this.burgerMenuExtended;

    if (this.device !== 'desktop' && burgerMenuExtended) {
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
    this.megadropdownStateHandler = this.megadropdownStateHandler.bind(this);
    this.checkSlottedContent = this.checkSlottedContent.bind(this);
    this.megadropdownStateHandler = this.megadropdownStateHandler.bind(this);
  }

  private readonly breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
    this.switchLanguageSwitchMode();

    if (this.device === 'desktop' && this.burgerMenuExtended) {
      this.closeBurgerMenu();
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
    window.addEventListener('postBreakpoint:device', this.breakpointChange);

    this.handleScrollParentResize();
    this.lockBody(false, this.burgerMenuExtended, 'burgerMenuExtended');
  }

  componentWillRender() {
    this.handleScrollEvent();
    this.handleSlottedContentChanges();
    this.switchLanguageSwitchMode();
  }

  componentDidRender() {
    this.validateLabelBurgerMenu();
    this.getFocusableElements();
    this.handleLocalHeaderResize();
  }

  componentDidLoad() {
    this.updateLocalHeaderHeight();
    this.host.shadowRoot.addEventListener('click', this.handleLinkClick);
  }

  // Clean up possible side effects when post-header is disconnected
  disconnectedCallback() {
    const scrollParent = this.scrollParent;

    window.removeEventListener('postBreakpoint:device', this.breakpointChange);
    window.removeEventListener('resize', this.throttledResize);
    window.removeEventListener('scroll', this.handleScrollEvent);
    if (scrollParent) scrollParent.removeEventListener('scroll', this.handleScrollEvent);
    document.removeEventListener('postToggleMegadropdown', this.megadropdownStateHandler);
    this.host.removeEventListener('keydown', this.keyboardHandler);
    if (this.host.shadowRoot) {
      this.host.shadowRoot.removeEventListener('click', this.handleLinkClick);
    }

    if (this.scrollParentResizeObserver) {
      this.scrollParentResizeObserver.disconnect();
      this.scrollParentResizeObserver = null;
    }
    if (this.localHeaderResizeObserver) {
      this.localHeaderResizeObserver.disconnect();
      this.localHeaderResizeObserver = null;
    }
    if (this.slottedContentObserver) {
      this.slottedContentObserver.disconnect();
      this.slottedContentObserver = null;
    }

    this.burgerMenuExtended = false;
  }

  private async closeBurgerMenu() {
    this.burgerMenuAnimation?.finish();

    if (this.burgerMenuButton) this.burgerMenuButton.toggled = false;

    this.burgerMenuExtended = false;
  }

  /**
   * Toggles the burger navigation menu.
   */
  @Method()
  async toggleBurgerMenu(force?: boolean) {
    if (this.device === 'desktop') return;
    this.burgerMenuAnimation = this.burgerMenuExtended
      ? slideUp(this.burgerMenu)
      : slideDown(this.burgerMenu);

    // Update the state of the toggle button
    if (this.burgerMenuButton) this.burgerMenuButton.toggled = force ?? !this.burgerMenuExtended;

    if (this.burgerMenuExtended) {
      // Wait for the close animation to finish before hiding megadropdowns
      await this.burgerMenuAnimation.finished;
      this.burgerMenuExtended = force ?? !this.burgerMenuExtended;

      if (this.burgerMenuExtended === false) {
        this.closeAllMegadropdowns();
        this.burgerMenu.scrollTop = 0;
      }
    } else {
      this.burgerMenuExtended = force ?? !this.burgerMenuExtended;
      // If opening, close any open megadropdowns immediately
      if (this.megadropdownOpen) {
        this.closeAllMegadropdowns();
      }
    }
  }

  @EventFrom('post-megadropdown')
  private megadropdownStateHandler(event: CustomEvent) {
    this.megadropdownOpen = event.detail.isVisible;
  }

  // Get all the focusable elements in the post-header burger menu
  private getFocusableElements() {
    // Get elements in the correct order (different as the DOM order)
    const focusableEls = [
      ...Array.from(
        this.host.querySelectorAll('.list-inline:not([slot="global-nav-secondary"]) > li'),
      ),
      ...Array.from(
        this.host.querySelectorAll(
          'nav > post-list > div > post-list-item, post-megadropdown-trigger',
        ),
      ),
      ...Array.from(
        this.host.querySelectorAll(
          '.list-inline[slot="global-nav-secondary"] > li, post-language-menu-item',
        ),
      ),
    ];

    // Add the main toggle menu button to the list of focusable children
    const focusableChildren = [
      this.burgerMenuButton,
      ...focusableEls.flatMap(el => Array.from(getFocusableChildren(el))),
    ];

    this.firstFocusableEl = focusableChildren[0];
    this.lastFocusableEl = focusableChildren[focusableChildren.length - 1];
  }

  private keyboardHandler(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.burgerMenuExtended) {
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
    document.documentElement.style.setProperty(
      '--post-header-scroll-top',
      `${Math.max(scrollTop, 0)}px`,
    );
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

    if (this.burgerMenuExtended && (isLinkInMainNav || isLinkInMegadropdown)) {
      this.toggleBurgerMenu(false);
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

  private handleSlottedContentChanges() {
    if (!this.slottedContentObserver) {
      this.checkSlottedContent();

      this.slottedContentObserver = new MutationObserver(this.checkSlottedContent);
      this.slottedContentObserver.observe(this.host, { childList: true });
    }
  }

  private checkSlottedContent() {
    this.hasNavigation = !!this.host.querySelector('[slot="main-nav"]');
    this.hasLocalNav = !!this.host.querySelector('[slot="local-nav"]');
    this.hasTargetGroup = !!this.host.querySelector('[slot="audience"]');
    this.hasTitle = !!this.host.querySelector('[slot="title"]');
  }

  private switchLanguageSwitchMode() {
    const variant: SwitchVariant = this.hasBurgerMenu ? 'list' : 'menu';
    Array.from(this.host.querySelectorAll('post-language-menu')).forEach(languageSwitch => {
      languageSwitch?.setAttribute('variant', variant);
    });
  }

  @Listen('focusin')
  @Listen('focusout')
  onFocusChange() {
    const fixedElements =
      this.device === 'desktop' ? '.logo, .navigation' : '.global-header, .burger-menu';
    const isHeaderExpanded =
      this.host.matches(':focus-within') &&
      !this.host.shadowRoot.querySelector(`:where(${fixedElements}):focus-within`);

    if (isHeaderExpanded) {
      this.host.setAttribute('data-expanded', '');
    } else {
      this.host.removeAttribute('data-expanded');
    }
  }

  private renderNavigation() {
    const localNav = !this.hasTitle && (
      <div class="local-nav">
        <slot name="local-nav"></slot>
      </div>
    );

    if (this.device === 'desktop') {
      return (
        <div class={{ 'navigation': true, 'megadropdown-open': this.megadropdownOpen }}>
          <slot name="main-nav"></slot>
          {localNav}
        </div>
      );
    }

    return (
      <div
        class={{
          'burger-menu': true,
          'extended': this.burgerMenuExtended,
          'no-local-nav': !this.hasLocalNav,
          'megadropdown-open': this.megadropdownOpen,
        }}
        style={{ '--post-header-navigation-current-inset': `${this.burgerMenu?.scrollTop ?? 0}px` }}
        ref={el => (this.burgerMenu = el)}
      >
        {localNav}
        <div class="burger-menu-body">
          <slot name="audience"></slot>
          <slot name="main-nav"></slot>
        </div>
        <div class="burger-menu-footer">
          <slot name="global-nav-secondary"></slot>
          <slot name="language-menu"></slot>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host data-version={version} data-color-scheme="light" data-burger-menu={this.hasBurgerMenu}>
        <header>
          <div
            class={{
              'global-header': true,
              'no-target-group': !this.hasTargetGroup,
            }}
          >
            <div class="logo">
              <slot name="post-logo"></slot>
            </div>
            <div class="sliding-controls">
              {this.device === 'desktop' && (
                <div class="target-group">
                  <slot name="audience"></slot>
                </div>
              )}
              <slot name="global-nav-primary"></slot>
              {!this.hasBurgerMenu && [
                <slot name="global-nav-secondary"></slot>,
                <slot name="language-menu"></slot>,
              ]}
              <slot name="post-login"></slot>
              {this.hasNavigation && this.device !== 'desktop' && (
                <div onClick={() => this.toggleBurgerMenu()} class="burger-menu-toggle">
                  <slot name="post-togglebutton"></slot>
                </div>
              )}
              {this.hasNavigation && this.device !== 'desktop' && (
                <post-togglebutton
                  ref={el => (this.burgerMenuButton = el)}
                  onClick={() => this.toggleBurgerMenu()}
                >
                  <span>{this.labelBurgerMenu}</span>
                  <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
                  <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
                </post-togglebutton>
              )}
            </div>
          </div>
          <div
            class={{
              'local-header': true,
              'no-title': !this.hasTitle,
              'no-target-group': !this.hasTargetGroup,
              'no-navigation': this.device !== 'desktop' || !this.hasNavigation,
              'no-local-nav': !this.hasLocalNav,
            }}
          >
            <slot name="title"></slot>
            {this.hasTitle && <slot name="local-nav"></slot>}
            {this.device === 'desktop' && this.renderNavigation()}
          </div>
          {this.device !== 'desktop' && this.renderNavigation()}
        </header>
      </Host>
    );
  }
}

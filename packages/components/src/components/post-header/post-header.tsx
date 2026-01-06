import { Component, h, Host, State, Element, Method, Watch, Listen, Prop } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { SwitchVariant } from '@/components';
import { breakpoint, Device } from '@/utils/breakpoints';
import { fade } from '@/animations';
import { getDeepFocusableChildren } from '@/utils/get-focusable-children';
import { EventFrom } from '@/utils/event-from';
import { AnimationOptions } from '@/animations/types';
import { checkRequiredAndType } from '@/utils';

/**
 * @slot post-logo - Should be used together with the `<post-logo>` component.
 * @slot global-nav-primary - Holds search button in the global header.
 * @slot global-nav-secondary - Holds an `<ul>` with meta navigation links.
 * @slot language-menu - Should be used with the `<post-language-switch>` component.
 * @slot title - Holds the application title.
 * @slot main-nav - Has a default slot because it's only meant to be used in the `<post-header>`.
 * @slot audience - Holds the list of buttons to choose the audience.
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
  private localHeader: HTMLElement;

  private get hasBurgerMenu(): boolean {
    return this.device !== 'desktop' && this.hasNavigation;
  }

  private animationOptions: Partial<AnimationOptions> = {
    duration: 350,
    easing: 'headerEase',
  };

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
  @State() hasAudience: boolean = false;
  @State() hasTitle: boolean = false;
  @State() burgerMenuExtended: boolean = false;
  @State() megadropdownOpen: boolean = false;

  /**
   * The label of the burger menu button.
   */
  @Prop({ reflect: true }) textMenu!: string;

  @Watch('textMenu')
  validateTextMenu() {
    checkRequiredAndType(this, 'textMenu', 'string');
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
    this.validateTextMenu();
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
      ? fade(this.burgerMenu, 'out', this.animationOptions)
      : fade(this.burgerMenu, 'in', this.animationOptions);

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
    if (!this.burgerMenu) return;

    const focusableElements: HTMLElement[] = [this.burgerMenuButton];

    focusableElements.push(
      ...getDeepFocusableChildren(this.localHeader, el => !el.matches('post-megadropdown')),
      ...getDeepFocusableChildren(this.burgerMenu, el => !el.matches('post-megadropdown')),
    );

    this.firstFocusableEl = focusableElements[0];
    this.lastFocusableEl = focusableElements[focusableElements.length - 1];
  }

  private keyboardHandler(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !this.burgerMenuExtended) return;

    const activeElement = this.host.shadowRoot.activeElement || document.activeElement;

    if (e.shiftKey && activeElement === this.firstFocusableEl) {
      // If back tab (Tab + Shift) and first element is focused, focus goes to the last element of the megadropdown
      e.preventDefault();
      this.lastFocusableEl.focus();
    } else if (!e.shiftKey && activeElement === this.lastFocusableEl) {
      // If Tab and last element is focused, focus goes back to the first element of the megadropdown
      e.preventDefault();
      this.firstFocusableEl.focus();
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
    this.hasAudience = !!this.host.querySelector('[slot="audience"]');
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
  onFocusChange(e: FocusEvent) {
    const alwaysVisibleElements =
      this.device === 'desktop'
        ? '.navigation' // logo isn’t included since it would be too small to focus on effectively.
        : '.global-header, .burger-menu';
    const isHeaderExpanded =
      // ensure the expanded state stays accurate during focus changes,
      // e.g., when the focused element is removed from the DOM
      // during a window resize
      e.target === document.activeElement &&
      this.host.matches(':focus-within') &&
      !this.host.shadowRoot.querySelector(`:where(${alwaysVisibleElements}):focus-within`);

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
      <Host
        data-version={version}
        data-color-scheme="light"
        data-burger-menu={this.hasBurgerMenu}
        data-menu-extended={this.burgerMenuExtended}
      >
        <header>
          <div
            class={{
              'global-header': true,
              'no-audience': !this.hasAudience,
            }}
          >
            <div class="section">
              <div class="logo">
                <slot name="post-logo"></slot>
              </div>
              <div class="sliding-controls">
                {this.device === 'desktop' && (
                  <div class="audience">
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
                    <span>{this.textMenu}</span>
                    <post-icon
                      aria-hidden="true"
                      name="burger"
                      data-showwhen="untoggled"
                    ></post-icon>
                    <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
                  </post-togglebutton>
                )}
              </div>
            </div>
          </div>
          <div
            ref={el => (this.localHeader = el)}
            class={{
              'local-header': true,
              'no-title': !this.hasTitle,
              'no-audience': !this.hasAudience,
              'no-navigation': this.device !== 'desktop' || !this.hasNavigation,
              'no-local-nav': !this.hasLocalNav,
            }}
          >
            <div class="section">
              <slot name="title"></slot>
              {this.hasTitle && <slot name="local-nav"></slot>}
              {this.device === 'desktop' && this.renderNavigation()}
            </div>
          </div>
          {this.device !== 'desktop' && this.renderNavigation()}
        </header>
      </Host>
    );
  }
}

import {
  Component,
  h,
  Host,
  State,
  Element,
  Method,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { SwitchVariant } from '@/components';
import { slideDown, slideUp } from '@/animations/slide';
import { getFocusableChildren } from '@/utils/get-focusable-children';

export type DEVICE_SIZE = 'mobile' | 'tablet' | 'desktop' | null;

/**
 * @slot post-logo - Should be used together with the `<post-logo>` component.
 * @slot meta-navigation - Holds an `<ul>` with meta navigation links.
 * @slot post-togglebutton - Holds the mobile menu toggler.
 * @slot post-language-switch - Should be used with the `<post-language-switch>` component.
 * @slot title - Holds the application title.
 * @slot default - Custom controls or content, right aligned in the local header.
 * @slot post-mainnavigation - Has a default slot because it's only meant to be used in the `<post-header>`.
 */

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;
  private scrollParent = null;
  private mobileMenu: HTMLElement;
  private mobileMenuAnimation: Animation;
  private throttledScroll = () => this.handleScrollEvent();
  private throttledResize = throttle(50, () => this.handleResize());

  componentWillRender() {
    this.scrollParent = this.getScrollParent(this.host);
    this.scrollParent.addEventListener('scroll', this.throttledScroll, { passive: true });
    window.addEventListener('resize', this.throttledResize, { passive: true });
    this.handleResize();
    this.handleScrollEvent();
    this.getFocusableElements();
  }

  componentDidLoad() {
    this.updateLocalHeaderHeight();
  }

  @Element() host: HTMLPostHeaderElement;

  @State() device: DEVICE_SIZE = null;
  @State() mobileMenuExtended: boolean = false;

  @Watch('mobileMenuExtended')
  frozeBody(isMobileMenuExtended: boolean) {
    document.body.style.overflow = isMobileMenuExtended ? 'hidden' : '';

    if (isMobileMenuExtended) {
      this.host.addEventListener('keydown', e => {
        this.keyboardHandler(e);
      });
    } else {
      this.host.removeEventListener('keydown', e => {
        this.keyboardHandler(e);
      });
    }
  }

  /**
   * An event emitted when the device has changed
   */
  @Event() postUpdateDevice: EventEmitter<DEVICE_SIZE>;

  /**
   * Toggles the mobile navigation.
   */
  @Method()
  async toggleMobileMenu() {
    if (this.device === 'desktop') return;

    this.mobileMenuAnimation = this.mobileMenuExtended
      ? slideUp(this.mobileMenu)
      : slideDown(this.mobileMenu);

    // Update the state of the toggle button
    const menuButton = this.host.querySelector<HTMLPostTogglebuttonElement>('post-togglebutton');
    menuButton.toggled = !this.mobileMenuExtended;

    // Toggle menu visibility before it slides down and after it slides back up
    if (this.mobileMenuExtended) await this.mobileMenuAnimation.finished;
    this.mobileMenuExtended = !this.mobileMenuExtended;
    if (!this.mobileMenuExtended) await this.mobileMenuAnimation.finished;
  }

  // Get all the focusable elements in the post-header mobile menu
  private getFocusableElements() {
    // Get elements in the correct order (different as the DOM order)
    const focusableEls = [
      ...Array.from(this.host.querySelectorAll('.list-inline:not([slot="meta-navigation"]) > li')),
      ...Array.from(
        this.host.querySelectorAll(
          'nav > post-list > div > post-list-item, post-mainnavigation > .back-button, post-megadropdown-trigger',
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

  private handleScrollEvent() {
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    const st = Math.max(
      0,
      this.scrollParent instanceof Document
        ? this.scrollParent.documentElement.scrollTop
        : this.scrollParent.scrollTop,
    );

    this.host.style.setProperty('--header-scroll-top', `${st}px`);
  }

  private getScrollParent(node: Element): Element | Document {
    let currentParent = node.parentElement;
    while (currentParent) {
      if (currentParent.nodeName === 'BODY') {
        return document;
      }
      if (this.isScrollable(currentParent)) {
        return currentParent;
      }
      currentParent = currentParent.parentElement;
    }
    return document;
  }

  private isScrollable(node: Element) {
    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
      return false;
    }
    const style = getComputedStyle(node);
    return ['overflow', 'overflow-x', 'overflow-y'].some(propertyName => {
      const value = style.getPropertyValue(propertyName);
      return value === 'auto' || value === 'scroll';
    });
  }

  private updateLocalHeaderHeight() {
    requestAnimationFrame(() => {
      const mhh = this.host.shadowRoot.querySelector('.local-header')?.clientHeight || 0;
      this.host.style.setProperty('--main-header-height', `${mhh}px`);
    });
  }

  private handleResize() {
    const previousDevice = this.device;
    let newDevice: DEVICE_SIZE;
    const width = window?.innerWidth;

    if (width >= 1024) {
      newDevice = 'desktop';
    } else if (width >= 600) {
      newDevice = 'tablet';
    } else {
      newDevice = 'mobile';
    }

    // Close any open mobile menu
    if (newDevice === 'desktop' && this.mobileMenuExtended) {
      this.toggleMobileMenu();
      this.mobileMenuAnimation.finish(); // no animation
    }

    this.updateLocalHeaderHeight();

    // Apply only on change for doing work only when necessary
    if (newDevice !== previousDevice) {
      this.device = newDevice;

      this.postUpdateDevice.emit(this.device);
      window.requestAnimationFrame(() => {
        this.switchLanguageSwitchMode();
      });
    }
  }

  private switchLanguageSwitchMode() {
    const variant: SwitchVariant = this.device === 'desktop' ? 'menu' : 'list';
    this.host.querySelector('post-language-switch')?.setAttribute('variant', variant);
  }

  private renderNavigation() {
    const navigationClasses = ['navigation'];
    if (this.mobileMenuExtended) {
      navigationClasses.push('extended');
    }

    return (
      <div ref={el => (this.mobileMenu = el)} class={navigationClasses.join(' ')}>
        <slot name="post-mainnavigation"></slot>

        {(this.device === 'mobile' || this.device === 'tablet') && (
          <div class="navigation-footer">
            <slot name="meta-navigation"></slot>
            <slot name="post-language-switch"></slot>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <Host version={version}>
        <div class="global-header">
          <div class="global-sub">
            <div class="logo">
              <slot name="post-logo"></slot>
            </div>
          </div>
          <div class="global-sub">
            {this.device === 'desktop' && <slot name="meta-navigation"></slot>}
            <slot name="global-controls"></slot>
            {this.device === 'desktop' && <slot name="post-language-switch"></slot>}
            <div onClick={() => this.toggleMobileMenu()} class="mobile-toggle">
              <slot name="post-togglebutton"></slot>
            </div>
          </div>
        </div>
        <div
          class={'local-header ' + (this.mobileMenuExtended ? 'local-header-mobile-extended' : '')}
        >
          <slot name="title"></slot>
          <div class="local-sub">
            <slot name="local-controls"></slot>
            <slot></slot>
          </div>
          {this.device === 'desktop' && this.renderNavigation()}
        </div>
        {this.device !== 'desktop' && this.renderNavigation()}
      </Host>
    );
  }
}

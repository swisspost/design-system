import { Component, h, Host, State, Element, Method, Watch } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { SwitchVariant } from '@/components';
import { slideDown, slideUp } from '@/animations/slide';

type DEVICE_SIZE = 'mobile' | 'tablet' | 'desktop' | null;

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
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
  }

  @Element() host: HTMLPostHeaderElement;

  @State() device: DEVICE_SIZE = null;
  @State() mobileMenuExtended: boolean = false;

  @Watch('mobileMenuExtended')
  frozeBody(isMobileMenuExtended: boolean) {
    document.body.style.overflow = isMobileMenuExtended ? 'hidden' : '';
  }

  /**
   * Toggles the mobile navigation.
   */
  @Method()
  async toggleMobileMenu() {
    if (this.device === 'desktop') return;

    this.mobileMenuAnimation = this.mobileMenuExtended
      ? slideUp(this.mobileMenu)
      : slideDown(this.mobileMenu);

    // Toggle menu visibility before it slides down and after it slides back up
    if (this.mobileMenuExtended) await this.mobileMenuAnimation.finished;
    this.mobileMenuExtended = !this.mobileMenuExtended;
    if (!this.mobileMenuExtended) await this.mobileMenuAnimation.finished;
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


      const menuToggler = this.host.querySelector<HTMLPostTogglebuttonElement>('post-togglebutton');
      if (menuToggler) menuToggler.toggled = false;
    }

    // Apply only on change for doing work only when necessary
    if (newDevice !== previousDevice) {
      this.device = newDevice;
      window.requestAnimationFrame(() => {
        this.switchLanguageSwitchMode();
      });
    }
  }

  private switchLanguageSwitchMode() {
    const variant: SwitchVariant = this.device === 'desktop' ? 'dropdown' : 'list';
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
        <div class="local-header">
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

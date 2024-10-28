import { Component, h, Host, State, Element } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
  @Element() host: HTMLPostHeaderElement;
  @State() device: 'mobile' | 'tablet' | 'desktop' = null;
  @State() mobileMenuExtended: boolean = false;

  private scrollParent = null;
  private throttledScroll = () => this.handleScrollEvent();
  private debouncedResize = throttle(50, () => this.handleResize());

  componentWillRender() {
    this.scrollParent = this.getScrollParent(this.host);
    this.scrollParent.addEventListener('scroll', this.throttledScroll, { passive: true });
    window.addEventListener('resize', this.debouncedResize, { passive: true });
    this.handleResize();
    this.handleScrollEvent();
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
    const width = window?.innerWidth;
    if (width >= 1024) {
      this.device = 'desktop';
    } else if (width >= 600) {
      this.device = 'tablet';
    } else {
      this.device = 'mobile';
    }
  }

  private handleMobileMenuToggle() {
    this.mobileMenuExtended = !this.mobileMenuExtended;
  }

  render() {
    const mainNavClasses = ['main-navigation'];
    if (this.mobileMenuExtended) {
      mainNavClasses.push('extended');
    }

    return (
      <Host version={version}>
        <div class="global-header">
          <div class="global-sub">
            <div class="logo">
              <slot name="post-logo"></slot>
            </div>
            {this.device === 'desktop' && <slot name="audience-navigation"></slot>}
          </div>
          <div class="global-sub">
            {this.device === 'desktop' && <slot name="meta-navigation"></slot>}
            <slot name="global-controls"></slot>
            {this.device === 'desktop' && <slot name="post-language-switch"></slot>}
            <div onClick={() => this.handleMobileMenuToggle()} class="mobile-toggle">
              <slot name="post-togglebutton"></slot>
            </div>
          </div>
        </div>

        <div class="title-header d-flex space-between align-center">
          <slot name="title"></slot>
          <div class="global-sub">
            <slot name="local-controls"></slot>
            <slot></slot>
          </div>
        </div>

        <div class={mainNavClasses.join(' ')}>
          {(this.device === 'mobile' || this.device === 'tablet') && (
            <slot name="audience-navigation"></slot>
          )}
          <slot name="post-mainnavigation"></slot>
          {(this.device === 'mobile' || this.device === 'tablet') && (
            <slot name="meta-navigation"></slot>
          )}
          {(this.device === 'mobile' || this.device === 'tablet') && (
            <slot name="post-language-switch"></slot>
          )}
        </div>
      </Host>
    );
  }
}

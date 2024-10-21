import { Component, h, Host, State, Element } from '@stencil/core';
import { debounce } from 'throttle-debounce';

@Component({
  tag: 'post-header',
  shadow: true,
  styleUrl: './post-header.scss',
})
export class PostHeader {
  @Element() host: HTMLPostHeaderElement;
  @State() device: 'mobile' | 'tablet' | 'desktop' = null;

  private scrollParent = null;
  private throttledScroll = () => this.handleScrollEvent();
  private debouncedResize = debounce(200, () => this.handleResize());

  componentWillRender() {
    this.scrollParent = this.getScrollParent(this.host);
    this.scrollParent.addEventListener('scroll', this.throttledScroll, { passive: true });
    this.scrollParent.addEventListener('resize', this.debouncedResize, { passive: true });
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

  render() {
    const globalHeaderClassList = ['bg-yellow', 'global-header', 'd-flex', 'space-between'];

    return (
      <Host>
        <div class={globalHeaderClassList.join(' ')}>
          <div class="global-sub left-part">
            <slot name="post-logo"></slot>
            {this.device === 'desktop' && <slot name="audience-navigation"></slot>}
          </div>
          <div class="global-sub">
            {this.device === 'desktop' && <slot name="meta-navigation"></slot>}
            <slot name="global-controls"></slot>
            {this.device === 'desktop' && <slot name="post-language-switch"></slot>}
            {(this.device === 'mobile' || this.device === 'tablet') && (
              <slot name="post-togglebutton"></slot>
            )}
          </div>
        </div>

        <div class="title-header d-flex space-between">
          <slot name="title"></slot>
          <div class="global-sub">
            <slot name="local-controls"></slot>
            <slot></slot>
          </div>
        </div>

        <div class="main-navigation">
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

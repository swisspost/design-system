import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-breadcrumb',
  styleUrl: 'post-breadcrumb.scss',
  shadow: true,
})
export class PostBreadcrumb {
  @Prop() homeUrl: string;
  @Prop() homeText: string = 'Home';

  @Element() host: HTMLElement;

  @State() breadcrumbItems: { url: string, text: string }[] = [];
  @State() isConcatenated: boolean;
  @State() lastWindowWidth: number;

  private breadcrumbNavRef?: HTMLElement;
  private lastItem: { url: string, text: string };
  private mutationObserver: MutationObserver;

  private waitForBreadcrumbRef() {
    const interval = setInterval(() => {
      if (this.breadcrumbNavRef && this.breadcrumbNavRef.clientWidth > 0) {
        clearInterval(interval);
        this.checkConcatenation();
      }
    }, 50);
  }

  componentDidLoad() {
    this.updateBreadcrumbItems();
    window.addEventListener('resize', this.handleResize);
    this.waitForBreadcrumbRef();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private handleBreadcrumbItemClick() {
    const postMenuTriggerWrapper = this.host.shadowRoot.querySelector('.menu-trigger-wrapper');
    const menuTrigger = postMenuTriggerWrapper.querySelector('button');
    if (menuTrigger) {
      menuTrigger.click();
    }
  }  

  private updateBreadcrumbItems() {
    const items = Array.from(this.host.querySelectorAll('post-breadcrumb-item')).map((item) => ({
      text: item.textContent || '',
      url: item.getAttribute('url') || '',
    }));
    this.breadcrumbItems = items;
    this.lastItem = this.breadcrumbItems[this.breadcrumbItems.length - 1];
  }

  private handleResize = () => {
    if (window.innerWidth === this.lastWindowWidth) return;

    this.lastWindowWidth = window.innerWidth;
    this.checkConcatenation();
  };

  private getParentWidth(): number {
    let parent = this.host.parentNode;

    while (parent && !(parent instanceof HTMLElement)) {
      parent = parent.parentNode;
    }

    return parent instanceof HTMLElement ? parent.clientWidth : window.innerWidth;
  }

  private checkConcatenation() {
    if (this.breadcrumbNavRef.clientWidth !== 0) {
      const visibleWidth = this.getParentWidth();
      const totalWidth = this.breadcrumbItems.reduce((accum, item) => {
        const itemWidth = item.text.length * 12;
        return accum + itemWidth;
      }, 0);

      const homeElement = this.host.shadowRoot?.querySelector('.home-icon');
      const homeItemWidth = homeElement ? homeElement.getBoundingClientRect().width : 0;

      this.isConcatenated = totalWidth + homeItemWidth > visibleWidth;
    }
  }

  render() {
    const visibleItems = this.breadcrumbItems.slice(0, -1);

    return (
      <Host data-version={version}>
        <nav aria-label="Breadcrumb" class="breadcrumbs-nav" ref={(el) => (this.breadcrumbNavRef = el)}>
          <ol class="no-list breadcrumbs-list">
            {/* Home Breadcrumb */}
            <li>
              <a href={this.homeUrl} class="breadcrumb-link">
                <span class="visually-hidden">{this.homeText}</span>
                <post-icon name="2035" class="home-icon" />
              </a>
            </li>

            {/* Check if items should be concatenated */}
            {this.isConcatenated ? (
             <post-breadcrumb-item
             class="menu-trigger-wrapper"
             tabindex={0}
             onClick={() => this.handleBreadcrumbItemClick()}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 this.handleBreadcrumbItemClick();
               }
             }}
           >
              <post-menu-trigger for="breadcrumb-menu">
                <button class="btn test" tabIndex={-1}>...</button>
              </post-menu-trigger>
              <post-menu id="breadcrumb-menu">
                {visibleItems.map((item, index) => (
                  <post-menu-item key={index} class="breadcrumb-item"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      const linkElement = (e.currentTarget as HTMLElement).querySelector('a');
                      if (linkElement) {
                        e.preventDefault();
                        (linkElement as HTMLElement).click();
                      }
                    }
                  }}>
                    <post-icon name="2111" class="breadcrumb-item-icon" />
                    {item.url ? (
                      <a href={item.url}>{item.text}</a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </post-menu-item>
                ))}
              </post-menu>
            </post-breadcrumb-item>
            ) : (
              visibleItems.map((item, index) => (
                <post-breadcrumb-item url={item.url} key={index}>
                  {item.text}
                </post-breadcrumb-item>
              ))
            )}

            {/* Always show the last breadcrumb item */}
            {this.lastItem && (
              <post-breadcrumb-item url={this.lastItem.url}>
                {this.lastItem.text}
              </post-breadcrumb-item>
            )}
          </ol>
        </nav>
      </Host>
    );
  }
}

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

  @Element() host: HTMLPostBreadcrumbElement;

  @State() breadcrumbItems: { url: string; text: string }[] = [];
  @State() isConcatenated: boolean;
  @State() lastWindowWidth: number;

  private breadcrumbNavRef?: HTMLElement;
  private lastItem: { url: string; text: string };

  componentWillLoad() {
    this.updateBreadcrumbItems();
  }

  componentDidLoad() {
    window.addEventListener('resize', this.handleResize);
    this.waitForBreadcrumbRef();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Waits for breadcrumb navigation reference to be available
  private waitForBreadcrumbRef() {
    const interval = setInterval(() => {
      if (this.breadcrumbNavRef?.clientWidth > 0) {
        clearInterval(interval);
        this.checkConcatenation();
      }
    }, 50);
  }

  // Updates breadcrumb items and sets the last item
  private updateBreadcrumbItems() {
    this.breadcrumbItems = Array.from(
      this.host.querySelectorAll('post-breadcrumb-item')
    ).map((item) => ({
      text: item.textContent || '',
      url: item.getAttribute('url') || '',
    }));
    this.lastItem = this.breadcrumbItems[this.breadcrumbItems.length - 1];
  }

  // Handles resizing to check concatenation
  private handleResize = () => {
    if (window.innerWidth === this.lastWindowWidth) return;
    this.lastWindowWidth = window.innerWidth;
    this.checkConcatenation();
  };

  // Determines parent width for concatenation logic
  private getParentWidth(): number {
    let parent = this.host.parentNode;
    while (parent && !(parent instanceof HTMLElement)) {
      parent = parent.parentNode;
    }
    return parent instanceof HTMLElement ? parent.clientWidth : window.innerWidth;
  }

  // Checks if breadcrumb items should be concatenated
  private checkConcatenation() {
    if (this.breadcrumbNavRef?.clientWidth) {
      const visibleWidth = this.getParentWidth();
      const totalWidth = this.breadcrumbItems.reduce((accum, item) => accum + item.text.length * 12, 0);

      const homeElement = this.host.shadowRoot?.querySelector('.home-icon');
      const homeItemWidth = homeElement?.getBoundingClientRect().width || 0;

      this.isConcatenated = totalWidth + homeItemWidth > visibleWidth;
    }
  }

  // Handles breadcrumb item click to open the menu
  private handleBreadcrumbItemClick() {
    const menuTrigger = this.host.shadowRoot
      ?.querySelector('.menu-trigger-wrapper')
      ?.querySelector('button');
    menuTrigger?.click();
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
  
            {/* Conditionally render concatenated menu or individual breadcrumb items */}
            {this.isConcatenated ? (
              <post-breadcrumb-item
                class="menu-trigger-wrapper"
                tabindex={0}
                onClick={this.handleBreadcrumbItemClick}
                aria-label="More breadcrumbs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleBreadcrumbItemClick();
                  }
                }}
              >
                <post-menu-trigger for="breadcrumb-menu">
                  <button class="btn test" tabIndex={-1}>
                    ...
                  </button>
                </post-menu-trigger>
                <post-menu id="breadcrumb-menu">
                  {visibleItems.map((item, index) => (
                    <post-menu-item
                      key={index}
                      class="breadcrumb-item"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          const linkElement = (e.currentTarget as HTMLElement).querySelector('a');
                          linkElement?.click();
                          e.preventDefault();
                        }
                      }}
                    >
                      <post-icon name="2111" class="breadcrumb-item-icon" />
                      {item.url ? <a href={item.url}>{item.text}</a> : <span>{item.text}</span>}
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
  
            {/* Last Breadcrumb Item */}
            {this.lastItem && (
              <post-breadcrumb-item 
                url={this.lastItem.url}
                aria-current="page"
                tabindex={-1}
              >
                {this.lastItem.text}
              </post-breadcrumb-item>
            )}
          </ol>
        </nav>
      </Host>
    );
  }
}
  
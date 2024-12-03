import { Component, Element, h, Host, Prop, State } from '@stencil/core';

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
  @State() isConcatenated: boolean = false;
  @State() lastWindowWidth: number = 0;
  @State() isDropdownVisible: boolean = false;  // New state for dropdown visibility

  private breadcrumbNavRef?: HTMLElement;
  private lastItem: { url: string, text: string };

  componentDidLoad() {
    this.updateBreadcrumbItems();
    window.addEventListener('resize', this.handleResize);
    this.checkConcatenation();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
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

  private checkConcatenation() {
    if (this.breadcrumbNavRef) {
      const visibleWidth = this.breadcrumbNavRef.clientWidth;
      const totalWidth = this.breadcrumbItems.reduce((accum, item) => {
        const itemWidth = item.text.length * 12; // Approximate width of each breadcrumb item
        return accum + itemWidth;
      }, 0);

      this.isConcatenated = totalWidth > visibleWidth;
    }
  }

  private toggleDropdown = () => {
    this.isDropdownVisible = !this.isDropdownVisible;
  };

  render() {
    const visibleItems = this.breadcrumbItems.slice(0, -1);

    return (
      <Host>
        <nav aria-label="Breadcrumb" class="breadcrumbs-nav" ref={(el) => (this.breadcrumbNavRef = el)}>
          <ol class="no-list breadcrumbs-list">
            {/* Home Breadcrumb */}
            <li>
              <a href={this.homeUrl} class="breadcrumb-link">
                <span class="visually-hidden">{this.homeText}</span>
                <post-icon name="2035"/>
              </a>
            </li>

            {/* Check if items should be concatenated */}
            {this.isConcatenated ? (
              <post-breadcrumb-item class="button">
                <button class="dropdown-btn" onClick={this.toggleDropdown}>
                  ...
                </button>

                {/* Dropdown Menu */}
                {this.isDropdownVisible && (
                  <div class="dropdown-menu">
                    {visibleItems.map((item, index) => (
                      <post-breadcrumb-item url={item.url} key={index}>
                        <a href={item.url} class="breadcrumb-link">
                          {item.text}
                        </a>
                      </post-breadcrumb-item>
                    ))}
                  </div>
                )}
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

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
        const itemWidth = item.text.length * 10; // Approximate width of each breadcrumb item
        return accum + itemWidth;
      }, 0);

      this.isConcatenated = totalWidth > visibleWidth;
    }
  }

  private toggleDropdown = () => {
    this.isDropdownVisible = !this.isDropdownVisible;
  };

  render() {
    // Separate visible breadcrumb items and menu items (excluding last item)
    const visibleItems = this.breadcrumbItems.slice(0, -1);

    return (
      <Host>
        <nav aria-label="Breadcrumb" class="breadcrumbs-nav" ref={(el) => (this.breadcrumbNavRef = el)}>
          <ol class="no-list breadcrumbs-list">
            {/* Home Breadcrumb */}
            <li class="home-icon">
              <a href={this.homeUrl} class="breadcrumb-link">
                <span class="visually-hidden">{this.homeText}</span>
                <svg class="home-icon-svg" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </a>
            </li>

            {/* Check if items should be concatenated */}
            {this.isConcatenated ? (
              <li>
                <button class="dropdown-btn" onClick={this.toggleDropdown}>
                  ...
                </button>

                {/* Dropdown Menu */}
                {this.isDropdownVisible && (
                  <div class="dropdown-menu">
                    {visibleItems.map((item, index) => (
                      <a key={index} href={item.url} class="breadcrumb-link">
                        {item.text}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              visibleItems.map((item, index) => (
                <li key={index}>
                  <a href={item.url} class="breadcrumb-link">
                    {item.text}
                  </a>
                </li>
              ))
            )}

            {/* Always show the last breadcrumb item */}
            {this.lastItem && (
              <li>
                <a href={this.lastItem.url} class="breadcrumb-link">
                  {this.lastItem.text}
                </a>
              </li>
            )}
          </ol>
        </nav>
      </Host>
    );
  }
}

import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'post-breadcrumb',
  styleUrl: 'post-breadcrumb.scss',
  shadow: true,
})

export class PostBreadcrumb {
  /**
   * URL for the home breadcrumb link
   */
  @Prop() homeUrl: string;

  /**
   * Text for the home breadcrumb link
   */
  @Prop() homeText: string = 'Home';

  @Element() host: HTMLElement;

  // Store the breadcrumb items passed as <post-breadcrumb-item> elements
  @State() breadcrumbItems: { url: string, text: string }[] = [];

  @State() isConcatenated: boolean = false;
  @State() lastWindowWidth: number = 0;

  // Reference for breadcrumb list container
  private breadcrumbNavRef?: HTMLElement;

  componentDidLoad() {
    this.updateBreadcrumbItems();
    window.addEventListener('resize', this.handleResize);
    this.checkConcatenation()
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

  render() {
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
                <button class="dropdown-btn">...</button>
              </li>
            ) : (
              this.breadcrumbItems.map((item, index) => (
                <li key={index}>
                  <a href={item.url} class="breadcrumb-link">
                    {item.text}
                  </a>
                </li>
              ))
            )}
          </ol>
        </nav>
      </Host>
    );
  }
}

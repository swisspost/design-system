import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndUrl, checkEmptyOrType, debounce, checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-breadcrumbs',
  styleUrl: 'post-breadcrumbs.scss',
  shadow: true,
})
export class PostBreadcrumbs {
  @Element() host: HTMLPostBreadcrumbsElement;

  /**
   * The URL for the home breadcrumb item.
   */
  @Prop() homeUrl!: string;

  /**
   * The text label for the home breadcrumb item.
   */
  @Prop() homeText: string = 'Home';

  /**
   * The accessible label for the breadcrumb menu when breadcrumb items are concatenated.
    */
  @Prop() menuLabel!: string;

  @State() breadcrumbItems: { url: string; text: string }[] = [];
  @State() isConcatenated: boolean;
  @State() lastWindowWidth: number;

  private breadcrumbsNavRef?: HTMLElement;
  private lastItem: { url: string; text: string };

  @Watch('homeUrl')
  validateHomeUrl() {
    checkRequiredAndUrl(this, 'homeUrl');
  }

  @Watch('homeText')
  validateHomeText() {
    checkEmptyOrType(this, 'homeUrl', 'string');
  }

  @Watch('menuLabel')
  validateLabel() {
    checkRequiredAndType(this, 'menuLabel', 'string');
  }

  componentWillLoad() {
    this.updateBreadcrumbItems();
  }

  componentDidLoad() {
    this.validateHomeUrl();
    this.validateHomeText();
    this.validateLabel();
    window.addEventListener('resize', this.handleResize);
    this.waitForBreadcrumbsRef();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Waits for breadcrumbs navigation reference to be available
  private waitForBreadcrumbsRef = debounce(() => {
    if (this.breadcrumbsNavRef?.clientWidth > 0) {
      this.checkConcatenation();
    } else {
      this.waitForBreadcrumbsRef();
    }
  }, 50);

  // Updates breadcrumb items and sets the last item
  private updateBreadcrumbItems() {
    this.breadcrumbItems = Array.from(this.host.querySelectorAll('post-breadcrumb-item')).map(
      item => ({
        text: item.textContent || '',
        url: item.getAttribute('url') || '',
      }),
    );
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

  private checkConcatenation() {
    if (!this.breadcrumbsNavRef) return;

    const visibleWidth = this.getParentWidth();

    // Measure all hidden breadcrumb items
    const hiddenItems = Array.from(
      this.host.shadowRoot?.querySelectorAll('.hidden-breadcrumb-item') || [],
    );

    const totalWidth = hiddenItems.reduce((accum, element) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      return accum + rect.width;
    }, 0);

    this.isConcatenated = totalWidth > visibleWidth;
  }

  // Handles breadcrumb item click to open the menu
  private handleBreadcrumbItemClick() {
    if (this.host.shadowRoot) {
      const menuTrigger = this.host.shadowRoot
        ?.querySelector('.menu-trigger-wrapper')
        ?.querySelector('button');

      if (menuTrigger) {
        menuTrigger.click();
      }
    }
  }

  render() {
    const visibleItems = this.breadcrumbItems.slice(0, -1);

    return (
      <Host data-version={version}>
        <nav
          aria-label="Breadcrumbs"
          class="breadcrumbs-nav"
          ref={el => (this.breadcrumbsNavRef = el)}
        >
          <ol class="no-list breadcrumbs-list">
            <li>
              <a href={this.homeUrl} class="breadcrumb-link">
                <span class="visually-hidden">{this.homeText}</span>
                <post-icon name="home" class="home-icon" />
              </a>
            </li>

            {/* Conditionally render concatenated menu or individual breadcrumb items */}
            {this.isConcatenated ? (
              <li
                role="none"
                class="menu-trigger-wrapper"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleBreadcrumbItemClick();
                  }
                }}
              >
                <post-icon name="2111" class="breadcrumb-item-icon" />
                <div class="actual-menu">
                  <post-menu-trigger for="breadcrumb-menu" tabIndex={0}>
                    <button class="btn test" tabIndex={-1}>
                      ...
                    </button>
                  </post-menu-trigger>
                  <post-menu id="breadcrumb-menu" label={this.menuLabel}>
                    {visibleItems.map(item => (
                      <post-menu-item
                        key={item.url || item.text}
                        class="breadcrumb-item"
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            const linkElement = (e.currentTarget as HTMLElement).querySelector('a');
                            linkElement?.click();
                            e.preventDefault();
                          }
                        }}
                      >
                        {item.url ? <a href={item.url}>{item.text}</a> : <span>{item.text}</span>}
                      </post-menu-item>
                    ))}
                  </post-menu>
                </div>
              </li>
            ) : (
              visibleItems.map(item => (
                <li>
                  <post-breadcrumb-item url={item.url} key={item.url || item.text}>
                    {item.text}
                  </post-breadcrumb-item>
                </li>
              ))
            )}

            {this.lastItem && (
              <li aria-current="page">
                <post-breadcrumb-item url={this.lastItem.url} tabindex={-1}>
                  {this.lastItem.text}
                </post-breadcrumb-item>
              </li>
            )}
          </ol>

          {/* Hidden items for width calculation */}
          <div class="hidden-items">
            <a href={this.homeUrl} class="hidden-breadcrumb-item">
              <span class="visually-hidden">{this.homeText}</span>
              <post-icon name="home" class="home-icon" />
            </a>
            {this.breadcrumbItems.map(item => (
              <post-breadcrumb-item
                url={item.url}
                key={`hidden-${item.url || item.text}`}
                class="hidden-breadcrumb-item"
              >
                {item.text}
              </post-breadcrumb-item>
            ))}
          </div>
        </nav>
      </Host>
    );
  }
}

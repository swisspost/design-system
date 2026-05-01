import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndUrl, debounce, checkRequiredAndType } from '@/utils';

type BreadcrumbItem = {
  url: string | undefined;
  text: string;
  description: string | undefined;
  label: string | undefined;
};

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
  @Prop({ reflect: true }) homeUrl!: string;

  /**
   * The text label for the home breadcrumb item.
   */
  @Prop({ reflect: true }) textHome!: string;

  /**
   * The accessible label for the breadcrumb component.
   */
  @Prop({ reflect: true }) textBreadcrumbs!: string;

  /**
   * The accessible label for the breadcrumb menu when breadcrumb items are concatenated.
   */
  @Prop({ reflect: true }) textMoreItems!: string;

  @State() breadcrumbItems: BreadcrumbItem[] = [];
  @State() isConcatenated: boolean;
  @State() lastWindowWidth: number;

  private breadcrumbsNavRef?: HTMLElement;
  private lastItem: BreadcrumbItem;

  @Watch('homeUrl')
  validateHomeUrl() {
    checkRequiredAndUrl(this, 'homeUrl');
  }

  @Watch('textHome')
  validateTextHome() {
    checkRequiredAndType(this, 'textHome', 'string');
  }

  @Watch('textBreadcrumbs')
  validateTextBreadcrumbs() {
    checkRequiredAndType(this, 'textBreadcrumbs', 'string');
  }

  @Watch('textMoreItems')
  validateTextMoreItems() {
    checkRequiredAndType(this, 'textMoreItems', 'string');
  }

  componentDidLoad() {
    this.validateHomeUrl();
    this.validateTextHome();
    this.validateTextBreadcrumbs();
    this.validateTextMoreItems();
    window.addEventListener('resize', this.handleResize);
    this.waitForBreadcrumbsRef();
    requestAnimationFrame(() => {
      this.updateBreadcrumbItems();
    });
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
        url: item.getAttribute('url') ?? undefined,
        description: item.getAttribute('description') ?? undefined,
        label: item.getAttribute('label') ?? undefined,
      }),
    );
    this.lastItem = this.breadcrumbItems.at(-1);
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
          aria-label={this.textBreadcrumbs}
          class="breadcrumbs-nav"
          ref={el => (this.breadcrumbsNavRef = el)}
        >
          <ol class="no-list breadcrumbs-list">
            <li>
              <a href={this.homeUrl} class="breadcrumb-link">
                <span class="visually-hidden">{this.textHome}</span>
                <post-icon name="home" class="home-icon" />
              </a>
            </li>

            {/* Conditionally render concatenated menu or individual breadcrumb items */}
            {this.isConcatenated ? (
              <li class="menu-trigger-wrapper">
                <post-icon name="chevronright" class="breadcrumb-item-icon" />
                <div class="actual-menu">
                  <post-menu-trigger
                    for="breadcrumb-menu"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleBreadcrumbItemClick();
                      }
                    }}
                  >
                    <button class="btn" tabIndex={-1}>
                      ...
                    </button>
                  </post-menu-trigger>
                  <post-menu id="breadcrumb-menu" label={this.textMoreItems}>
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
                        {item.url ? (
                          <a
                            href={item.url}
                            aria-label={item.label}
                            aria-description={item.description}
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </post-menu-item>
                    ))}
                  </post-menu>
                </div>
              </li>
            ) : (
              visibleItems.map(item => (
                <li>
                  <post-breadcrumb-item
                    url={item.url}
                    label={item.label}
                    description={item.description}
                    key={item.url || item.text}
                  >
                    {item.text}
                  </post-breadcrumb-item>
                </li>
              ))
            )}

            {this.lastItem && (
              <li aria-current="page">
                <post-breadcrumb-item
                  url={this.lastItem.url}
                  label={this.lastItem.label}
                  description={this.lastItem.description}
                  tabindex={-1}
                >
                  {this.lastItem.text}
                </post-breadcrumb-item>
              </li>
            )}
          </ol>

          {/* Hidden items for width calculation */}
          <div class="hidden-items">
            <a href={this.homeUrl} class="hidden-breadcrumb-item">
              <span class="visually-hidden">{this.textHome}</span>
              <post-icon name="home" class="home-icon" />
            </a>
            {this.breadcrumbItems.map(item => (
              <post-breadcrumb-item
                url={item.url}
                key={`hidden-${item.url || item.text}`}
                label={item.label}
                description={item.description}
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

import { checkUrl } from '@/utils';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { debounce } from 'throttle-debounce';

@Component({
  tag: 'post-breadcrumb',
  styleUrl: 'post-breadcrumb.scss',
  shadow: true,
})
export class PostBreadcrumb {
  /**
   * URL for the home breadcrumb link
   */
  @Prop() homeUrl: string | URL;

  /**
   * Text for the home breadcrumb link
   */
  @Prop() homeText: string = 'Home';

  @State() breadcrumbItems: Array<{ text: string; url?: string }> = [];
  @State() isConcatenated: boolean;
  @State() refsReady: boolean = false;

  @Element() host: HTMLElement;

  private controlNavRef?: HTMLElement;
  private visibleNavRef?: HTMLElement;
  private debouncedResize: debounce<() => void>;
  private lastWindowWidth: number;

  connectedCallback() {
    this.debouncedResize = debounce(200, this.handleResize.bind(this));
    window.addEventListener('resize', this.debouncedResize, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  @Watch('url')
  validateUrl() {
    checkUrl(this.homeUrl, 'The "url" property of the home-icon is invalid');
  }

  private handleControlNavRef(element: HTMLElement) {
    console.log("handleControlNavRef - ControlNavRef updated");
    this.controlNavRef = element;
    this.checkConcatenation();
  }

  private handleVisibleNavRef(element: HTMLElement) {
    console.log("handleVisibleNavRef - VisibleNavRef updated");
    this.visibleNavRef = element;
    this.checkConcatenation();
  }

  private checkConcatenation() {
    if (this.controlNavRef && this.visibleNavRef) {
      this.refsReady = true;

      window.requestAnimationFrame(() => {
        const controlWidth = this.controlNavRef.clientWidth;
        const visibleWidth = this.visibleNavRef.clientWidth;

        this.isConcatenated = controlWidth > visibleWidth;
      });
    }
  }
  
  private handleResize() {
    if (window.innerWidth !== this.lastWindowWidth) {
      this.lastWindowWidth = window.innerWidth;
      this.checkConcatenation();
    }
  }
  
  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.checkConcatenation();
    });
  }
  
  private renderBreadcrumbItems(isConcatenated: boolean) {
    const children = Array.from(this.host.children) as HTMLPostBreadcrumbItemElement[];
    this.breadcrumbItems = children.map((child) => ({
      text: child.innerHTML.trim(),
      url: child.getAttribute('href') || undefined,
    }));
    const middleItems = this.breadcrumbItems.slice(1, -1);
    const lastItem = this.breadcrumbItems[this.breadcrumbItems.length - 1];

    return (
      <ol class="no-list breadcrumbs-list">
        <li class="home-icon">
          <a href={this.homeUrl.toString()} class="breadcrumb-link">
            <post-icon name="2035" />
            <span class="visually-hidden">{this.homeText}</span>
          </a>
        </li>

        {isConcatenated ? (
        <li>
          <post-menu-trigger for="middle-breadcrumb-menu">
            <button class="middle-dropdown-button btn btn-blank" type="button">
              <span class="visually-hidden">Open menu</span>
              <span aria-hidden="true">...</span>
            </button>
          </post-menu-trigger>
          <post-menu id="middle-breadcrumb-menu">
            {middleItems.map((item) => (
              <post-menu-item>
                {item.url ? (
                  <a href={item.url}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </post-menu-item>
            ))}
          </post-menu>
        </li>
      ) : (
        middleItems.map((item) => (
          <li>
            <post-breadcrumb-item url={item.url}>{item.text}</post-breadcrumb-item>
          </li>
        ))
      )}

        {lastItem && (
          <li>
            <post-breadcrumb-item url={lastItem.url}>{lastItem.text}</post-breadcrumb-item>
          </li>
        )}
      </ol>
    );
  }

  render() {
    return (
      <Host>
        <div class="breadcrumbs">
          {/* Hidden control breadcrumbs for width calculation */}
          <div
            class="hidden-control-breadcrumbs"
            aria-hidden="true"
            tabindex="-1"
            ref={(el) => el && this.handleControlNavRef(el)}
          >
            <nav class="breadcrumbs-nav">
              {this.renderBreadcrumbItems(false)}
            </nav>
          </div>

          {/* Visible breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            ref={(el) => el && this.handleVisibleNavRef(el)}
            class={{
              'breadcrumbs-nav': true,
              'visually-hidden': !this.refsReady,
            }}
          >
            {this.renderBreadcrumbItems(this.isConcatenated)}
          </nav>
        </div>
      </Host>
    );
  }
}

import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { debounce } from 'throttle-debounce';

export interface IBreadcrumbItem {
  text: string;
  url: string | undefined;
}

@Component({
  tag: 'post-breadcrumbs-new',
  styleUrl: 'post-breadcrumb-new.scss',
  shadow: true,
})
export class PostBreadcrumbs {
  /**
   * Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has its own navigation structure.
   */
  @Prop() customItems?: string | IBreadcrumbItem[];

  @State() customBreadcrumbItems?: IBreadcrumbItem[];
  @State() isConcatenated: boolean; // Don't set an initial value; this has to be calculated first.
  @State() refsReady: boolean = false;
  @Element() host: HTMLPostBreadcrumbElement;

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

  async componentWillLoad() {
    try {
      this.customBreadcrumbItems =
        typeof this.customItems === 'string' ? JSON.parse(this.customItems) : this.customItems;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    // Initially check if breadcrumb items are concatenated
    window.requestAnimationFrame(() => {
      this.handleResize();
    });
  }

  @Watch('customItems')
  handleCustomConfigChange(newValue: string | IBreadcrumbItem[]) {
    try {
      this.customBreadcrumbItems = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      console.error(error);
    }
  }

  private handleControlNavRef(element: HTMLElement) {
    this.controlNavRef = element;
    console.log('ControlNavRef assigned:', this.controlNavRef);
  }

  private handleResize() {
    if (window.innerWidth === this.lastWindowWidth) {
      return;
    }
    this.lastWindowWidth = window.innerWidth;
    this.checkConcatenation();
  }

  private checkConcatenation() {
    if (this.controlNavRef && this.visibleNavRef) {
      this.refsReady = true;
      console.log(
        'Control Width (before measurement):', this.controlNavRef.clientWidth,
        'Visible Width:', this.visibleNavRef.clientWidth
      );
  
      window.requestAnimationFrame(() => {
        const controlWidth = this.controlNavRef.clientWidth;
        const visibleWidth = this.visibleNavRef.clientWidth;
  
        console.log(
          'Control Width (after measurement):', controlWidth,
          'Visible Width:', visibleWidth
        );
  
        this.isConcatenated = controlWidth > visibleWidth;
        console.log('Concatenated:', this.isConcatenated);
      });
    } else {
      console.warn('Missing refs:', {
        controlNavRef: this.controlNavRef,
        visibleNavRef: this.visibleNavRef,
      });
    }
  }
  
  private handleVisibleNavRef(element: HTMLElement) {
    this.visibleNavRef = element;
    this.checkConcatenation();
    console.log('Visible Nav Ref:', this.visibleNavRef);

  }

  private MiddleLinks = (props: {
    items: IBreadcrumbItem[];
    icons?: boolean;
    focusable?: boolean;
  }) => {
    return props.items.slice(1, -1).map(item => (
      <li key={item.url}>
        <a href={item.url} class="nav-link" tabindex={props.focusable === false ? '-1' : undefined}>
          <span>{item.text}</span>
        </a>
        {props.icons ? <span class="icon">⮞</span> : null}
      </li>
    ));
  };

  private MiddleDropdown = (props: {
    items: IBreadcrumbItem[];
    dropdownOpen: boolean;
    clickHandler: (event?: MouseEvent) => void;
    focusable?: boolean;
  }) => {
    return (
      <div class="middle-dropdown-container">
        <button
          class="middle-dropdown-button btn btn-blank"
          type="button"
          onClick={event => props.clickHandler(event)}
          tabindex={props.focusable === false ? '-1' : undefined}
        >
          <span class="visually-hidden">Open menu</span>
          <span aria-hidden="true">...</span>
        </button>
        {props.dropdownOpen ? (
          <nav aria-label="Intermediary links" class="middle-dropdown">
            <ul class="no-list">
              {this.MiddleLinks({ items: props.items, icons: false, focusable: props.focusable })}
            </ul>
          </nav>
        ) : null}
      </div>
    );
  };

  private BreadcrumbList = (props: {
    items: IBreadcrumbItem[];
    dropdownOpen?: boolean;
    isConcatenated?: boolean;
    clickHandler: (event?: MouseEvent) => void;
    lastItemRef?: (element: HTMLElement | undefined) => void;
    focusable?: boolean;
  }) => {
    const homeItem = props.items[0];
    const lastItem = props.items[props.items.length - 1];

    return (
      <ol class="no-list breadcrumbs-list">
        <li>
          <a
            class="home-link nav-link"
            href={homeItem.url}
            tabindex={props.focusable === false ? '-1' : undefined}
          >
            <span class="visually-hidden">{homeItem.text}</span>
            <span class="icon">🏠</span>
          </a>
        </li>
        {props.isConcatenated ? (
          <li>
            {this.MiddleDropdown({
              items: props.items,
              dropdownOpen: props.dropdownOpen ?? false,
              clickHandler: props.clickHandler,
              focusable: props.focusable,
            })}
          </li>
        ) : (
          this.MiddleLinks({ items: props.items, icons: true, focusable: props.focusable })
        )}
        <li>
          <a
            class="last-link nav-link"
            href={lastItem.url}
            tabindex={props.focusable === false ? '-1' : undefined}
            ref={el => (props.lastItemRef ? props.lastItemRef(el) : null)}
          >
            {lastItem.text}
          </a>
        </li>
      </ol>
    );
  };

  render() {
  const items = this.customBreadcrumbItems || [];

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
            {this.BreadcrumbList({
              items: items,
              isConcatenated: false,
              clickHandler: () => {},
            })}
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
          {this.BreadcrumbList({
            items: items,
            isConcatenated: this.isConcatenated,
            clickHandler: () => {},
          })}
        </nav>
      </div>
      <slot></slot>
    </Host>
  );
  }
}

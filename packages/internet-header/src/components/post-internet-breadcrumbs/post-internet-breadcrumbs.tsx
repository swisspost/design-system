import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { debounce } from 'throttle-debounce';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { SvgIcon } from '../../utils/svg-icon.component';
import { state } from '../../data/store';
import { OverlayComponent } from './components/overlay.component';
import { iframeResizer } from 'iframe-resizer';
import { IBreadcrumbItem, IBreadcrumbOverlay } from '../../models/breadcrumbs.model';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { BreadcrumbList } from './components/breadcrumb-list.component';
import { prefersReducedMotion } from '../../utils/utils';

@Component({
  tag: 'swisspost-internet-breadcrumbs',
  styleUrl: 'post-internet-breadcrumbs.scss',
  shadow: true,
})
export class PostInternetBreadcrumbs {
  /**
   * Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure.
   */
  @Prop() customItems?: string | IBreadcrumbItem[];

  /**
   * Hide all buttons.
   */
  @Prop() hideButtons: boolean = false;

  @State() customBreadcrumbItems?: IBreadcrumbItem[];
  @State() overlayVisible: boolean;
  @State() isConcatenated: boolean; // Don't set an initial value, this has to be calculated first, otherwise reactivity problems ensue
  @State() dropdownOpen: boolean = false;
  @State() refsReady: boolean = false;
  @Element() host: HTMLSwisspostInternetBreadcrumbsElement;

  /**
   * Toggle an overlay associated with a button.
   * @param {IBreadcrumbOverlay['id']} overlayId
   */
  @Method()
  async toggleOverlayById(overlayId: IBreadcrumbOverlay['id']): Promise<void> {
    const buttons = state.localizedConfig?.breadcrumb.buttons;
    const overlay = buttons?.find(button => button.overlay.id === overlayId)?.overlay;

    if (!overlay) {
      console.warn(
        `Internet Header: Failed to toggle overlay with id #${overlayId} as it was not found in the breadcrumb buttons config.`,
      );
      return;
    }

    this.toggleOverlay(overlay);
  }

  private controlNavRef?: HTMLElement;
  private visibleNavRef?: HTMLElement;
  private currentOverlay: IBreadcrumbOverlay;
  private debouncedResize: debounce<() => void>;
  private lastWindowWidth: number;
  private openAnimation: Animation;
  private loadedAnimation: Animation | undefined;

  connectedCallback() {
    this.debouncedResize = debounce(200, this.handleResize.bind(this));
    window.addEventListener('resize', this.debouncedResize, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.debouncedResize);
    window.removeEventListener('click', this.handleWindowClick);
    clearAllBodyScrollLocks();
  }

  async componentWillLoad() {
    // Wait for the config to arrive, then render the header
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

  private handleResize() {
    // Catch and exclude vertical resize events, e.g. scrolling in iPhone
    if (window.innerWidth === this.lastWindowWidth) {
      return;
    }
    this.lastWindowWidth = window.innerWidth;
    this.checkConcatenation();
  }

  private checkConcatenation() {
    if (this.controlNavRef && this.visibleNavRef) {
      this.refsReady = true;

      // Delay the check
      window.requestAnimationFrame(() => {
        if (this.controlNavRef && this.visibleNavRef) {
          this.isConcatenated = this.controlNavRef.clientWidth > this.visibleNavRef.clientWidth;
        }
      });
    }
  }

  private toggleOverlay(overlay: IBreadcrumbOverlay, force?: boolean) {
    const newVisibility = force ?? !this.overlayVisible;

    if (newVisibility) {
      // Will trigger overlayRef() once the HTML is rendered
      this.overlayVisible = newVisibility;
      this.currentOverlay = overlay;
      this.setBodyScroll(overlay);
    } else {
      const activeToggler = this.host.shadowRoot?.querySelector<HTMLElement>(
        '.breadcrumb-buttons [aria-expanded="true"]',
      );

      if (this.openAnimation && this.loadedAnimation) {
        this.openAnimation.reverse();
        this.loadedAnimation.reverse();

        // Delay hiding overlay until after the animation finishes
        Promise.all([this.openAnimation.finished, this.loadedAnimation.finished]).then(() => {
          if (activeToggler) {
            activeToggler.focus();
          }
          this.overlayVisible = newVisibility;
          this.setBodyScroll(overlay);
        });
      }
    }
  }

  /**
   * Disable or re-enable body scrolling, depending on whether overlay is visible or not
   */
  private setBodyScroll(overlay: IBreadcrumbOverlay) {
    if (this.overlayVisible) {
      // @ts-expect-error first argument should by of type HTMLElement | Element but instead uses a custom interface
      disableBodyScroll(overlay, { reserveScrollBarGap: true });
    } else {
      // @ts-expect-error first argument should by of type HTMLElement | Element but instead uses a custom interface
      enableBodyScroll(overlay);
    }
  }

  private toggleDropdown(force?: boolean) {
    this.dropdownOpen = force ?? !this.dropdownOpen;

    if (this.dropdownOpen) {
      requestAnimationFrame(() => {
        document.addEventListener('click', this.handleWindowClick.bind(this), { once: true });
      });
    }
  }

  private handleWindowClick() {
    this.toggleDropdown(false);
  }

  private registerIFrameResizer(iFrame: HTMLIFrameElement | undefined) {
    if (!iFrame) {
      return;
    }

    iFrame.addEventListener('load', () => {
      iframeResizer(
        {
          heightCalculationMethod: 'taggedElement',
          scrolling: true,
          checkOrigin: false,
        },
        iFrame,
      );
      const duration = prefersReducedMotion ? 0 : 300;
      this.loadedAnimation = iFrame.parentElement?.animate(
        [{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }],
        { duration, fill: 'forwards' },
      );
      iFrame.closest('[role=dialog]')?.classList.add('loaded');
      this.loadedAnimation?.finished.then(() => {
        iFrame.parentElement?.focus();
      });
    });
  }

  /**
   * Reference function for the overlay element got called. It is either null (overlay closed)
   * or contains the overlay element as parameter.
   * @param e Overlay element or null
   * @returns void
   */
  private overlayRef(e: HTMLElement | undefined) {
    if (!e) {
      return;
    }

    const duration = prefersReducedMotion ? 0 : 500;
    this.openAnimation = e.animate([{ opacity: 1, visibility: 'visible' }], {
      duration,
      fill: 'forwards',
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'escape') {
      this.toggleOverlay(this.currentOverlay, false);
    }
  }

  private handleToggleDropdown() {
    this.toggleDropdown();
  }

  private handleToggleOverlay() {
    this.toggleOverlay(this.currentOverlay, false);
  }

  private handleControlNavRef(element: HTMLElement) {
    this.controlNavRef = element;
    this.checkConcatenation();
  }

  private handleVisibleNavRef(element: HTMLElement) {
    this.visibleNavRef = element;
    this.checkConcatenation();
  }

  render() {
    // There is something wrong entirely
    // eslint-disable-next-line @stencil-community/strict-boolean-conditions
    if (!state) {
      console.warn(
        `Internet Breadcrumbs: Could not load config. Please make sure that you included the <swisspost-internet-header></swisspost-internet-header> component.`,
      );
      return null;
    }

    // Config is not loaded yet
    if (!state.localizedConfig) {
      return null;
    }

    // Config has loaded but there is no breadcrumbs config
    // eslint-disable-next-line @stencil-community/strict-boolean-conditions
    if (!state.localizedConfig.breadcrumb) {
      console.warn(
        `Internet Header: Current project "${state.projectId}" does not include a breadcrumb config. The breadcrumbs will not be rendered. Remove `,
        document.querySelector('swisspost-internet-breadcrumbs'),
        `from your markup or configure the breadcrumbs in your portal config to stop seeing this warning.`,
      );
      return null;
    }

    const breadcrumbConfig = state.localizedConfig.breadcrumb;
    const items =
      this.customBreadcrumbItems !== undefined
        ? [...breadcrumbConfig.items, ...this.customBreadcrumbItems]
        : breadcrumbConfig.items;

    return (
      <Host>
        <SvgSprite />
        <div class="breadcrumbs">
          <div class="hidden-control-breadcrumbs" aria-hidden="true" tabindex="-1">
            <nav class="breadcrumbs-nav" ref={e => e !== undefined && this.handleControlNavRef(e)}>
              <BreadcrumbList
                items={items}
                focusable={false}
                clickHandler={() => {}}
              ></BreadcrumbList>
            </nav>
          </div>
          <nav
            aria-label={breadcrumbConfig.a11yLabel}
            ref={e => e !== undefined && this.handleVisibleNavRef(e)}
            class={{
              'breadcrumbs-nav': true,
              'visually-hidden': !this.refsReady,
            }}
          >
            <BreadcrumbList
              items={items}
              dropdownOpen={this.dropdownOpen}
              isConcatenated={this.isConcatenated}
              clickHandler={() => this.handleToggleDropdown()}
            ></BreadcrumbList>
          </nav>
          {!this.hideButtons && (
            <div class="breadcrumb-buttons">
              {breadcrumbConfig.buttons.map(button => (
                <button
                  class="btn btn-secondary btn-icon"
                  key={button.text}
                  aria-expanded={`${Boolean(
                    this.overlayVisible && this.currentOverlay === button.overlay,
                  )}`}
                  onClick={() => this.toggleOverlay(button.overlay, true)}
                >
                  <SvgIcon name={button.svgIcon.name}></SvgIcon>
                  <span class="visually-hidden">{button.text}</span>
                </button>
              ))}
            </div>
          )}
          {this.overlayVisible && (
            <OverlayComponent
              overlayRef={e => e !== undefined && this.overlayRef(e)}
              iFrameRef={e => e !== undefined && this.registerIFrameResizer(e)}
              overlay={this.currentOverlay}
              onClick={() => this.handleToggleOverlay()}
              onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
              closeButtonText={state.localizedConfig.header.translations.closeButtonText}
            ></OverlayComponent>
          )}
        </div>
        <slot></slot>
      </Host>
    );
  }
}

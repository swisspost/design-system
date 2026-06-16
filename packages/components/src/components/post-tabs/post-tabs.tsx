import { fade } from '@/animations';
import { componentOnReady, Type } from '@/utils';
import { version } from '@root/package.json';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
  Build,
} from '@stencil/core';

/**
 * @slot default - Slot for placing tab items. Each tab item should be a <post-tab-item> element.
 * @slot panels - Slot for placing tab panels. Each tab panel should be a <post-tab-panel> element.
 * @part post-tabs - The container element that holds the set of tabs.
 * @part post-tabs-content - The container element that displays the content of the currently active tab. Only available in Content variant.
 */

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private currentActiveTab: HTMLPostTabItemElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;
  private contentObserver: MutationObserver;
  private resizeObserver: ResizeObserver;
  private tabsContainer: HTMLElement;

  @State() isPagesVariant: boolean = false;

  @Element() host: HTMLPostTabsElement;

  @State() private showLeftScrollButton = false;
  @State() private showRightScrollButton = false;

  private leftScrollButton!: HTMLButtonElement;
  private rightScrollButton!: HTMLButtonElement;

  private get tabs(): HTMLPostTabItemElement[] {
    return Array.from(this.host.querySelectorAll<HTMLPostTabItemElement>('post-tab-item')).filter(
      tab => tab.closest('post-tabs') === this.host,
    );
  }

  private get panels(): HTMLPostTabPanelElement[] {
    return Array.from(this.host.querySelectorAll<HTMLPostTabPanelElement>('post-tab-panel')).filter(
      panel => panel.closest('post-tabs') === this.host,
    );
  }

  /**
   * Label for the "previous tab items" button.
   */
  @Prop({ reflect: true }) textPrevTabItems: string = 'Previous tab items';

  /**
   * Label for the "next tab items" button.
   */
  @Prop({ reflect: true }) textNextTabItems: string = 'Next tab items';

  /**
   * The name of the tab in the Content Tabs variant that is initially active.
   * Changing this value after initialization has no effect.
   * If not specified, defaults to the first tab.
   */
  @Prop() readonly activeTab?: string;

  /**
   * When set to true, this property allows the tabs container to span the
   * Changing this value after initialization has no effect.
   * full width of the screen, from edge to edge.
   */
  @Prop({ reflect: true }) fullWidth: boolean = false;

  /**
   * The accessible label for the Content Tabs variant.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly label?: string;

  @Watch('label')
  validateLabel() {
    if (this.isPagesVariant && !this.label) {
      console.error(
        `[${this.host.localName}] Property "label" is required in Pages variant. Received: ${JSON.stringify(this.label)}.`,
        this.host,
      );
    }
  }

  /**
   * An event emitted after the active tab changes, when the fade in transition of its associated panel is finished.
   * The payload is the name of the newly active tab.
   * Only emitted in Content Tabs variant.
   */
  @Event() postChange: EventEmitter<string>;

  componentWillRender() {
    this.detectVariant();
  }

  componentDidLoad() {
    // Programmatically associates the scroll buttons with the tabs container via the ARIA reflection API, avoiding the need for ID-based aria-controls attributes.
    this.leftScrollButton.ariaControlsElements = [this.tabsContainer];
    this.rightScrollButton.ariaControlsElements = [this.tabsContainer];

    this.moveMisplacedTabs();
    this.moveMisplacedPanels();
    this.enableTabs();
    this.handleScrollButtons();
    this.setupContentObserver();
    this.setupResizeObserver();
    this.validateLabel();

    if (this.isPagesVariant) {
      const activeTab = this.findActivePagesTab();
      if (activeTab) {
        this.activateTab(activeTab);
        this.scrollTabIntoView(activeTab);
      }
    } else {
      const tabToActivate = this.activeTab || this.tabs[0]?.name;
      if (tabToActivate) {
        void this.show(tabToActivate);
        const activeTab = this.tabs.find(t => t.name === tabToActivate);
        if (activeTab) this.scrollTabIntoView(activeTab);
      }
    }

    this.isLoaded = true;
  }

  disconnectedCallback() {
    if (this.showing) {
      this.showing.cancel();
      this.showing = null;
    }
    if (this.hiding) {
      this.hiding.cancel();
      this.hiding = null;
    }

    if (this.contentObserver) {
      this.contentObserver?.disconnect();
    }

    this.resizeObserver?.disconnect();

    // Remove scroll event listener
    this.tabsContainer?.removeEventListener('scroll', this.updateScrollButtons);
  }

  private setupContentObserver() {
    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-pages-variant', 'aria-current'],
    };

    this.contentObserver = new MutationObserver(this.handleContentChange.bind(this));
    this.contentObserver?.observe(this.host, config);
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(this.updateScrollButtons);
    this.resizeObserver?.observe(this.tabsContainer);
  }

  private handleContentChange(mutations: MutationRecord[]) {
    const shouldRedetect = this.shouldRedetectVariant(mutations);
    const ariaCurrentChanged = this.hasAriaCurrentChanged(mutations);

    if (ariaCurrentChanged && this.isPagesVariant) {
      this.updateActivePagesTab();
    }

    if (shouldRedetect) {
      this.handleVariantChange();
    }

    this.updateScrollButtons();
  }

  private shouldRedetectVariant(mutations: MutationRecord[]): boolean {
    return mutations.some(mutation => {
      if (mutation.type === 'childList') {
        return mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0;
      }
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-pages-variant') {
        return true;
      }
      return false;
    });
  }

  private hasAriaCurrentChanged(mutations: MutationRecord[]): boolean {
    return mutations.some(
      mutation => mutation.type === 'attributes' && mutation.attributeName === 'aria-current',
    );
  }

  private updateActivePagesTab(): void {
    const activeTab = this.findActivePagesTab();
    if (activeTab && activeTab !== this.currentActiveTab) {
      this.activateTab(activeTab);
      this.scrollTabIntoView(activeTab, 'smooth');
    }
  }

  private handleVariantChange(): void {
    const previousVariant = this.isPagesVariant;
    this.detectVariant();

    if (previousVariant !== this.isPagesVariant) {
      this.enableTabs();
      this.initializeActiveTab();
    }
  }

  private initializeActiveTab(): void {
    if (this.isPagesVariant) {
      const activeTab = this.findActivePagesTab();
      if (activeTab) {
        this.activateTab(activeTab);
        this.scrollTabIntoView(activeTab);
      }
    } else {
      const tabToActivate = this.activeTab || this.tabs[0]?.name;
      if (tabToActivate) {
        void this.show(tabToActivate);
      }
    }
  }

  private detectVariant() {
    // Identify Page Tabs variant by looking for anchor elements in tabs
    // This works even before post-tab-item sets [data-pages-variant] attribute
    const hasPages = this.tabs.some(tab => {
      const hasAnchor = tab.querySelector('a') !== null;
      const pagesVariantAttr = tab.dataset.pagesVariant === 'true';
      return hasAnchor || pagesVariantAttr;
    });

    const hasPanels = this.panels.length > 0;

    if (hasPages && hasPanels) {
      throw new Error(
        'PostTabs: Mixed mode detected. Cannot use both Page Tabs (anchor elements) and Content Tabs (post-tab-panel elements) variants at the same time.',
      );
    }

    this.isPagesVariant = hasPages;
  }

  private findActivePagesTab(): HTMLPostTabItemElement | null {
    return (
      this.tabs.find(tab => {
        const anchor = tab.querySelector('a[aria-current="page"]');
        return anchor !== null;
      }) || null
    );
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(tabName: string) {
    // do nothing if the tab is already active
    if (tabName === this.currentActiveTab?.name) {
      return;
    }

    const previousTab = this.currentActiveTab;
    const newTab: HTMLPostTabItemElement = this.host.querySelector(
      `post-tab-item[name=${tabName}]`,
    );

    this.activateTab(newTab);
    this.scrollTabIntoView(newTab, 'smooth');
    // if a panel is currently being displayed, remove it from the view and complete the associated animation
    if (this.showing) {
      this.showing.finish();
      this.showing = null;
    }

    // hide the currently visible panel only if no other animation is running
    if (previousTab && !this.showing && !this.hiding) this.hidePanel(previousTab.name);

    // wait for any hiding animation to complete before showing the selected tab
    if (this.hiding) await this.hiding.finished;

    this.showSelectedPanel();

    // wait for any display animation to complete for the returned promise to fully resolve
    if (this.showing) await this.showing.finished;

    if (this.isLoaded) this.postChange.emit(this.currentActiveTab.name);
  }

  private moveMisplacedTabs() {
    if (!this.tabs) return;

    this.tabs.forEach(tab => {
      // Tab items should go in the default slot, so remove any slot attribute
      if (tab.getAttribute('slot')) {
        tab.removeAttribute('slot');
      }
    });
  }

  private moveMisplacedPanels() {
    if (!this.panels) return;

    this.panels.forEach(panel => {
      if (panel.getAttribute('slot') !== 'panels') {
        panel.setAttribute('slot', 'panels');
      }
    });
  }

  private enableTabs() {
    if (!this.tabs) return;

    this.tabs.forEach(async tab => {
      await componentOnReady(tab);

      // In Page Tabs variant, navigation is handled by the consumer's routing
      if (this.isPagesVariant) {
        return;
      }

      // Content Tabs variant: set up ARIA relationships and event handlers
      if (tab.getAttribute('aria-controls')) return;

      const tabPanel = this.getPanel(tab.name);
      if (tabPanel) {
        tab.setAttribute('aria-controls', tabPanel.id);
        tabPanel.setAttribute('aria-labelledby', tab.id);
      }

      tab.addEventListener('click', () => {
        void this.show(tab.name);
      });

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void this.show(tab.name);
        }
      });

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.navigateTabs(tab, e.key);
      });
    });

    // if the currently active tab was removed from the DOM then select the first one
    if (this.currentActiveTab && !this.currentActiveTab.isConnected) {
      void this.show(this.tabs[0]?.name);
    }
  }

  private activateTab(tab: HTMLPostTabItemElement) {
    // Deactivate previous tab
    if (this.currentActiveTab) {
      if (!this.isPagesVariant) {
        this.currentActiveTab.setAttribute('aria-selected', 'false');
        this.currentActiveTab.setAttribute('tabindex', '-1');
      }
    }

    if (!this.isPagesVariant) {
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
    }

    this.currentActiveTab = tab;
  }

  private hidePanel(panelName: HTMLPostTabPanelElement['for']) {
    const previousPanel = this.getPanel(panelName);

    if (!previousPanel) return;

    this.hiding = fade(previousPanel, 'out');
    this.hiding.onfinish = () => {
      previousPanel.style.display = 'none';
      this.hiding = null;
    };
  }

  private showSelectedPanel() {
    const panel = this.getPanel(this.currentActiveTab.name);
    if (!panel) return;
    panel.style.display = 'block';

    // prevent the initially selected panel from fading in
    if (!this.isLoaded) return;

    this.showing = fade(panel, 'in');
    this.showing.onfinish = () => {
      this.showing = null;
    };
  }

  private getPanel(name: string): HTMLPostTabPanelElement {
    return this.host.querySelector<HTMLPostTabPanelElement>(`post-tab-panel[for=${name}]`);
  }

  private navigateTabs(tab: HTMLPostTabItemElement, key: 'ArrowRight' | 'ArrowLeft') {
    const activeTabIndex = Array.from(this.tabs).indexOf(tab);

    let nextTab: HTMLPostTabItemElement;
    if (key === 'ArrowRight') {
      nextTab = this.tabs[activeTabIndex + 1] || this.tabs[0];
    } else {
      nextTab = this.tabs[activeTabIndex - 1] || this.tabs.at(-1);
    }
    if (!nextTab) return;

    nextTab.focus();
    void this.show(nextTab.name);
  }

  // Handles the visibility of scroll buttons based on the scroll position of the tabs container
  private readonly updateScrollButtons = () => {
    if (!this.tabsContainer) return;
    this.showLeftScrollButton = this.tabsContainer.scrollLeft > 0;
    this.showRightScrollButton =
      this.tabsContainer.scrollLeft + this.tabsContainer.clientWidth <
      this.tabsContainer.scrollWidth;
  };

  private scrollTabs(direction: 'prev' | 'next') {
    const sign = direction === 'prev' ? -1 : 1;
    this.tabsContainer.scrollBy({
      left: sign * this.tabsContainer.clientWidth,
      behavior: 'smooth',
    });
  }

  private scrollTabIntoView(tab: HTMLPostTabItemElement, behavior: ScrollBehavior = 'instant') {
    const container = this.tabsContainer;
    const tabLeft = tab.offsetLeft;
    const tabRight = tabLeft + tab.offsetWidth;
    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;

    if (tabLeft < containerLeft) {
      container.scrollTo({ left: tabLeft, behavior });
    } else if (tabRight > containerRight) {
      container.scrollTo({ left: tabRight - container.clientWidth, behavior });
    }
  }

  private handleScrollButtons() {
    this.updateScrollButtons();
    this.tabsContainer.addEventListener('scroll', this.updateScrollButtons);
  }

  render() {
    const TabsContainer = this.isPagesVariant ? 'nav' : 'div';
    const isSSR = Build.isServer;
    const tabStyle = {
      [`--post-tab-panel-${this.activeTab}`]: 'block',
      [`--post-tab-item-${this.activeTab}`]: '1',
    };
    const style = isSSR && !this.isPagesVariant ? tabStyle : undefined;
    return (
      <Host data-version={version} style={style}>
        <div class="tabs-wrapper" part="post-tabs">
          <button
            ref={el => (this.leftScrollButton = el!)}
            class="scroll-btn scroll-btn-left"
            type="button"
            aria-label={this.textPrevTabItems}
            tabindex={this.showLeftScrollButton ? 0 : -1}
            hidden={!this.showLeftScrollButton}
            onClick={() => this.scrollTabs('prev')}
          >
            <post-icon name="chevronleft"></post-icon>
          </button>
          <TabsContainer
            ref={el => (this.tabsContainer = el as HTMLElement)}
            class="tabs"
            role={this.isPagesVariant ? undefined : 'tablist'}
            aria-label={this.isPagesVariant ? this.label : undefined}
          >
            <slot
              onSlotchange={() => {
                this.moveMisplacedTabs();
                this.enableTabs();
              }}
            />
          </TabsContainer>
          <button
            ref={el => (this.rightScrollButton = el!)}
            class="scroll-btn scroll-btn-right"
            type="button"
            aria-label={this.textNextTabItems}
            tabindex={this.showRightScrollButton ? 0 : -1}
            hidden={!this.showRightScrollButton}
            onClick={() => this.scrollTabs('next')}
          >
            <post-icon name="chevronright"></post-icon>
          </button>
        </div>
        {!this.isPagesVariant && (
          <div class="tab-content" part="post-tabs-content">
            <slot name="panels" onSlotchange={() => this.moveMisplacedPanels()} />
          </div>
        )}
      </Host>
    );
  }
}

import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { fadeIn, fadeOut } from '@/animations';
import { componentOnReady, checkRequiredAndType } from '@/utils';

/**
 * @slot default - Slot for placing tab items. Each tab item should be a <post-tab-item> element.
 * @slot panels - Slot for placing tab panels. Each tab panel should be a <post-tab-panel> element.
 * @part tabs - The container element that holds the set of tabs.
 * @part content - The container element that displays the content of the currently active tab. Only available in panels mode.
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

  @State() isNavigationMode: boolean = false;

  private get tabs(): HTMLPostTabItemElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLPostTabItemElement>('post-tab-item'),
    ).filter(tab => tab.closest('post-tabs') === this.host);
  }

  private get panels(): HTMLPostTabPanelElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLPostTabPanelElement>('post-tab-panel'),
    ).filter(panel => panel.closest('post-tabs') === this.host);
  }

  @Element() host: HTMLPostTabsElement;

  /**
   * The name of the tab that is initially active.
   * Changing this value after initialization has no effect.
   * If not specified, defaults to the first tab.
   */
  @Prop() readonly activeTab?: string;

  /**
   * When set to true, this property allows the tabs container to span the
   * full width of the screen, from edge to edge.
   */
  @Prop({ reflect: true }) fullWidth: boolean;

  /**
   * The accessible label for the tabs component in navigation mode.
   */
  @Prop({ reflect: true }) readonly label!: string;

  @Watch('label')
  validateLabel() {
    if (this.isNavigationMode) {
      checkRequiredAndType(this, 'label', 'string');
    }
  }

  /**
   * An event emitted after the active tab changes, when the fade in transition of its associated panel is finished.
   * The payload is the name of the newly active tab.
   * Only emitted in panel mode.
   */
  @Event() postChange: EventEmitter<string>;

  componentDidLoad() {
    this.detectMode();
    this.moveMisplacedTabs();
    this.isLoaded = true;
    this.enableTabs();
    this.setupContentObserver();
    this.validateLabel();

    if (this.isNavigationMode) {
      // In navigation mode, activate the tab with aria-current="page"
      const activeTab = this.findActiveNavigationTab();
      if (activeTab) {
        this.activateTab(activeTab);
      }
    } else {
      // In panel mode, use activeTab prop or default to first tab
      const tabToActivate = this.activeTab || this.tabs[0]?.name;
      if (tabToActivate) {
        void this.show(tabToActivate);
      }
    }
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
      this.contentObserver.disconnect();
    }
  }

  private setupContentObserver() {
    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-navigation-mode', 'aria-current']
    };

    this.contentObserver = new MutationObserver(this.handleContentChange.bind(this));
    this.contentObserver.observe(this.host, config);
  }

  private handleContentChange(mutations: MutationRecord[]) {
    const shouldRedetect = mutations.some(mutation => {
      if (mutation.type === 'childList') {
        return mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0;
      }
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-navigation-mode') {
        return true;
      }
      return false;
    });

    // Handle aria-current changes in navigation mode
    const ariaCurrentChanged = mutations.some(
      mutation => mutation.type === 'attributes' && mutation.attributeName === 'aria-current'
    );

    if (ariaCurrentChanged && this.isNavigationMode) {
      const activeTab = this.findActiveNavigationTab();
      if (activeTab && activeTab !== this.currentActiveTab) {
        this.activateTab(activeTab);
      }
    }

    if (shouldRedetect) {
      const previousMode = this.isNavigationMode;
      this.detectMode();
      
      if (previousMode !== this.isNavigationMode) {
        this.enableTabs();
        
        if (this.isNavigationMode) {
          const activeTab = this.findActiveNavigationTab();
          if (activeTab) {
            this.activateTab(activeTab);
          }
        } else {
          const tabToActivate = this.activeTab || this.tabs[0]?.name;
          if (tabToActivate) {
            void this.show(tabToActivate);
          }
        }
      }
    }
  }

  private detectMode() {    
    const hasNavigationTabs = this.tabs.some(tab => {
      const navMode = tab.getAttribute('data-navigation-mode') === 'true';
      return navMode;
    });
    
    const hasPanels = this.panels.length > 0;
    
    if (hasNavigationTabs && hasPanels) {
      throw new Error('PostTabs: Mixed mode detected. Cannot use both navigation mode (anchor elements) and panel mode (post-tab-panel elements) at the same time.');
    }
    
    this.isNavigationMode = hasNavigationTabs;
  }

  private findActiveNavigationTab(): HTMLPostTabItemElement | null {
    return this.tabs.find(tab => {
      const anchor = tab.querySelector('a[aria-current="page"]');
      return anchor !== null;
    }) || null;
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

    // if a panel is currently being displayed, remove it from the view and complete the associated animation
    if (this.showing) {
      this.showing.effect['target'].style.display = 'none';
      this.showing.finish();
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

  private enableTabs() {
    if (!this.isLoaded) return;
    if (!this.tabs) return;

    this.tabs.forEach(async tab => {
      await componentOnReady(tab);

      // In navigation mode, navigation is handled by the consumer's routing
      if (this.isNavigationMode) {
        return;
      }

      // Panel mode: set up ARIA relationships and event handlers
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
      this.currentActiveTab.classList.remove('active');
    
      if (!this.isNavigationMode) {
        this.currentActiveTab.setAttribute('aria-selected', 'false');
        this.currentActiveTab.setAttribute('tabindex', '-1');
      }
    }

    tab.classList.add('active');

    if (!this.isNavigationMode) {
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
    }

    this.currentActiveTab = tab;
  }

  private hidePanel(panelName: HTMLPostTabPanelElement['for']) {
    const previousPanel = this.getPanel(panelName);

    if (!previousPanel) return;

    this.hiding = fadeOut(previousPanel);
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

    this.showing = fadeIn(panel);
    this.showing.onfinish = () => {
      this.showing = null;
    };
  }

  private getPanel(name: string): HTMLPostTabPanelElement {
    return this.host.querySelector(`post-tab-panel[for=${name}]`);
  }

  private navigateTabs(tab: HTMLPostTabItemElement, key: 'ArrowRight' | 'ArrowLeft') {
    const activeTabIndex = Array.from(this.tabs).indexOf(tab);

    let nextTab: HTMLPostTabItemElement;
    if (key === 'ArrowRight') {
      nextTab = this.tabs[activeTabIndex + 1] || this.tabs[0];
    } else {
      nextTab = this.tabs[activeTabIndex - 1] || this.tabs[this.tabs.length - 1];
    }

    if (!nextTab) return;

    nextTab.focus();
  }

  render() {
    const TabsContainer = this.isNavigationMode ? 'nav' : 'div';

    return (
      <Host data-version={version}>
        <div class="tabs-wrapper" part="tabs">
          <TabsContainer
            class="tabs"
            role={this.isNavigationMode ? undefined : 'tablist'}
            aria-label={this.isNavigationMode ? this.label : undefined}
          >
            <slot onSlotchange={() => this.enableTabs()} />
          </TabsContainer>
        </div>
        {!this.isNavigationMode && (
          <div class="tab-content" part="content">
            <slot name="panels" onSlotchange={() => this.moveMisplacedTabs()} />
          </div>
        )}
      </Host>
    );
  }
}
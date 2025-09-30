import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';
import { fadeIn, fadeOut } from '@/animations';
import { componentOnReady } from '@/utils';

/**
 * @slot tabs - Slot for placing tab headers. Each tab header should be a <post-tab-header> element.
 * @slot default - Slot for placing tab panels. Each tab panel should be a <post-tab-panel> element.
 * @part tabs - The container element that holds the set of tabs.
 * @part content - The container element that displays the content of the currently active tab.
 */

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private currentActiveTab: HTMLPostTabHeaderElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;

  @State() isNavigationMode: boolean = false;

  private get tabs(): HTMLPostTabHeaderElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLPostTabHeaderElement>('post-tab-header'),
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
   * If not specified, it defaults to the first tab.
   *
   * **Changing this value after initialization has no effect.**
   */
  @Prop() readonly activeTab?: string;

  /**
   * When set to true, this property allows the tabs container to span the
   * full width of the screen, from edge to edge.
   */
  @Prop({ reflect: true }) fullWidth: boolean = false;

  /**
   * An event emitted after the active tab changes, when the fade in transition of its associated panel is finished.
   * The payload is the name of the newly active tab.
   */
  @Event() postChange: EventEmitter<string>;

  componentDidLoad() {
    this.detectMode();
    this.moveMisplacedTabs();
    this.enableTabs();

    const initiallyActiveTab = this.activeTab || this.tabs[0]?.getAttribute('name');
    void this.show(initiallyActiveTab);

    this.isLoaded = true;
  }

  private detectMode() {
    // Check if any tab headers contain anchor elements (via data-attribute exposure)
    const hasNavigationTabs = this.tabs.some(tab => 
      tab.getAttribute('data-navigation-mode') === 'true'
    );
    
    // Check if there are any panels
    const hasPanels = this.panels.length > 0;
    
    // Validate for mixed mode (error condition)
    if (hasNavigationTabs && hasPanels) {
      console.error('PostTabs: Mixed mode detected. Cannot use both navigation mode (anchor elements) and panel mode (post-tab-panel elements) at the same time.');
      return;
    }
    
    this.isNavigationMode = hasNavigationTabs;
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * In navigation mode, only updates the active tab state.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(tabName: string) {
    // do nothing if the tab is already active
    if (tabName === this.currentActiveTab?.getAttribute('name')) {
      return;
    }

    const previousTab = this.currentActiveTab;
    const newTab: HTMLPostTabHeaderElement = this.host.querySelector(
      `post-tab-header[name=${tabName}]`,
    );
    
    if (!newTab) {
      console.warn(`PostTabs: No tab found with name "${tabName}"`);
      return;
    }
    
    await this.activateTab(newTab);

    // In navigation mode, we don't need to handle panels
    if (this.isNavigationMode) {
      if (this.isLoaded) this.postChange.emit(this.currentActiveTab.getAttribute('name'));
      return;
    }

    // Panel mode logic
    // if a panel is currently being displayed, remove it from the view and complete the associated animation
    if (this.showing) {
      this.showing.effect['target'].style.display = 'none';
      this.showing.finish();
    }

    // hide the currently visible panel only if no other animation is running
    if (previousTab && !this.showing && !this.hiding) this.hidePanel(previousTab.getAttribute('name'));

    // wait for any hiding animation to complete before showing the selected tab
    if (this.hiding) await this.hiding.finished;

    this.showSelectedPanel();

    // wait for any display animation to complete for the returned promise to fully resolve
    if (this.showing) await this.showing.finished;

    if (this.isLoaded) this.postChange.emit(this.currentActiveTab.getAttribute('name'));
  }

  private moveMisplacedTabs() {
    if (!this.tabs) return;

    this.tabs.forEach(tab => {
      if (tab.getAttribute('slot') === 'tabs') return;
      tab.setAttribute('slot', 'tabs');
    });
  }

  private enableTabs() {
    if (!this.tabs) return;

    this.tabs.forEach(async tab => {
      await componentOnReady(tab);

      // Skip tab setup in navigation mode - anchors handle their own navigation
      if (this.isNavigationMode) {
        return;
      }

      // Panel mode: set up tab-panel relationships
      // if the tab has an "aria-controls" attribute it was already linked to its panel: do nothing
      if (tab.getAttribute('aria-controls')) return;

      const tabPanel = this.getPanel(tab.getAttribute('name'));
      if (tabPanel) {
        tab.setAttribute('aria-controls', tabPanel.id);
        tabPanel.setAttribute('aria-labelledby', tab.id);
      }

      tab.addEventListener('click', () => {
        void this.show(tab.getAttribute('name'));
      });

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void this.show(tab.getAttribute('name'));
        }
      });

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.navigateTabs(tab, e.key);
      });
    });

    // if the currently active tab was removed from the DOM then select the first one
    if (this.currentActiveTab && !this.currentActiveTab.isConnected) {
      void this.show(this.tabs[0]?.getAttribute('name'));
    }
  }

  private async activateTab(tab: HTMLPostTabHeaderElement) {
    // Deactivate previous tab
    if (this.currentActiveTab) {
      this.currentActiveTab.setAttribute('aria-selected', 'false');
      this.currentActiveTab.setAttribute('tabindex', '-1');
      this.currentActiveTab.classList.remove('active');
      
      // Remove aria-current from previous tab's anchor (navigation mode)
      const previousAnchor = this.currentActiveTab.querySelector('a');
      if (previousAnchor) {
        previousAnchor.removeAttribute('aria-current');
      }
    }

    // Activate new tab
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('active');
    
    // Set aria-current on new tab's anchor (navigation mode)
    const newAnchor = tab.querySelector('a');
    if (newAnchor) {
      newAnchor.setAttribute('aria-current', 'page');
    }

    this.currentActiveTab = tab;
  }

  private hidePanel(panelName: HTMLPostTabPanelElement['name']) {
    const previousPanel = this.getPanel(panelName);

    if (!previousPanel) return;

    this.hiding = fadeOut(previousPanel);
    this.hiding.onfinish = () => {
      previousPanel.style.display = 'none';
      this.hiding = null;
    };
  }

  private showSelectedPanel() {
    const panel = this.getPanel(this.currentActiveTab.getAttribute('name'));
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

  private navigateTabs(tab: HTMLPostTabHeaderElement, key: 'ArrowRight' | 'ArrowLeft') {
    const activeTabIndex = Array.from(this.tabs).indexOf(tab);

    let nextTab: HTMLPostTabHeaderElement;
    if (key === 'ArrowRight') {
      nextTab = this.tabs[activeTabIndex + 1] || this.tabs[0];
    } else {
      nextTab = this.tabs[activeTabIndex - 1] || this.tabs[this.tabs.length - 1];
    }

    if (!nextTab) return;

    nextTab.focus();
  }

  render() {
    const tabsRole = this.isNavigationMode ? undefined : 'tablist';
    const ariaLabel = this.isNavigationMode ? 'Tabs navigation' : undefined;
    const TabsContainer = this.isNavigationMode ? 'nav' : 'div';

    return (
      <Host data-version={version}>
        <div class="tabs-wrapper" part="tabs">
          <TabsContainer class="tabs" role={tabsRole} aria-label={ariaLabel}>
            <slot name="tabs" onSlotchange={() => this.enableTabs()} />
          </TabsContainer>
        </div>
        {!this.isNavigationMode && (
          <div class="tab-content" part="content">
            <slot onSlotchange={() => this.moveMisplacedTabs()} />
          </div>
        )}
      </Host>
    );
  }
}

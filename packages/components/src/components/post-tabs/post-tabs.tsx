import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
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
  private activeTabElement: HTMLPostTabHeaderElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;
  private mode: 'panels' | 'navigation' = 'panels';

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
  @Prop() readonly activeTab?: HTMLPostTabHeaderElement['name'];

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
    this.moveMisplacedTabs();
    this.detectMode();
    this.enableTabs();

    const initiallyActiveTab = this.activeTab || this.tabs[0]?.name;
    void this.show(initiallyActiveTab);

    this.isLoaded = true;
  }

  private detectMode() {
    const tabsWithAnchors = this.tabs.filter(tab => tab.querySelector('a'));
    const tabsWithoutAnchors = this.tabs.filter(tab => !tab.querySelector('a'));
    const hasPanels = this.panels.length > 0;

    // Check for mixed mode (error case)
    if (tabsWithAnchors.length > 0 && (tabsWithoutAnchors.length > 0 || hasPanels)) {
      console.error(
        'post-tabs: Mixed mode detected. Cannot mix tabs with anchors (navigation mode) and tabs with panels (panels mode). Please use either all anchors or all panels.',
      );
      return;
    }

    // Determine mode
    if (tabsWithAnchors.length > 0) {
      this.mode = 'navigation';
    } else {
      this.mode = 'panels';
    }
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * In navigation mode, only updates the active tab state.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(tabName: string) {
    if (this.mode === 'navigation') {
      this.setActiveTab(tabName);
      return;
    }

    // do nothing if the tab is already active
    if (tabName === this.activeTabElement?.name) {
      return;
    }

    const previousTab = this.activeTabElement;
    const newTab: HTMLPostTabHeaderElement = this.host.querySelector(
      `post-tab-header[name="${tabName}"]`,
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

    if (this.isLoaded) this.postChange.emit(this.activeTabElement.name);
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

      if (this.mode === 'navigation') {
        this.enableNavigationTab(tab);
      } else {
        this.enablePanelTab(tab);
      }

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.navigateTabs(tab, e.key);
      });
    });

    // if the currently active tab was removed from the DOM then select the first one
    if (this.activeTabElement && !this.activeTabElement.isConnected) {
      void this.show(this.tabs[0]?.name);
    }
  }

  private enableNavigationTab(tab: HTMLPostTabHeaderElement) {
    const anchor = tab.querySelector('a');
    
    if (!anchor) return;

    // For navigation mode, we don't prevent the default anchor behavior
    // The consumer handles routing, we just manage the active state
    
    tab.addEventListener('click', () => {
      this.setActiveTab(tab.name);
    });

    // Remove panel-related attributes for navigation mode
    tab.removeAttribute('aria-controls');
    tab.removeAttribute('role');
    
    // The anchor should handle focus, not the tab
    tab.setAttribute('tabindex', '-1');
  }

  private enablePanelTab(tab: HTMLPostTabHeaderElement) {
    // if the tab has an "aria-controls" attribute it was already linked to its panel: do nothing
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
  }

  private setActiveTab(tabName: string) {
    const newTab: HTMLPostTabHeaderElement = this.host.querySelector(
      `post-tab-header[name="${tabName}"]`,
    );
    
    if (!newTab) return;

    this.activateTabForNavigation(newTab);
  }

  private activateTabForNavigation(tab: HTMLPostTabHeaderElement) {
    // Remove active state from all tabs
    this.tabs.forEach(t => {
      t.classList.remove('active');
      const anchor = t.querySelector('a');
      if (anchor) {
        anchor.removeAttribute('aria-current');
      }
    });

    // Set active state for the new tab
    tab.classList.add('active');
    const anchor = tab.querySelector('a');
    if (anchor) {
      anchor.setAttribute('aria-current', 'page');
    }

    this.activeTabElement = tab;
  }

  private activateTab(tab: HTMLPostTabHeaderElement) {
    if (this.activeTabElement) {
      this.activeTabElement.setAttribute('aria-selected', 'false');
      this.activeTabElement.setAttribute('tabindex', '-1');
      this.activeTabElement.classList.remove('active');
    }

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('active');

    this.activeTabElement = tab;
  }

  private hidePanel(tabName: string) {
    const previousPanel = this.getPanel(tabName);

    if (!previousPanel) return;

    this.hiding = fadeOut(previousPanel);
    this.hiding.onfinish = () => {
      previousPanel.style.display = 'none';
      this.hiding = null;
    };
  }

  private showSelectedPanel() {
    const panel = this.getPanel(this.activeTabElement.name);
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
    return this.host.querySelector(`post-tab-panel[for="${name}"]`);
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
    const TabsContainer = this.mode === 'navigation' ? 'nav' : 'div';
    const tabsRole = this.mode === 'navigation' ? undefined : 'tablist';
    const ariaLabel = this.mode === 'navigation' ? 'Tabs navigation' : undefined;

    return (
      <Host data-version={version}>
        <div class="tabs-wrapper" part="tabs">
          <TabsContainer class="tabs" role={tabsRole} aria-label={ariaLabel}>
            <slot name="tabs" onSlotchange={() => this.onTabsSlotChange()} />
          </TabsContainer>
        </div>
        {this.mode === 'panels' && (
          <div class="tab-content" part="content">
            <slot onSlotchange={() => this.moveMisplacedTabs()} />
          </div>
        )}
      </Host>
    );
  }

  private onTabsSlotChange() {
    this.detectMode();
    this.enableTabs();
  }
}

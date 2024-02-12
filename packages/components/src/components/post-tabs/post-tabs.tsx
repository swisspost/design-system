import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { version } from '../../../package.json';
import { fadeIn, fadeOut } from '../../animations';

/**
 * @slot tabs - Slot for placing tab headers. Each tab header should be a <post-tab-header> element.
 * @slot default - Slot for placing tab panels. Each tab panel should be a <post-tab-panel> element.
 */

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private activeTab: HTMLPostTabHeaderElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;

  private get tabs(): NodeListOf<HTMLPostTabHeaderElement> {
    return this.host.querySelectorAll('post-tab-header');
  }

  @Element() host: HTMLPostTabsElement;

  /**
   * The name of the panel that is initially shown.
   * If not specified, it defaults to the panel associated with the first tab.
   *
   * **Changing this value after initialization has no effect.**
   */
  @Prop() readonly activePanel: HTMLPostTabPanelElement['name'];

  /**
   * An event emitted after the active tab changes, when the fade in transition of its associated panel is finished.
   * The payload is the name of the newly shown panel.
   */
  @Event() tabChange: EventEmitter<HTMLPostTabPanelElement['name']>;

  componentDidLoad() {
    this.moveMisplacedTabs();
    this.enableTabs();

    const initiallyActivePanel = this.activePanel || this.tabs.item(0).panel;
    void this.show(initiallyActivePanel);

    this.isLoaded = true;
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(panelName: string) {
    // do nothing if the tab is already active
    if (panelName === this.activeTab?.panel) {
      return;
    }

    const previousTab = this.activeTab;
    const newTab: HTMLPostTabHeaderElement = this.host.querySelector(
      `post-tab-header[panel=${panelName}]`,
    );
    this.activateTab(newTab);

    // if a panel is currently being displayed, remove it from the view and complete the associated animation
    if (this.showing) {
      this.showing.effect['target'].style.display = 'none';
      this.showing.finish();
    }

    // hide the currently visible panel only if no other animation is running
    if (previousTab && !this.showing && !this.hiding) {
      this.hidePanel(previousTab.panel);
    }

    // wait for any hiding animation to complete before showing the selected tab
    if (this.hiding) {
      await this.hiding.finished;
    }

    this.showSelectedPanel();

    // wait for any display animation to complete for the returned promise to fully resolve
    if (this.showing) {
      await this.showing.finished;
    }

    this.tabChange.emit(this.activeTab.panel);
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
      await tab.componentOnReady();

      const tabTitle = tab.shadowRoot.querySelector('.tab-title');

      // if the tab has an "aria-controls" attribute it was already linked to its panel: do nothing
      if (tabTitle.getAttribute('aria-controls')) return;

      const tabPanel = this.getPanel(tab.panel).shadowRoot.querySelector('.tab-pane');
      tabTitle.setAttribute('aria-controls', tabPanel.id);
      tabPanel.setAttribute('aria-labelledby', tabTitle.id);

      tab.addEventListener('click', () => {
        void this.show(tab.panel);
      });

      tab.addEventListener('keydown', ({ key }) => {
        if (key === 'ArrowRight' || key === 'ArrowLeft') this.navigateTabs(tab, key);
      });
    });

    // if the currently active tab was removed from the DOM then select the first one
    if (this.activeTab && !this.activeTab.isConnected) {
      void this.show(this.tabs.item(0).panel);
    }
  }

  private activateTab(tab: HTMLPostTabHeaderElement) {
    if (this.activeTab) {
      const tabTitle = this.activeTab.shadowRoot.querySelector('.tab-title');
      tabTitle.setAttribute('aria-selected', 'false');
      tabTitle.setAttribute('tabindex', '-1');
      tabTitle.classList.remove('active');
    }

    const tabTitle = tab.shadowRoot.querySelector('.tab-title');
    tabTitle.setAttribute('aria-selected', 'true');
    tabTitle.removeAttribute('tabindex');
    tabTitle.classList.add('active');

    this.activeTab = tab;
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
    const panel = this.getPanel(this.activeTab.panel);
    panel.style.display = 'block';

    // prevent the initially selected panel from fading in
    if (!this.isLoaded) return;

    this.showing = fadeIn(panel);
    this.showing.onfinish = () => {
      this.showing = null;
    };
  }

  private getPanel(name: string): HTMLPostTabPanelElement {
    return this.host.querySelector(`post-tab-panel[name=${name}]`);
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

    const nextTabTitle = nextTab.shadowRoot.querySelector('.tab-title') as HTMLAnchorElement;
    nextTabTitle.focus();
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="tabs-wrapper">
          <div class="tabs" role="tablist">
            <slot name="tabs" onSlotchange={() => this.enableTabs()} />
          </div>
        </div>
        <div class="tab-content">
          <slot onSlotchange={() => this.moveMisplacedTabs()} />
        </div>
      </Host>
    );
  }
}

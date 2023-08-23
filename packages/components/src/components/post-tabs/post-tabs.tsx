import { Component, Host, h, Element, Method, Event, EventEmitter, Prop, Listen } from '@stencil/core';
import { version } from '../../../package.json';
import { fadeIn, fadeOut } from '../../animations';

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

  private get firstTab(): HTMLPostTabHeaderElement {
    return this.host.querySelector('post-tab-header:first-child');
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

  async componentDidLoad() {
    const initiallyActivePanel = this.activePanel || this.firstTab.panel;
    await this.show(initiallyActivePanel);

    this.isLoaded = true;
  }

  @Listen('click', {})
  async onTabClick(event: Event) {
    if (event.target['tagName'] !== 'POST-TAB-HEADER') return;

    event.preventDefault();

    const tab = event.target as HTMLPostTabHeaderElement;
    await this.show(tab.panel);
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
    const newTab : HTMLPostTabHeaderElement = this.host.querySelector(`post-tab-header[panel=${panelName}]`);
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

  private activateTab(tab: HTMLPostTabHeaderElement) {
    if (this.activeTab) {
      const tabTitle = this.activeTab.shadowRoot.querySelector('.tab-title');
      tabTitle.setAttribute('aria-selected', 'false');
      tabTitle.classList.remove('active');
    }

    const tabTitle = tab.shadowRoot.querySelector('.tab-title');
    tabTitle.setAttribute('aria-selected', 'true');
    tabTitle.classList.add('active');

    this.activeTab = tab;
  }

  private hidePanel(panelName: HTMLPostTabPanelElement['name']) {
    const previousPanel = this.getPanel(panelName);

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
    return this.host.querySelector(
      `post-tab-panel[name=${name}]`
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="tabs-wrapper">
          <ul class="tabs nav" role="tablist">
            <slot name="tabs"/>
          </ul>
        </div>
        <div class="tab-content">
          <slot/>
        </div>
      </Host>
    );
  }
}

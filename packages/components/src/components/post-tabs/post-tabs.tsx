import { Component, Host, h, Element, Method, Event, EventEmitter } from '@stencil/core';
import { version } from '../../../package.json';

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private activeTab: HTMLPostTabHeaderElement;
  private panelTabMap = new Map<HTMLPostTabHeaderElement, HTMLPostTabPanelElement>;

  @Element() host: HTMLPostTabsElement;

  /**
   * An event emitted whenever a new tab becomes active.
   * The payload is the name of the associated panel.
   */
  @Event() tabChange: EventEmitter<string>;

  componentDidLoad() {
    const panels: HTMLPostTabPanelElement[] = Array.from(this.host.querySelectorAll('post-tab-panel'));
    panels.forEach(panel => {
      // map the panel to its associated tab
      const tab = this.host.querySelector(`post-tab-header[panel=${panel.name}]`);
      this.panelTabMap.set(tab as HTMLPostTabHeaderElement, panel);

      // remove the panel from the view: only the panel associated with the active tab will be shown
      panel.remove();
    });

    const tabs: HTMLPostTabHeaderElement[] = Array.from(this.panelTabMap.keys());
    tabs.forEach(tab => {
      // add event listener to change the active tab on click
      tab.addEventListener('click', e => {
        e.preventDefault();
        this.setActiveTab(tab);
      });

      // move every post-tab-header element to the "tabs" slot
      if (tab.getAttribute('slot') !== 'tabs') {
        tab.setAttribute('slot', 'tabs');
      }
    });

    // activate the tab set as active or the first tab by default
    const activeTab = tabs.find(tab => tab.active) || tabs[0];
    this.setActiveTab(activeTab);
  }

  private setActiveTab(tab: HTMLPostTabHeaderElement) {
    if (this.activeTab) {
      this.deactivateTab(this.activeTab);
    }

    this.activeTab = tab;
    this.activateTab(this.activeTab);
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(panelName: number) {
    const tab = this.host.querySelector(`post-tab-header[panel=${panelName}]`);
    this.setActiveTab(tab as HTMLPostTabHeaderElement);
  }

  private activateTab(tab: HTMLPostTabHeaderElement) {
    const tabTitle = tab.shadowRoot.querySelector('.tab-title');
    tabTitle.setAttribute('aria-selected', 'true');
    tabTitle.classList.add('active');

    const panel = this.panelTabMap.get(tab);
    this.host.shadowRoot.querySelector('.tab-content').appendChild(panel);

    this.tabChange.emit(panel.name);
  }

  private deactivateTab(tab: HTMLPostTabHeaderElement) {
    const tabTitle = tab.shadowRoot.querySelector('.tab-title');
    tabTitle.setAttribute('aria-selected', 'false');
    tabTitle.classList.remove('active');

    const panel = this.panelTabMap.get(tab);
    panel.remove();
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

import { Component, Element, Event, EventEmitter, Host, h, Listen, State, Watch } from '@stencil/core';
import { checkContainsOnly, checkLength } from '../../utils';

let nextIndex = 0;

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private defaultId = `post-tabs-${nextIndex++}`;
  private panelsByTab: Map<HTMLPostTabHeaderElement, HTMLPostTabPanelElement>;

  @Element() host: HTMLPostTabsElement;

  @State() activeTab: HTMLPostTabHeaderElement;

  @Watch('activeTab')
  emitTabChange(newActiveTab: HTMLPostTabHeaderElement, oldActiveTab: HTMLPostTabHeaderElement | undefined) {
    if (oldActiveTab && newActiveTab !== oldActiveTab) {
      this.tabChange.emit(this.tabs.findIndex(tab => tab === this.activeTab));
    }
  }

  @State() tabs: HTMLPostTabHeaderElement[];

  @Watch('tabs')
  validateTabs() {
    checkLength(this.tabs, {min: 1}, 'The post-tabs element requires at least one post-tab-header as a child.');
    checkContainsOnly(this.tabs, el => el.tagName === 'POST-TAB-HEADER', 'All post-tabs children with a "slot" attribute set to "tab" must be post-tab-header elements.');

    const panels = Array.from(this.host.querySelectorAll('[slot="panel"]'));
    checkContainsOnly(panels, el => el.tagName === 'POST-TAB-PANEL', 'All post-tabs children with a "slot" attribute set to "panel" must be post-tab-panel elements.');
    checkContainsOnly(this.tabs, el => el.nextElementSibling.tagName === 'POST-TAB-PANEL', 'Tab headers and tab panels do not match. Be sure to add a post-tab-panel immediately after each post-tab-header element.');

    this.panelsByTab = new Map(this.tabs.map(tab => [tab, tab.nextElementSibling as HTMLPostTabPanelElement]));
    this.activeTab = this.getActiveTab();
  }

  /**
   * An event emitted after the active nav changes. The payload is the index of the newly active tab.
   */
  @Event() tabChange: EventEmitter<number>;

  connectedCallback() {
    this.tabs = Array.from(this.host.querySelectorAll('[slot="tab"]'));
  }

  @Listen('activated')
  onTabActivated(event: CustomEvent<void>) {
    const activatedTab = event.target as HTMLPostTabHeaderElement;

    this.activeTab.deactivate().then(() => {
      this.activeTab = activatedTab;
    });

    this.panelsByTab.get(this.activeTab).hide().then(() => {
      this.panelsByTab.get(activatedTab).show();
    });
  }

  private getActiveTab(): HTMLPostTabHeaderElement {
    const activeTabs = this.tabs.filter(tab => tab.active);
    checkLength(activeTabs, {max: 1}, 'There should only be one post-tab-header with an "active" prop set to "true" per post-tabs element.');

    if (activeTabs.length === 0) {
      const firstTab = this.tabs[0];
      firstTab.active = true;
      return firstTab;
    }

    return activeTabs[0];
  }

  render() {
    return (
      <Host id={this.host.id || this.defaultId}>
        <div class="tabs-wrapper">
          <ul class="tabs nav" role="tablist">
            <slot name="tab"/>
          </ul>
        </div>
        <div class="tab-content">
          <slot name="panel"/>
        </div>
      </Host>
    );
  }
}

import { Component, Host, h, Element, Method, Event, EventEmitter, Prop } from '@stencil/core';
import { version } from '../../../package.json';
import { fadeIn, fadeOut } from '../../animations';

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  private panelsByName = new Map<HTMLPostTabPanelElement['name'], HTMLPostTabPanelElement>;
  private activeTab: HTMLPostTabHeaderElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;

  private get tabContainer(): HTMLElement {
    return this.host.shadowRoot.querySelector('.tab-content');
  }

  private get tabs(): NodeListOf<HTMLPostTabHeaderElement> {
    return this.host.querySelectorAll('post-tab-header');
  }

  private get panels(): NodeListOf<HTMLPostTabPanelElement> {
    return this.host.querySelectorAll('post-tab-panel');
  }

  @Element() host: HTMLPostTabsElement;

  /**
   * The name of the panel that is initially shown.
   * If not specified, it defaults to the panel associated with the first tab.
   */
  @Prop() readonly activePanel: HTMLPostTabPanelElement['name'];

  /**
   * An event emitted after the active tab changes, when the fade in transition of its associated panel is finished.
   * The payload is the name of the newly shown panel.
   */
  @Event() tabChange: EventEmitter<HTMLPostTabPanelElement['name']>;

  async componentWillLoad() {
    this.panels.forEach(panel => {
      // save the panels by name to easily retrieve them later
      this.panelsByName.set(panel.name, panel);

      // remove all panels from the view
      panel.remove();
    });

    this.tabs.forEach(tab => {
      // add an event listener on the tabs so that they are activated on click
      tab.addEventListener('click', async e => {
        e.preventDefault();
        await this.show(tab.panel);
      });

      // move each post-tab-header element to the "tabs" slot if it's not already there
      if (tab.getAttribute('slot') !== 'tabs') {
        tab.setAttribute('slot', 'tabs');
      }
    });
  }

  async componentDidLoad() {
    const initiallyActivePanel = this.activePanel || this.tabs.item(0).panel;
    await this.show(initiallyActivePanel);

    this.isLoaded = true;
  }

  /**
   * Shows the panel with the given name and selects its associated tab.
   * Any other panel that was previously shown becomes hidden and its associated tab is unselected.
   */
  @Method()
  async show(panelName: string) {
    const previousTab = this.activeTab;
    const newTab : HTMLPostTabHeaderElement = this.host.querySelector(`post-tab-header[panel=${panelName}]`);
    this.activateTab(newTab);

    // if a panel is currently being displayed, remove it from the view and complete the associated animation
    if (this.showing) {
      this.showing.effect['target'].remove();
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
    const previousPanel = this.panelsByName.get(panelName);

    this.hiding = fadeOut(previousPanel);
    this.hiding.onfinish = () => {
      previousPanel.remove();
      this.hiding = null;
    };
  }

  private showSelectedPanel() {
    const panel = this.panelsByName.get(this.activeTab.panel);
    this.tabContainer.appendChild(panel);

    // prevent the initially selected panel from fading in
    if (!this.isLoaded) return;

    this.showing = fadeIn(panel);
    this.showing.onfinish = () => {
      this.showing = null;
    };
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

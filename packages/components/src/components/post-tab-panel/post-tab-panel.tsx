import { Component, Element, h, Method, State, Watch } from '@stencil/core';
import { checkExists, getChildIndex, onTransitionEnd } from '../../utils';

@Component({
  tag: 'post-tab-panel',
  styleUrl: 'post-tab-panel.scss',
  shadow: true,
})
export class PostTabPanel {
  private tabPanelElement: HTMLElement;

  @Element() host: HTMLPostTabPanelElement;

  @State() isShown = true;
  @State() tabIndex: number;

  @State() associatedHeader: HTMLPostTabHeaderElement;

  @Watch('associatedHeader')
  initPanelVisibility(associatedHeader: HTMLPostTabHeaderElement) {
    if (!associatedHeader.active) {
      this.isShown = false;
      this.host.remove();
    }
  }

  @State() tabGroup: HTMLPostTabsElement;

  @Watch('tabGroup')
  validateTabGroup(newValue: HTMLPostTabsElement | undefined) {
    checkExists(newValue, 'The post-tab-panel should be contained in a post-tabs element.');
  }

  componentWillLoad() {
    this.tabIndex = getChildIndex(this.host, 'post-tab-panel');
    this.tabGroup = this.host.closest('post-tabs');
    this.associatedHeader = this.host.previousElementSibling as HTMLPostTabHeaderElement;
  }

  componentDidLoad() {
    this.tabPanelElement = this.host.shadowRoot.querySelector('.tab-pane');
  }

  /**
   * Shows the tab panel programmatically.
   */
  @Method()
  async show() {
    this.associatedHeader.insertAdjacentElement('afterend', this.host);
    setTimeout(() => {
      // use a timeout for the transition to run correctly
      this.isShown = true;
    });
  }

  /**
   * Hides the tab panel programmatically.
   */
  @Method()
  async hide() {
    this.isShown = false;
    await onTransitionEnd(this.tabPanelElement).then(() => {
      this.host.remove();
    });
  }

  render() {
    return (
      <div
        aria-labelledby={`${this.tabGroup.id}--tab-${this.tabIndex}`}
        class={`tab-pane fade active ${this.isShown ? 'show' : ''}`}
        id={`${this.tabGroup.id}--panel-${this.tabIndex}`}
        role="tabpanel"
      >
        <slot/>
      </div>
    );
  }
}

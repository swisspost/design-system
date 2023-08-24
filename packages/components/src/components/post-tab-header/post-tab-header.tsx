import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '../../../package.json';
import { checkNonEmpty } from '../../utils';

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})
export class PostTabHeader {
  @Element() host: HTMLPostTabHeaderElement;

  @State() tabId: string;

  /**
   * The name of the panel controlled by the tab header.
   */
  @Prop() readonly panel: HTMLPostTabPanelElement['name'];

  @Watch('panel')
  validateFor(newValue: HTMLPostTabPanelElement['name']) {
    checkNonEmpty(newValue, 'The "panel" prop is required for the post-tab-header.');
  }

  componentWillLoad() {
    this.tabId = `tab-${this.host.id || crypto.randomUUID()}`;
  }

  render() {
    return (
      <Host data-version={version}>
        <li class="nav-item">
          <a
            aria-selected="false"
            class="tab-title nav-link"
            href="#"
            id={this.tabId}
            role="tab"
          >
            <slot/>
          </a>
        </li>
      </Host>
    );
  }
}

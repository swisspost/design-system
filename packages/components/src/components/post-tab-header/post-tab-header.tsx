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

  @State() panelId: string;

  /**
   * The name of the panel controlled by the tab header.
   */
  @Prop() readonly panel: string;

  @Watch('panel')
  validateFor(newValue) {
    checkNonEmpty(newValue, 'The "panel" prop is required for the post-tab-header.');
  }

  componentDidLoad() {
    // get the id of the associated panel or use a random id by default
    const panel = this.host.parentNode.querySelector(`post-tab-panel[name=${this.panel}]`);
    this.panelId = panel?.id || crypto.randomUUID();
  }

  render() {
    return (
      <Host data-version={version}>
        <li class="nav-item">
          <a
            aria-controls={`${this.panelId}--panel`}
            aria-selected="false"
            class="tab-title nav-link"
            href=""
            id={`${this.panelId}--tab`}
            role="tab"
          >
            <slot/>
          </a>
        </li>
      </Host>
    );
  }
}

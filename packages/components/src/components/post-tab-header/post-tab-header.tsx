import { Component, h, Prop, Watch } from '@stencil/core';
import { checkNonEmpty } from '../../utils';

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})
export class PostTabHeader {
  /**
   * The name of the panel controlled by the tab header.
   */
  @Prop() readonly panel: string;

  @Watch('panel')
  validateFor(newValue) {
    checkNonEmpty(newValue, 'The "panel" prop is required for the post-tab-header.');
  }

  render() {
    return (
      <li class="nav-item">
        <a
          aria-controls={`${this.panel}--panel`}
          aria-selected="false"
          class="tab-title nav-link"
          href=""
          id={`${this.panel}--tab`}
          role="tab"
        >
          <slot/>
        </a>
      </li>
    );
  }
}

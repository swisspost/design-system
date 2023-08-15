import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'post-tab-panel',
  styleUrl: 'post-tab-panel.scss',
  shadow: true,
})
export class PostTabPanel {
  @Element() host: HTMLPostTabPanelElement;

  /**
   * The name of the panel, used to associate it with a tab header.
   */
  @Prop() readonly name: string;

  render() {
    return (
      <div
        aria-labelledby={`${this.name}--tab`}
        class="tab-pane fade active show"
        id={`${this.name}--panel`}
        role="tabpanel"
      >
        <slot/>
      </div>
    );
  }
}

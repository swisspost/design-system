import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '../../../package.json';

/**
 * @slot default - Content to place in the `default` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content" target="_blank">inline content</a>.</p><p class="alert alert-info alert-sm">If set, it overrides the components `text` property.</p>
 */
@Component({
  tag: 'post-tag',
  styleUrl: 'post-tag.scss',
  shadow: true,
})
export class PostTag {
  @Element() host: HTMLPostTagElement;

  @State() classes: string;

  /**
   * Defines the color variant of the component.
   */
  @Prop() readonly variant: 'gray' | 'white' | 'info' | 'success' | 'error' | 'warning' | 'yellow' =
    'gray';

  /**
   * Defines the size of the component.
   */
  @Prop() readonly size: null | 'sm' = null;

  /**
   * Defines the icon `name` inside of the component.
   * <span className="alert alert-sm alert-info">If not set the icon will not show up.</span>
   * To learn which icons are available, please visit our <a href="/?path=/docs/5704bdc4-c5b5-45e6-b123-c54d01fce2f1--docs" target="_blank">icon library</a>.
   */
  @Prop() readonly icon: null | string = null;

  /**
   * Defines the text of the component.
   * Most of the time this will fit your needs, if you need to add custom content, use the default slot instead.
   */
  @Prop() readonly text: string;

  constructor() {
    this.setClasses = this.setClasses.bind(this);
  }

  @Watch('variant')
  variantChanged() {
    this.setClasses();
  }

  @Watch('size')
  sizeChanged() {
    this.setClasses();
  }

  private setClasses() {
    this.classes = ['tag', this.size ? `tag-${this.size}` : null, `bg-${this.variant}`]
      .filter(c => c !== null)
      .join(' ');
  }

  connectedCallback() {
    this.setClasses();
  }

  render() {
    return (
      <Host data-version={version}>
        <div class={this.classes}>
          {this.icon ? <post-icon name={this.icon} class="tag-icon"></post-icon> : null}
          <div class="tag-text">
            <slot>{this.text}</slot>
          </div>
        </div>
      </Host>
    );
  }
}

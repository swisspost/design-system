import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Content to place in the `default` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a>.</p>
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
  @Prop() readonly variant: 'white' | 'info' | 'success' | 'error' | 'warning' | 'yellow';

  /**
   * Defines the size of the component.
   */
  @Prop() readonly size: null | 'sm' = null;

  /**
   * Defines the icon `name` inside of the component.
   * <span className="banner banner-sm banner-info">If not set the icon will not show up.</span>
   * To learn which icons are available, please visit our <a href="/?path=/docs/5704bdc4-c5b5-45e6-b123-c54d01fce2f1--docs">icon library</a>.
   */
  @Prop() readonly icon: null | string = null;

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
    this.classes = [
      'tag',
      this.size ? `tag-${this.size}` : null,
      this.variant ? `tag-${this.variant}` : null,
    ]
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
          {this.icon ? <post-icon name={this.icon}></post-icon> : null}
          <div class="tag-text">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

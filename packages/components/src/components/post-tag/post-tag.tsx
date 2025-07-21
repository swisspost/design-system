import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrOneOf, checkEmptyOrType } from '@/utils';

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
  @Prop() readonly variant?: 'white' | 'info' | 'success' | 'error' | 'warning' | 'yellow';

  /**
   * Defines the size of the component.
   */
  @Prop() readonly size?: 'sm';

  /**
   * Defines the icon `name` inside of the component.
   * <span className="banner banner-sm banner-info">If not set the icon will not show up.</span>
   * To learn which icons are available, please visit our <a href="/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs">icon library</a>.
   */
  
  @Prop() readonly icon?: string;


  constructor() {
    this.setClasses = this.setClasses.bind(this);
  }
  @Watch('variant')
  variantChanged() {
    checkEmptyOrOneOf(this, 'variant', ['white', 'info', 'success', 'error', 'warning', 'yellow']);
    this.setClasses();
  }

  @Watch('size')
  sizeChanged() {
    checkEmptyOrOneOf(this, 'size', ['sm']);
    this.setClasses();
  }

  @Watch('icon')
  validateName() {
    checkEmptyOrType(this, 'icon', 'string');
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

  componentWillLoad() {
    this.validateName();
    this.variantChanged();
    this.sizeChanged();
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

import { Element, Component, Host, h, State, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Content to place in the `default` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a>.</p>
 */
@Component({
  tag: 'post-button',
  styleUrl: 'post-button.scss',
  shadow: true,
})
export class PostButton {
  @Element() host: HTMLPostButtonElement;

  @State() classes: string;

  /**
   * Defines the variant of the component.
   */
  @Prop() readonly variant: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /**
   * Defines the size of the component.
   */
  @Prop() readonly size: null | 'sm' | 'rg' | 'md' | 'lg' = 'md';

  /**
   * Defines the icon `name` inside of the component.
   * <span className="alert alert-sm alert-info">If not set the icon will not show up.</span>
   * To learn which icons are available, please visit our <a href="/?path=/docs/5704bdc4-c5b5-45e6-b123-c54d01fce2f1--docs">icon library</a>.
   */
  @Prop() readonly icon: null | string = null;

  /**
   * Defines where icon and loading spinner should be placed.
   */
  @Prop() readonly iconPosition: 'start' | 'end' = null;

  /**
   * Defines if the button should only display the icon.
   * The slot content will be placed in a visually hidden span.
   */
  @Prop() readonly iconOnly: boolean;

  /**
   * Defines if the button is in a loading state.
   * Icon will be replaced by a loading spinner and the button will be disabled.
   */
  @Prop() readonly loading: boolean;

  /**
   * Defines if the button should have an animation.
   */
  @Prop() readonly animated: null | 'start' | 'end' = null;

  /**
   * Defines if the button is disabled.
   */
  @Prop() readonly disabled: boolean;

  /**
   * Defines if the button should be focused on the first render.
   *
   */
  @Prop() readonly autofocus: boolean;

  /**
   * Defines the form the button belongs to.
   */
  @Prop() readonly form: null | string = null;

  /**
   * Defines the URL the form is submitted to.
   */
  @Prop() readonly formaction: null | string = null;

  /**
   * Defines the encoding type for the form.
   */
  @Prop() readonly formenctype: null | string = null;

  /**
   * Defines the HTTP method for the form.
   */
  @Prop() readonly formmethod: null | string = null;

  /**
   * Defines if the form should be validated when submitted.
   */
  @Prop() readonly formnovalidate: boolean;

  /**
   * Defines where to display the response after submitting the form.
   */
  @Prop() readonly formtarget: null | string = null;

  /**
   * Defines the name of the button.
   */
  @Prop() readonly name: null | string = null;

  /**
   * Defines the target of the popover.
   */
  @Prop() readonly popovertarget: null | string = null;

  /**
   * Defines the action of the popover target.
   */
  @Prop() readonly popovertargetaction: null | string = null;

  /**
   * Defines the type of the button.
   */
  @Prop() readonly type: null | 'button' | 'reset' | 'submit' = null;

  /**
   * Defines the value of the button.
   */
  @Prop() readonly value: null | string = null;

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

  @Watch('iconOnly')
  iconChanged() {
    this.setClasses();
  }

  @Watch('animated')
  animatedChanged() {
    this.setClasses();
  }

  private animationClass() {
    if (this.animated === 'start') return 'btn-animated-start';
    if (this.animated === 'end') return 'btn-animated';
    return null;
  }

  private setClasses() {
    this.classes = [
      'btn',
      this.animationClass(),
      this.size ? `btn-${this.size}` : null,
      this.variant ? `btn-${this.variant}` : null,
      this.iconOnly ? 'btn-icon' : null,
    ]
      .filter(c => c !== null)
      .join(' ');
  }

  connectedCallback() {
    this.setClasses();
  }

  render() {
    const startSection = this.getStartSection();
    const endSection = this.getEndSection();

    return (
      <Host data-version={version}>
        <button
          class={this.classes}
          disabled={this.disabled || this.loading}
          autofocus={this.autofocus}
          form={this.form}
          formaction={this.formaction}
          formenctype={this.formenctype}
          formmethod={this.formmethod}
          formnovalidate={this.formnovalidate}
          formtarget={this.formtarget}
          name={this.name}
          popoverTarget={this.popovertarget}
          popoverTargetAction={this.popovertargetaction}
          type={this.type}
          value={this.value}
        >
          {startSection}
          <span class={this.iconOnly ? 'visually-hidden' : undefined}>
            <slot />
          </span>
          {endSection}
        </button>
      </Host>
    );
  }

  private getStartSection() {
    if (this.iconPosition !== 'start' && this.iconPosition !== null) return null;
    if (this.loading) {
      return this.getLoader();
    }
    if (!this.icon) {
      return null;
    }
    return <post-icon name={this.icon} />;
  }

  private getEndSection() {
    if (this.iconPosition !== 'end') return null;
    if (this.loading) {
      return this.getLoader();
    }
    if (!this.icon) {
      return null;
    }
    return <post-icon name={this.icon} />;
  }

  private getLoader() {
    return (
      <div
        class="loader loader-16 d-inline-block"
        role="status"
        aria-live="polite"
        aria-hidden="true"
      ></div>
    );
  }
}

import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { checkEmptyOrOneOf, checkType } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';
import { SWITCH_MODES, SwitchMode } from './switch-modes';

@Component({
  tag: 'post-language-option-switch',
  styleUrl: 'post-language-option-switch.scss',
  shadow: true,
})
export class PostLanguageOptionSwitch {
  @Element() host: HTMLPostLanguageOptionSwitchElement;

  /**
   * A title for the list
   */
  @Prop() caption: string;

  @Watch('caption')
  validateCaption(value = this.caption) {
    checkType(
      value,
      'string',
      'The "caption" property of the post-language-option-switch component must be a string.',
    );
  }

  /**
   * A descriptive text for the list
   */
  @Prop() description: string;

  @Watch('description')
  validateDescription(value = this.description) {
    checkType(
      value,
      'string',
      'The "description" property of the post-language-option-switch component must be a string.',
    );
  }

  /**
   * Variant that determines the rendering of the language switch either as a list (used on mobile in the header) or a dropdown (used on desktop in the header)
   */
  @Prop() variant: SwitchVariant = 'list';

  @Watch('variant')
  validateVariant(value = this.variant) {
    checkEmptyOrOneOf(
      value,
      SWITCH_VARIANTS,
      `The "variant" property of the post-language-option-switch component must be:  ${SWITCH_VARIANTS.join(
        ', ',
      )}`,
    );
  }

  /**
   * Mode determines if the language-switch navigates to a different page or just emits events
   */
  @Prop() mode: SwitchMode = 'link';

  @Watch('mode')
  validateMode(value = this.mode) {
    checkEmptyOrOneOf(
      value,
      SWITCH_MODES,
      `The "mode" property of the post-language-option-switch component must be:  ${SWITCH_MODES.join(
        ', ',
      )}`,
    );
  }

  private elements: NodeListOf<HTMLPostLanguageOptionElement>;

  componentWillRender() {
    this.elements = this.host.querySelectorAll('post-language-option');
    console.log('befoerles slottedElements', this.elements);
  }

  componentDidLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateMode();
    this.validateVariant();
  }
  connectedCallback() {
    console.log('called');
    this.getSlottedItems();
  }

  private getSlottedItems() {
    const slot = this.host.shadowRoot.querySelectorAll('slot');
    //const slottedElements = slot ? slot.assignedElements() : [];

    console.log('les slottedElements', slot, this.host.shadowRoot);
  }

  render() {
    return (
      <Host data-version={version}>
        {this.variant === 'list' ? (
          <post-list>
            <h3>
              {this.caption}, {this.description}
            </h3>
            <slot>
              {this.elements.forEach(item => {
                <post-list-item>{item}</post-list-item>;
              })}
            </slot>
          </post-list>
        ) : (
          <div>
            <div>
              <post-menu-trigger for="post-language-menu">
                <button class="btn btn-primary">{this.caption}</button>
              </post-menu-trigger>
              <post-menu id="post-language-menu">
                <post-menu-item>test</post-menu-item>
              </post-menu>
            </div>
          </div>
        )}
      </Host>
    );
  }
}

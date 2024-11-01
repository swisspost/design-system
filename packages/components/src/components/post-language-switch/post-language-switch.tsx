import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { checkEmptyOrOneOf, checkType } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';
import { SWITCH_MODES, SwitchMode } from './switch-modes';

@Component({
  tag: 'post-language-switch',
  styleUrl: 'post-language-switch.scss',
  shadow: true,
})
export class PostLanguageSwitch {
  @Element() host: HTMLPostLanguageSwitchElement;

  //variant: list (default)|dropdown determines the rendering of the language switch either as a list (used on mobile in the header) or a dropdown (used on desktop in the header)
  /**
   * A title for the list
   */
  @Prop() caption: string;

  @Watch('caption')
  validateCaption(value = this.caption) {
    checkType(
      value,
      'string',
      'The "caption" property of the post-language-switch component must be a string.',
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
      'The "description" property of the post-language-switch component must be a string.',
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
      `The "variant" property of the post-language-switch component must be:  ${SWITCH_VARIANTS.join(
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
      `The "mode" property of the post-language-switch component must be:  ${SWITCH_MODES.join(
        ', ',
      )}`,
    );
  }

  componentDidLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateMode();
    this.validateVariant();
  }

  render() {
    return (
      <Host data-version={version}>
        {this.variant === 'list' ? (
          <ul>
            <h3>
              {this.caption}, {this.description}
            </h3>
            <slot></slot>
          </ul>
        ) : (
          <div>
            <div>
              <button>
                {this.caption}, {this.description}
              </button>
            </div>
            <div>
              <ul>
                <h3>{this.caption}</h3>
                <slot></slot>
              </ul>
            </div>
          </div>
        )}
      </Host>
    );
  }
}

import { Component, Element, Host, h, Prop, Watch, State } from '@stencil/core';
import { checkEmptyOrOneOf, checkType } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';

@Component({
  tag: 'post-language-switch',
  styleUrl: 'post-language-switch.scss',
  shadow: true,
})
export class PostLanguageSwitch {
  @Element() host: HTMLPostLanguageSwitchElement;

  /**
   * A title for the list of language options
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
   * The name of the language switch, which will be used on the dropdown as an ID
   */
  @Prop() name: string;

  @Watch('name')
  validateName(value = this.name) {
    checkType(
      value,
      'string',
      'The "name" property of the post-language-switch component must be a string.',
    );
  }

  /**
   * A descriptive text for the list of language options
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
   * The active language of the language switch
   */
  @State() activeLang: string;

  /**
   * List of post-language-option in the slot of the component
   */
  private elements: NodeListOf<HTMLPostLanguageOptionElement>;

  private menuId: string;

  connectedCallback() {
    // Transforms name into an ID for the post-menu
    this.menuId = this.name.replace(/\W/g, '_');

    this.elements = this.host.querySelectorAll('post-language-option:not([generated="true"])');
    this.elements.forEach(el => {
      if (el.getAttribute('active') !== 'false') {
        this.activeLang = el.getAttribute('code');
      }
    });
  }

  componentDidLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateVariant();
    this.validateName();

    // Detects a change in the active language
    this.host.addEventListener('postChange', (el: CustomEvent<string>) => {
      this.activeLang = el.detail;

      // Hides the dropdown when an option has been clicked
      if (this.variant === 'dropdown') {
        const menu = this.host.querySelector('post-menu') as HTMLPostMenuElement;
        menu.toggle(menu);
      }
    });
  }

  private renderList() {
    return (
      <Host
        data-version={version}
        aria-label={`${this.caption}, ${this.description}`}
        aria-role="list"
      >
        <slot></slot>
      </Host>
    );
  }

  private renderDropdown() {
    return (
      <Host data-version={version}>
        <post-menu-trigger for={this.menuId}>
          <button
            class="btn btn-tertiary btn-sm"
            aria-label={`${this.caption}, ${this.description}`}
          >
            {this.activeLang.toUpperCase()}
            <post-icon aria-hidden="true" name="2052"></post-icon>
          </button>
        </post-menu-trigger>
        <post-menu id={this.menuId}>
          <slot></slot>
        </post-menu>
      </Host>
    );
  }

  render() {
    return this.variant === 'list' ? this.renderList() : this.renderDropdown();
  }
}

import { Component, Element, Host, h, Prop, Watch, State } from '@stencil/core';
import { checkEmptyOrOneOf, checkType } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';
import { nanoid } from 'nanoid';

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

  connectedCallback() {
    // Get the active language based on children's active state
    this.activeLang = Array.from(this.host.querySelectorAll('post-language-option'))
      .find(el => el.getAttribute('active') == 'true')
      .getAttribute('code');

    this.updateChildrenVariant();
  }

  // Update post-language-option variant to have the correct style
  private updateChildrenVariant() {
    this.host.querySelectorAll('post-language-option').forEach(el => {
      const isActive = el.getAttribute('active') === 'false';
      if (this.variant === 'list' || (this.variant === 'menu' && isActive)) {
        el.setAttribute('variant', this.variant);
      } else {
        el.removeAttribute('variant');
      }
    });
  }

  componentWillUpdate() {
    this.updateChildrenVariant();
  }

  componentDidLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateVariant();

    // Detects a change in the active language
    this.host.addEventListener('postChange', (el: CustomEvent<string>) => {
      this.activeLang = el.detail;

      // Update the active state in the children post-language-option components
      this.host.querySelectorAll('post-language-option').forEach(lang => {
        if (lang.code && lang.code === this.activeLang) {
          lang.setAttribute('active', 'true');
        } else {
          lang.setAttribute('active', 'false');
        }
      });

      // Hides the dropdown when an option has been clicked
      if (this.variant === 'menu') {
        this.updateChildrenVariant();
        const menu = this.host.shadowRoot.querySelector('post-menu') as HTMLPostMenuElement;
        menu.toggle(menu);
      }
    });
  }

  private menuId = `p${nanoid(11)}`;

  private renderList() {
    return (
      <Host data-version={version} aria-role="list">
        <span aria-label={`${this.caption}, ${this.description}`}>
          {this.activeLang.toUpperCase()}
        </span>
        <slot></slot>
      </Host>
    );
  }

  private renderDropdown() {
    return (
      <Host data-version={version}>
        <post-menu-trigger for={this.menuId}>
          <button class="post-language-switch-trigger" aria-label={this.description}>
            {this.activeLang.toUpperCase()}
            <post-icon aria-hidden="true" name="chevrondown"></post-icon>
          </button>
        </post-menu-trigger>
        <post-menu
          id={this.menuId}
          class="post-language-switch-dropdown-container"
          aria-label={this.caption}
        >
          <slot></slot>
        </post-menu>
      </Host>
    );
  }

  render() {
    return this.variant === 'list' ? this.renderList() : this.renderDropdown();
  }
}

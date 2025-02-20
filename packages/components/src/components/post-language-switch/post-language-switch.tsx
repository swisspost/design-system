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
  validateCaption() {
    checkType(this, 'caption', 'string');
  }

  /**
   * A descriptive text for the list of language options
   */
  @Prop() description: string;

  @Watch('description')
  validateDescription() {
    checkType(this, 'description', 'string');
  }

  /**
   * Whether the component is rendered as a list or a menu
   */
  @Prop() variant: SwitchVariant = 'list';

  @Watch('variant')
  validateVariant() {
    checkEmptyOrOneOf(this, 'variant', SWITCH_VARIANTS);
  }

  /**
   * The active language of the language switch
   */
  @State() activeLang: string;

  connectedCallback() {
    this.updateChildrenVariant();

    // Get the active language based on children's active state
    const activeLanguageOption = this.host.querySelector(
      'post-language-option[active]:not([active="false"])',
    );

    if (activeLanguageOption) this.activeLang = activeLanguageOption.getAttribute('code');
  }

  // Update post-language-option variant to have the correct style
  private updateChildrenVariant() {
    this.host.querySelectorAll('post-language-option').forEach(el => {
      el.setAttribute('variant', this.variant);
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
        const menu = this.host.shadowRoot.querySelector('post-menu') as HTMLPostMenuElement;
        menu.toggle(menu);
      }
    });
  }

  private menuId = `p${nanoid(11)}`;

  private renderList() {
    return (
      <Host data-version={version} role="list" aria-label={this.caption}>
        <span aria-label={this.description} role="listitem">
          {this.activeLang}
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
            {this.activeLang}
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

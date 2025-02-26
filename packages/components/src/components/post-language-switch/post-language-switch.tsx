import { Component, Element, Host, h, Prop, Watch, State, Listen } from '@stencil/core';
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
    this.updateChildrenVariant();
  }

  /**
   * The active language of the language switch
   */
  @State() activeLang: string;

  componentDidLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateVariant();

    setTimeout(() => {
      const triggerEl = this.host.shadowRoot.querySelector('.post-language-switch-trigger') as HTMLElement;
      console.log(triggerEl);
      if (triggerEl) {
        const width = triggerEl.getBoundingClientRect().width;
        this.host.style.setProperty('--language-switch-trigger-width', `${width}px`);
      }
    }, 300);

    // Initially set variants and active language
    // Handles cases where the language-switch is rendered after the language-options have been rendered
    this.updateChildrenVariant();
    this.updateActiveLanguage();
  }

  @Listen('postChange')
  handlePostChange(event: CustomEvent<string>) {
    this.activeLang = event.detail;

    // Update the active state in the children post-language-option components
    this.languageOptions.forEach(lang => {
      if (lang.code && lang.code === this.activeLang) {
        lang.setAttribute('active', '');
      } else {
        lang.removeAttribute('active');
      }
    });

    // Hides the dropdown when an option has been clicked
    if (this.variant === 'menu') {
      const menu = this.host.shadowRoot.querySelector('post-menu') as HTMLPostMenuElement;
      menu.hide();
    }
  }

  /**
   * Handles cases where the language switch is being rendered before options are available
   * @param event Initially emitted by <post-langauge-option>
   */
  @Listen('postLanguageOptionInitiallyActive')
  handleInitiallyActive(event: CustomEvent<string>) {
    this.activeLang = event.detail;
  }

  private get languageOptions() {
    return this.host.querySelectorAll('post-language-option');
  }

  private get activeLanguageOption() {
    return this.host.querySelector('post-language-option[active]:not([active="false"])');
  }

  private handleSlotChange() {
    this.updateActiveLanguage();
  }

  private updateActiveLanguage() {
    this.activeLang = this.activeLanguageOption.getAttribute('code');
  }

  // Update post-language-option variant to have the correct style
  private updateChildrenVariant() {
    this.languageOptions.forEach(el => {
      el.setAttribute('variant', this.variant);
    });
  }

  private menuId = `p${nanoid(11)}`;

  private renderList() {
    return (
      <Host data-version={version} role="list" aria-label={this.caption}>
        <div class="post-language-switch-list" role="group" aria-label={this.description}>
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </div>
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
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </post-menu>
      </Host>
    );
  }

  render() {
    return this.variant === 'list' ? this.renderList() : this.renderDropdown();
  }
}

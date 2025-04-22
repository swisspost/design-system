import { Component, Element, Host, h, Prop, Watch, State, Listen } from '@stencil/core';
import { checkEmptyOrOneOf, checkType, eventGuard } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';
import { nanoid } from 'nanoid';

@Component({
  tag: 'post-language-switch',
  styleUrl: 'post-language-switch.scss',
  shadow: true,
})
export class PostLanguageSwitch {
  private readonly menuId = `p${nanoid(11)}`;
  private get languageOptions(): HTMLPostLanguageOptionElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLPostLanguageOptionElement>('post-language-option'),
    );
  }

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

    // Initially set variants and active language
    // Handles cases where the language-switch is rendered after the language-options have been rendered
    this.updateChildrenVariant();
  }

  /**
   * Listen for the postChange event and guard it to run only for events originating from a <post-language-option> element.
   */
  @Listen('postChange')
  handlePostChange(event: CustomEvent<string>) {
    eventGuard(
      this.host,
      event,
      { targetLocalName: 'post-language-option', delegatorSelector: 'post-language-switch' },
      () => {
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
          const menu = this.host.shadowRoot.querySelector<HTMLPostMenuElement>('post-menu');
          menu.hide();
        }
      },
    );
  }

  /**
   * Handles cases where the language switch is being rendered before options are available
   * @param event Initially emitted by <post-langauge-option>
   */
  @Listen('postLanguageOptionInitiallyActive')
  handleInitiallyActive(event: CustomEvent<string>) {
    this.activeLang = event.detail;
  }

  // Update post-language-option variant to have the correct style
  private updateChildrenVariant() {
    this.languageOptions.forEach(el => {
      el.setAttribute('variant', this.variant);
    });
  }

  private renderList() {
    return (
      <Host data-version={version} role="list" aria-label={this.caption}>
        <div class="post-language-switch-list" role="group" aria-label={this.description}>
          <slot></slot>
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
          <slot></slot>
        </post-menu>
      </Host>
    );
  }

  render() {
    return this.variant === 'list' ? this.renderList() : this.renderDropdown();
  }
}

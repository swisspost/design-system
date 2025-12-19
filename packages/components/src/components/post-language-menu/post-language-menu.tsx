import { Component, Element, Host, h, Prop, Watch, State, Listen } from '@stencil/core';
import { checkRequiredAndType, checkEmptyOrOneOf, EventFrom } from '@/utils';
import { version } from '@root/package.json';
import { SWITCH_VARIANTS, SwitchVariant } from './switch-variants';
import { nanoid } from 'nanoid';

@Component({
  tag: 'post-language-menu',
  styleUrl: 'post-language-menu.scss',
  shadow: true,
})
export class PostLanguageMenu {
  private readonly menuId = `p${nanoid(11)}`;
  private readonly listSpanId = `list-span-${nanoid(11)}`;
  private get languageOptions(): HTMLPostLanguageMenuItemElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLPostLanguageMenuItemElement>('post-language-menu-item'),
    );
  }

  @Element() host: HTMLPostLanguageMenuElement;

  /**
   * A title for the list of language options
   */
  @Prop({ reflect: true }) caption!: string;

  @Watch('caption')
  validateCaption() {
    checkRequiredAndType(this, 'caption', 'string');
  }

  /**
   * A descriptive text for the list of language options
   */
  @Prop({ reflect: true }) description!: string;

  @Watch('description')
  validateDescription() {
    checkRequiredAndType(this, 'description', 'string');
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
   * Listen for the postChange event and guard it to run only for events originating from a <post-language-menu-item> element.
   */
  @Listen('postChange')
  @EventFrom('post-language-menu-item')
  handlePostChange(event: CustomEvent<string>) {
    this.activeLang = event.detail;

    // Update the active state in the children post-language-menu-item components
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
  }

  /**
   * Handles cases where the language switch is being rendered before options are available
   * @param event Initially emitted by <post-language-menu-item>
   */
  @Listen('postLanguageMenuItemInitiallyActive')
  handleInitiallyActive(event: CustomEvent<string>) {
    this.activeLang = event.detail;
  }

  // Update post-language-menu-item variant to have the correct style
  private updateChildrenVariant() {
    this.languageOptions.forEach(el => {
      el.setAttribute('variant', this.variant);
    });
  }

  private renderList() {
    return (
      <Host data-version={version}>
        <div
          class="post-language-menu-list"
          role="list"
          aria-label={this.caption}
          aria-describedby={this.listSpanId}
        >
          <span id={this.listSpanId} class="visually-hidden">
            {this.description}
          </span>
          <slot></slot>
        </div>
      </Host>
    );
  }

  private renderDropdown() {
    return (
      <Host data-version={version}>
        <post-menu-trigger for={this.menuId}>
          <button class="post-language-menu-trigger">
            {this.activeLang}
            <span class="visually-hidden">{this.caption}</span>
            <span class="visually-hidden">{this.description}</span>
            <post-icon aria-hidden="true" name="chevrondown"></post-icon>
          </button>
        </post-menu-trigger>
        <post-menu
          id={this.menuId}
          class="post-language-menu-dropdown-container"
          label={this.caption}
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

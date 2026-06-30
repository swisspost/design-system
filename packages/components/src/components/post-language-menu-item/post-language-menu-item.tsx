import { OneOf, Required, Type, Url } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { SWITCH_VARIANTS, SwitchVariant } from '../post-language-menu/switch-variants';

/**
 * @slot default - Slot for placing the content inside the anchor or button.
 */
@Component({
  tag: 'post-language-menu-item',
  styleUrl: 'post-language-menu-item.scss',
})
export class PostLanguageMenuItem {
  @Element() host: HTMLPostLanguageMenuItemElement;

  /**
   *  The ISO 639 language code, formatted according to [RFC 5646 (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646). For example, "de".
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  code!: string;

  /**
   * If set to `true`, the language option is considered the current language for the page.
   */
  @Prop({ mutable: true, reflect: true }) active?: boolean;

  /**
   * To communicate the variant prop from the parent (post-language-menu) component to the child (post-language-menu-item) component. See parent docs for a description about the property itself.
   */
  @Prop()
  @OneOf(SWITCH_VARIANTS)
  variant?: SwitchVariant;

  /**
   * The full name of the language. For example, "Deutsch".
   */
  @Prop()
  @Type('string')
  name?: string;

  /**
   * A description for the language read by screen-readers for improved accessibility.
   */
  @Prop()
  @Type('string')
  description?: string;

  /**
   * The URL used for the href attribute of the internal anchor.
   * This field is optional; if not provided, a button will be used internally instead of an anchor.
   */
  @Prop()
  @Url()
  url?: string;

  componentDidLoad() {
    if (!this.name && this.isNameRequired()) {
      throw new Error(
        'The "name" property of the post-language-menu-item component is required when the full language name is not displayed.',
      );
    }
  }

  /**
   * An event emitted when the language option is clicked. The payload is the ISO 639 code of the language.
   */
  @Event() postChange: EventEmitter<string>;

  /**
   * Selects the language option programmatically.
   */
  @Method()
  async select() {
    this.active = true;
    this.emitChange();
  }

  private emitChange() {
    this.postChange.emit(this.code);
  }

  private isNameRequired(): boolean {
    return this.host.textContent.toLowerCase() === this.code.toLowerCase();
  }

  render() {
    const lang = this.code.toLowerCase();
    const emitOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.emitChange();
      }
    };

    const interactiveElement = this.url ? (
      <a
        aria-current={this.active ? 'page' : undefined}
        href={this.url}
        hrefLang={lang}
        lang={lang}
        aria-description={this.description}
        onClick={() => this.emitChange()}
        onKeyDown={emitOnKeyDown}
      >
        <slot />
        <span class="visually-hidden">{this.name}</span>
      </a>
    ) : (
      <button
        aria-current={this.active ? 'true' : undefined}
        lang={lang}
        aria-description={this.description}
        onClick={() => this.emitChange()}
        onKeyDown={emitOnKeyDown}
      >
        <slot />
        <span class="visually-hidden">{this.name}</span>
      </button>
    );

    return this.variant === 'list' ? (
      <Host data-version={version} role="listitem">
        {interactiveElement}
      </Host>
    ) : (
      <Host data-version={version}>
        <post-menu-item>{interactiveElement}</post-menu-item>
      </Host>
    );
  }
}

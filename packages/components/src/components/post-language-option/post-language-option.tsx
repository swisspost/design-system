import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Method,
  Prop,
  Watch,
} from '@stencil/core';
import {
  checkEmptyOrType,
  checkRequiredAndType,
  checkEmptyOrOneOf,
  checkEmptyOrUrl,
} from '@/utils';
import { version } from '@root/package.json';
import { SwitchVariant, SWITCH_VARIANTS } from '../post-language-switch/switch-variants';

/**
 * @slot default - Slot for placing the content inside the anchor or button.
 */
@Component({
  tag: 'post-language-option',
  styleUrl: 'post-language-option.scss',
})
export class PostLanguageOption {
  @Element() host: HTMLPostLanguageOptionElement;

  /**
   *  The ISO 639 language code, formatted according to [RFC 5646 (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646). For example, "de".
   */
  @Prop() code!: string;

  @Watch('code')
  validateCode() {
    checkRequiredAndType(this, 'code', 'string');
  }

  /**
   * If set to `true`, the language option is considered the current language for the page.
   */
  @Prop({ mutable: true, reflect: true }) active?: boolean;

  /**
   * To communicate the variant prop from the parent (post-language-switch) component to the child (post-language-option) component. See parent docs for a description about the property itself.
   */
  @Prop() variant?: SwitchVariant;

  @Watch('variant')
  validateVariant() {
    checkEmptyOrOneOf(this, 'variant', SWITCH_VARIANTS);
  }

  /**
   * The full name of the language. For example, "Deutsch".
   */
  @Prop() name?: string;

  @Watch('name')
  validateName() {
    checkEmptyOrType(this, 'name', 'string');
  }

  /**
   * The URL used for the href attribute of the internal anchor.
   * This field is optional; if not provided, a button will be used internally instead of an anchor.
   */
  @Prop() url?: string;

  @Watch('url')
  validateUrl() {
    checkEmptyOrUrl(this, 'url');
  }

  componentDidLoad() {
    this.validateCode();
    this.validateName();
    this.validateUrl();

    if (!this.name && this.isNameRequired()) {
      throw new Error(
        'The "name" property of the post-language-option component is required when the full language name is not displayed.',
      );
    }

    if (this.active) {
      this.postLanguageOptionInitiallyActive.emit(this.code);
    }
  }

  /**
   * An event emitted when the language option is clicked. The payload is the ISO 639 code of the language.
   */
  @Event() postChange: EventEmitter<string>;

  /**
   * An event emitted when the language option is initially active. The payload is the ISO 639 code of the language.
   */
  @Event() postLanguageOptionInitiallyActive: EventEmitter<string>;

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
    const role = this.variant === 'menu' ? 'menuitem' : undefined;
    const emitOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.emitChange();
      }
    };

    return (
      <Host data-version={version}>
        {this.url ? (
          <a
            role={role}
            aria-current={this.active ? 'page' : undefined}
            href={this.url}
            hrefLang={lang}
            lang={lang}
            onClick={() => this.emitChange()}
            onKeyDown={emitOnKeyDown}
          >
            <slot />
            <span class="visually-hidden">{this.name}</span>
          </a>
        ) : (
          <button
            role={role}
            aria-current={this.active ? 'true' : undefined}
            lang={lang}
            onClick={() => this.emitChange()}
            onKeyDown={emitOnKeyDown}
          >
            <slot />
            <span class="visually-hidden">{this.name}</span>
          </button>
        )}
      </Host>
    );
  }
}

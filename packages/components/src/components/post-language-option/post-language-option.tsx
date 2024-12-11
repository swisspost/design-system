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
import { checkEmptyOrType, checkType } from '@/utils';
import { version } from '@root/package.json';
import { SwitchVariant } from '../post-language-switch/switch-variants';

/**
 * @slot default - Slot for placing the content inside the anchor or button.
 */
@Component({
  tag: 'post-language-option',
  styleUrl: 'post-language-option.scss',
  shadow: true,
})
export class PostLanguageOption {
  @Element() host: HTMLPostLanguageOptionElement;

  /**
   *  The ISO 639 language code, formatted according to [RFC 5646 (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646). For example, "de".
   */
  @Prop() code!: string;

  @Watch('code')
  validateCode(value = this.code) {
    checkType(
      value,
      'string',
      'The "code" property of the post-language-option component must be a string.',
    );
  }

  /**
   * If set to `true`, the language option is considered the current language for the page.
   */
  @Prop({ mutable: true, reflect: true }) active: boolean;

  @Watch('active')
  validateActiveProp(value = this.active) {
    checkEmptyOrType(
      value,
      'boolean',
      'The "active" property of the post-language-option component must be a boolean value.',
    );
  }

  /**
   * The variant of the post-language-switch parent (dynamically set by the parent)
   */
  @Prop() variant?: SwitchVariant | null;

  /**
   * The full name of the language. For example, "Deutsch".
   */
  @Prop() name: string;

  @Watch('name')
  validateName(value = this.name) {
    checkEmptyOrType(
      value,
      'string',
      'The "name" property of the post-language-option component must be a string.',
    );
  }

  /**
   * The URL used for the href attribute of the internal anchor.
   * This field is optional; if not provided, a button will be used internally instead of an anchor.
   */
  @Prop() url: string;

  @Watch('url')
  validateUrl(value = this.url) {
    checkEmptyOrType(
      value,
      'string',
      'The "url" property of the post-language-option component must be a valid URL.',
    );
  }

  componentDidLoad() {
    this.validateCode();
    this.validateActiveProp();
    this.validateName();
    this.validateUrl();

    if (!this.name && this.isNameRequired()) {
      throw new Error(
        'The "name" property of the post-language-option component is required when the full language name is not displayed.',
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

    return (
      <Host data-version={version} role="listitem">
        {this.url ? (
          <a
            class={this.variant ? `post-language-option-${this.variant}` : ''}
            aria-current={this.active ? 'page' : undefined}
            aria-label={this.name}
            href={this.url}
            hrefLang={lang}
            lang={lang}
            onClick={() => this.emitChange()}
          >
            <slot />
          </a>
        ) : (
          <button
            class={this.variant ? `post-language-option-${this.variant}` : ''}
            aria-current={this.active ? 'true' : undefined}
            aria-label={this.name}
            lang={lang}
            onClick={() => this.emitChange()}
          >
            <slot />
          </button>
        )}
      </Host>
    );
  }
}

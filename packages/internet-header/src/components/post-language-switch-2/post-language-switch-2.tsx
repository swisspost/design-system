import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';
import { state } from '../../data/store';
import { DropdownEvent, HasDropdown, NavLangEntity } from '../../models/header.model';
import { elementHasTransition, userPrefersReducedMotion } from '../../services/ui.service';
import { translate } from '../../services/language.service';
import { PostLanguageSwitchList } from './components/post-language-switch-list';
import { IAvailableLanguage } from '../../models/language.model';

@Component({
  tag: 'post-language-switch-2',
  styleUrl: 'post-language-switch-2.scss',
  shadow: true,
})
export class PostLanguageSwitch2 implements HasDropdown {
  /**
   * Visualization of the language switch.
   * Possible values: 'dropdown' | 'list'
   */
  @Prop() mode: 'dropdown' | 'list';
  @State() langSwitchOpen = false;
  @Element() host: HTMLPostLanguageSwitch2Element;
  /**
   * Fires when the dropdown has been toggled.
   */
  @Event() dropdownToggled: EventEmitter<DropdownEvent>;
  /**
   * Fires when the language has been changed.
   */
  @Event({ bubbles: true }) languageChanged: EventEmitter<string>;
  private languageSwitchDropdown: HTMLElement | undefined;

  componentWillUpdate() {
    // Check if language switch got set to close and if mode is dropdown
    if (this.languageSwitchDropdown && !this.langSwitchOpen && this.mode == 'dropdown') {
      this.languageSwitchDropdown.classList.remove('open');

      // Check if element has transition applied and whether user prefers to see animations or not
      if (
        elementHasTransition(this.languageSwitchDropdown, 'transform') &&
        !userPrefersReducedMotion()
      ) {
        // Wait for CSS transition 'transform' to end before continuing
        return new Promise<boolean>(resolve => {
          this.languageSwitchDropdown?.addEventListener('transitionend', event => {
            if (event.propertyName === 'transform') {
              resolve(true);
            }
          });
        });
      }
    }
  }

  componentDidUpdate() {
    // Language switch got set to open
    if (this.languageSwitchDropdown && this.langSwitchOpen) {
      // Force browser to redraw/refresh DOM before adding 'open' class
      this.languageSwitchDropdown.getBoundingClientRect();
      this.languageSwitchDropdown.classList.add('open');
    }
  }

  /**
   * Open or close the language switch programatically
   * @param force Boolean to force a state
   * @returns Boolean indicating new state
   */
  @Method()
  async toggleDropdown(force?: boolean) {
    this.langSwitchOpen = force ?? !this.langSwitchOpen;
    this.dropdownToggled.emit({ open: this.langSwitchOpen, element: this.host });
    return this.langSwitchOpen;
  }

  /**
   * Emit a language change to the parent component
   *
   * @param newLang Config of the new language
   */
  private switchLanguage(newLang: NavLangEntity) {
    this.languageChanged.emit(newLang.lang);
    this.toggleDropdown(false);
  }

  private getMergedLanguageConfig(config: NavLangEntity[], overrides?: IAvailableLanguage[]) {
    if (overrides === undefined) {
      return config;
    }

    return config.map(langConfig =>
      Object.assign(
        {},
        langConfig,
        overrides.find(l => l.lang === langConfig.lang),
      ),
    );
  }

  private setDropdownRef(element: HTMLElement | undefined) {
    this.languageSwitchDropdown = element;
  }

  render() {
    if (state.localizedConfig?.header === undefined) return;
    const config = state.localizedConfig.header;
    const mergedConfig = this.getMergedLanguageConfig(
      config.navLang,
      state.languageSwitchOverrides,
    );

    return (
      <Host>
        <div class={`language-switch ${this.mode}`}>
          <SvgSprite />
          {this.mode === 'dropdown' ? (
            <button
              class="lang-btn"
              aria-expanded={`${this.langSwitchOpen}`}
              aria-haspopup="listbox"
              onClick={() => this.toggleDropdown()}
            >
              <span class="visually-hidden">
                {config.translations.navLangAriaLabel}, {translate('Current language is English')}
              </span>
              <span aria-hidden="true">{state.currentLanguage}</span>
              <SvgIcon name="pi-arrow-down" classNames={this.langSwitchOpen ? 'rotated' : ''} />
            </button>
          ) : (
            <span class="bold current-language">
              <span class="visually-hidden">{translate('Current language is English')}</span>
              <span>{state.currentLanguage}</span>
            </span>
          )}
          {this.langSwitchOpen || this.mode === 'list' ? (
            <PostLanguageSwitchList
              navLang={mergedConfig}
              switchLanguage={e => this.switchLanguage(e)}
              dropdownRef={e => e !== undefined && this.setDropdownRef(e)}
            />
          ) : null}
        </div>
      </Host>
    );
  }
}

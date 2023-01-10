import {
  Component,
  Event,
  Host,
  h,
  Method,
  EventEmitter,
  State,
  Prop,
  Element,
} from '@stencil/core';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';
import { state } from '../../data/store';
import {
  DropdownElement,
  DropdownEvent,
  HasDropdown,
  NavLangEntity,
} from '../../models/header.model';
import { userPrefersReducedMotion, elementHasTransition } from '../../services/ui.service';
import { translate } from '../../services/language.service';
import { PostLanguageSwitchList } from './components/post-language-switch-list';

@Component({
  tag: 'post-language-switch',
  styleUrl: 'post-language-switch.scss',
  shadow: true,
})
export class PostLanguageSwitch implements HasDropdown {
  @Prop() mode: 'dropdown' | 'list';
  @State() langSwitchOpen = false;
  @Element() host: DropdownElement;
  @Event() dropdownToggled: EventEmitter<DropdownEvent>;
  @Event({ bubbles: true }) languageChanged: EventEmitter<string>;
  private languageSwitchDropdown: HTMLElement;

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
          this.languageSwitchDropdown.addEventListener('transitionend', event => {
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
  switchLanguage(newLang: NavLangEntity) {
    this.languageChanged.emit(newLang.lang);
    this.toggleDropdown(false);
  }

  /**
   *
   * @param baseNavLang
   * @returns
   */
  getMergedLanguageConfig() {
    const { navLang } = state.localizedConfig.header;
    if (state.languageSwitchOverrides === null) {
      return navLang;
    }

    return navLang.map(langConfig =>
      Object.assign(
        {},
        langConfig,
        state.languageSwitchOverrides.find(l => l.lang === langConfig.lang),
      ),
    );
  }

  render() {
    const config = state.localizedConfig.header;
    const mergedConfig = this.getMergedLanguageConfig();

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
              <span class="visually-hidden">{config.translations.navLangAriaLabel}</span>
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
              switchLanguage={lang => this.switchLanguage(lang)}
              dropdownRef={e => (this.languageSwitchDropdown = e)}
            />
          ) : null}
        </div>
      </Host>
    );
  }
}

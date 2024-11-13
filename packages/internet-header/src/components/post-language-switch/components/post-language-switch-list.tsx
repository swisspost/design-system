import { h } from '@stencil/core';
import { NavLangEntity } from '../../../models/header.model';
import { translate } from '../../../services/language.service';
import { state } from '../../../data/store';

export const PostLanguageSwitchList = (props: {
  navLang: NavLangEntity[];
  switchLanguage: (lang: NavLangEntity) => void;
  dropdownRef: (element: HTMLElement | undefined) => void;
}) => {
  if (state.localizedConfig?.header === undefined) return;
  const config = state.localizedConfig.header;

  return (
    <nav
      class="language-switch-dropdown"
      ref={e => props.dropdownRef(e)}
      aria-label={config.translations.navLangAriaLabel}
    >
      <ul aria-label={translate('Change language')}>
        {props.navLang
          .filter(lang => !lang.isCurrent)
          .map(lang => {
            const TagName = lang.url !== null ? 'a' : 'button';
            return (
              <li key={lang.lang}>
                <TagName
                  onClick={() => props.switchLanguage(lang)}
                  href={lang.url}
                  lang={lang.lang}
                  title={lang.title}
                >
                  <span class="visually-hidden">{lang.title}</span>
                  <span aria-hidden="true">{lang.text}</span>
                </TagName>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

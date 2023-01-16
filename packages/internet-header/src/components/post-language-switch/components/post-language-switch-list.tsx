import { h } from '@stencil/core';
import { NavLangEntity } from '../../../models/header.model';
import { translate } from '../../../services/language.service';

export const PostLanguageSwitchList = (props: {
  navLang: NavLangEntity[];
  switchLanguage: (lang: NavLangEntity) => void;
  dropdownRef: (element: HTMLElement | undefined) => void;
}) => (
  <nav class="language-switch-dropdown" ref={e => props.dropdownRef(e)}>
    <h3 class="visually-hidden">{translate('Change language')}</h3>
    <ul>
      {props.navLang
        .filter(lang => !lang.isCurrent)
        .map(lang => {
          const TagName = lang.url === null ? 'button' : 'a';
          return (
            <li>
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

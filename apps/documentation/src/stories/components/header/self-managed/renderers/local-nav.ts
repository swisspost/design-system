import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { getSubComponentRenderers } from '../utils/get-sub-component-renderers';
import { isApplicationHeader } from '../utils/is-application-header';
import { renderUserMenu } from './user-menu';

export function renderLocalNav(args: Args) {
  const { renderLanguageMenu } = getSubComponentRenderers({});

  const loginButton = html`
    <a href="">
      <span>Login</span>
      <post-icon name="login"></post-icon>
    </a>
  `;

  return html`
    <!-- Local navigation -->
    <ul slot="local-nav">
      ${args.languageMenu && isApplicationHeader(args)
        ? html`<li>${renderLanguageMenu({ omitSlot: true })}</li>`
        : nothing}
      <li>
        <a href="#">
          <span>Search</span>
          <post-icon aria-hidden="true" name="search"></post-icon>
        </a>
      </li>
      <li class="local-login">${args.isLoggedIn ? renderUserMenu() : loginButton}</li>
    </ul>
  `;
}

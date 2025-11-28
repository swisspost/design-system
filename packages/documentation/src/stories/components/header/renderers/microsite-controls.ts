import { Args } from '@storybook/web-components-vite';
import { html } from 'lit';
import { renderUserMenu } from '@/stories/components/header/renderers/user-menu';

export function renderMicrositeControls(args: Args) {
  const loginButton = html`
    <a href="">
      <span>Login</span>
      <post-icon name="login"></post-icon>
    </a>
  `;

  return html`
    <!-- Custom controls (optional) -->
    <ul slot="local-nav">
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

import { html } from 'lit';

export function renderNavigationControls() {
  return html`
    <!-- Navigation controls -->
    <ul slot="navigation-controls">
      <li>
        <a href="">
          Jobs Search
          <post-icon name="search" aria-hidden="true"></post-icon>
        </a>
      </li>
      <li>
        <a href="">
          Jobs Login
          <post-icon name="login" aria-hidden="true"></post-icon>
        </a>
      </li>
    </ul>
  `;
}

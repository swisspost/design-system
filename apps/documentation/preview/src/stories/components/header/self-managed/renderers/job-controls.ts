import { html } from 'lit';

export function renderJobControls() {
  return html`
    <!-- Navigation controls -->
    <ul slot="local-nav">
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

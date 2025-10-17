import { html } from 'lit';

export function renderMetaNavigation() {
  return html`
    <!-- Meta navigation -->
    <ul slot="meta-navigation">
      <li>
        <a href="">
          Jobs
          <post-icon name="jobs" aria-hidden="true"></post-icon>
        </a>
      </li>
      <li>
        <a href="">
          Create Account
          <post-icon name="adduser" aria-hidden="true"></post-icon>
        </a>
      </li>
    </ul>
  `;
}

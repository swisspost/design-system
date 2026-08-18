import { html } from 'lit';

export function renderLoginLink() {
  return html`
    <!-- Global header login link -->
    <a href="" slot="post-login">
      <span>Login</span>
      <post-icon name="login"></post-icon>
    </a>
  `;
}

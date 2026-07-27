import { html } from 'lit';

export function renderLogo() {
  return html`
    <!-- Logo -->
    <post-logo slot="post-logo" url="/">Homepage</post-logo>
  `;
}

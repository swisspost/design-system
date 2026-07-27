import { html } from 'lit';

export function renderGlobalNavPrimary() {
  return html`
    <!-- Primary global navigation (remains in the global header on tablet & mobile) -->
    <a href="" slot="global-nav-primary">
      <span>Search</span>
      <post-icon aria-hidden="true" name="search"></post-icon>
    </a>
  `;
}

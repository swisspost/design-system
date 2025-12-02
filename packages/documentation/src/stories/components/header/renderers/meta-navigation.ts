import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

export function renderMetaNavigation(args: Args) {
  return html`
    <!-- Meta navigation -->
    <ul slot="global-nav-secondary">
      <li>
        <a href="" aria-current=${args.jobs ? 'location' : nothing}>
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

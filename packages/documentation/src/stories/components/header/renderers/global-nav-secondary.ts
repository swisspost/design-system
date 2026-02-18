import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

export function renderGlobalNavSecondary(args: Args) {
  const jobsLink = html`
    <a
      href=""
      slot=${args.jobs ? 'global-nav-secondary' : nothing}
      aria-current=${args.jobs ? 'location' : nothing}
    >
      Jobs
      <post-icon name="jobs" aria-hidden="true"></post-icon>
    </a>
  `;

  if (args.jobs) return jobsLink;

  return html`
    <!-- Global secondary navigation -->
    <ul slot="global-nav-secondary">
      <li>${jobsLink}</li>
      <li>
        <a href="">
          Create Account
          <post-icon name="adduser" aria-hidden="true"></post-icon>
        </a>
      </li>
    </ul>
  `;
}

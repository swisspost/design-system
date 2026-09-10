import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

export function renderGlobalNavSecondary(args: Args) {
  const comment = html`<!-- Secondary global navigation (moves to the bottom of the burger menu on tablet & mobile) -->`;

  const jobsLink = html`
    <a
      href=""
      slot=${args.jobs ? 'global-nav-secondary' : nothing}
      aria-current=${args.jobs ? 'location' : nothing}
    >
      Career
      <post-icon name="rocket" aria-hidden="true"></post-icon>
    </a>
  `;

  if (args.jobs) return html` ${comment} ${jobsLink} `;

  return html`
    ${comment}
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

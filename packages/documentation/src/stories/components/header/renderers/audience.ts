import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

export function renderAudience(args: Args) {
  return html`
    <!-- Target Group / Audience -->
    <ul slot="audience">
      <li>
        <a href="#" aria-current=${args.jobs ? nothing : 'location'}>Private customers</a>
      </li>
      <li>
        <a href="#">Business customers</a>
      </li>
    </ul>
  `;
}

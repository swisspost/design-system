import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

export function renderTargetGroup(args: Args) {
  return html`
    <!-- Target Group -->
    <ul slot="target-group">
      <li>
        <a href="#" class=${args.jobs ? nothing : 'active'}>Private customers</a>
      </li>
      <li>
        <a href="#">Business customers</a>
      </li>
    </ul>
  `;
}

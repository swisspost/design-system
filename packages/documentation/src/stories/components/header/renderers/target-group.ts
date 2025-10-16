import { html } from 'lit';

export function renderTargetGroup() {
  return html`
    <!-- Target Group -->
    <ul slot="target-group" class="target-group">
      <li>
        <a href="#" class=${args.jobs ? nothing : 'active'}>Private customers</a>
      </li>
      <li>
        <a href="#">Business customers</a>
      </li>
    </ul>
  `;
}

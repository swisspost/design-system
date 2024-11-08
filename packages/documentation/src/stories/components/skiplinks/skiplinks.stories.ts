import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '2fc3b456-19ba-4ede-b1bc-499518f829b1',
  title: 'Components/Skiplinks',
  tags: ['package:HTML'],
  render: renderSkiplinks,
};

export default meta;

type Story = StoryObj;

export function renderSkiplinks() {
  return html`
    <div class="skiplinks">
      <a href="#navigation" target="_self">Navigation</a>
      <a href="#main-content" target="_self">Main</a>
    </div>
    <div id="navigation" role="navigation">
      Navigation
      <ul>
        <li>
          <a href="#">Link</a>
        </li>
      </ul>
    </div>
    <div id="main-content" role="main" tabindex="-1">
      Main content
      <ul>
        <li>
          <a href="#">Link</a>
        </li>
      </ul>
    </div>
  `;
}

export const Default: Story = {};

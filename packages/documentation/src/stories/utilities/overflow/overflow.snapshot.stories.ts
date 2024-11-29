import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './overflow.stories';
import './overflow.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Overflow: Story = {
  render: () => {
    return html`
      <div class="overflow-example">
        <h1>Overflow</h1>
        ${getContent('Overflow', 'overflow')} ${getContent('Overflow X', 'overflow-x')}
        ${getContent('Overflow Y', 'overflow-y')}
      </div>
    `;
  },
};

function getContent(title: string, property: string) {
  return html`
    <h2>${title}</h2>
    <div class="py-16">
      ${['auto', 'hidden', 'scroll', 'visible'].map((value: string) => {
        return html`
          <p>${title}: ${value}</p>
          <div class="snapshot-container ${property}-${value}">
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.</div>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}

import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './display.stories';
import { displayOptions } from './display.docs.mdx';
import './display.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Display: Story = {
  render: () => {
    return html`
      <div class="display-example">
        ${displayOptions.map(
          display => html`
            <div class="display-container p-8">
              <div class="d-${display} p-8">${display}</div>
              <div class="d-${display} p-8">${display}</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

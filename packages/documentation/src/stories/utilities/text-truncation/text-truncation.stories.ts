import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '83fd4b10-9010-435a-be42-c1e7236068cc',
  title: 'Utilities/Text Truncation',
  argTypes: {
    truncateWidth: {
      name: 'max-width',
      description: 'Sets the maximum width for truncation.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Text Truncation',
      },
    },
  },
  args: {
    truncateWidth: 200,
  },
  render: args => {
    return html`
      <p class="text-truncate" style="max-width: ${args?.truncateWidth}px">
        This is a long text that should be truncated when it exceeds the defined max-width.
      </p>
    `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
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
    return schemes(
      () => html`
        <div class="display-example">
          ${displayOptions.map(
            display => html`
              <div class="display-container p-8">
                <p>display: ${display}</p>
                <div class="d-${display} p-8">${display}</div>
              </div>
            `,
          )}
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};

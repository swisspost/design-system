import meta from '@/stories/introduction.stories';
import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const TextTruncation: Story = {
  render: () => {
    return schemes(
      () => html`
        <div class="text-truncation-example">
          <div class="py-16">
            ${[100, 200, 300, 400].map(width => {
              return html`
                <b>Width: ${width}px</b>
                <div class="snapshot-outer-container">
                  <p class="text-truncate" style="max-width: ${width}px">
                    This is a long text that should be truncated when it exceeds the defined
                    max-width.
                  </p>
                </div>
              `;
            })}
          </div>
        </div>
      `,
    );
  },
};

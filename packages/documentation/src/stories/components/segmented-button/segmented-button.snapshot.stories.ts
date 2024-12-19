import type { StoryObj } from '@storybook/web-components';
import meta from './segmented-button.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const SegmentedButton: Story = {
  render: () => {
    const labelCounts = [2, 4, 6, 8];

    return schemes(
      scheme => html`
        <div class=" d-flex flex-column w-three-quarters gap-16 p-16">
          ${labelCounts.map(count => {
            const labels = Array.from({ length: count }, (_, i) => `Label ${i + 1}`);

            return html`
              <div class="segmented-button-container">
                <fieldset class="segmented-button">
                  ${labels.map(
                    label => html`
                      <label class="segmented-button-label">
                        <input name="snapshot-${count}-${scheme}" type="radio" />
                        ${label}
                      </label>
                    `,
                  )}
                </fieldset>
              </div>
            `;
          })}
        </div>
      `,
    );
  },
};

import type { StoryObj } from '@storybook/web-components';
import meta from './segmented-button.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const SegmentedButton: Story = {
  render: () => {
    const labelCounts = [2, 4, 6, 8];
    const themes = ['bg-light', 'bg-dark'];

    return html`
      <div class="gap-4">
        ${themes.map(
          (theme) => html`
            <div class="${theme} d-flex flex-column w-75 gap-16 p-16">
              ${labelCounts.map((count) => {
                const labels = Array.from({ length: count }, (_, i) => `Label ${i + 1}`);

                return html`
                  <div class="segmented-button-container">
                    <fieldset class="segmented-button">
                      ${labels.map(
                        (label) => html`
                          <label class="segmented-button-label">
                            <input name="snapshot-${count}-${theme}" type="radio" />
                            ${label}
                          </label>
                        `
                      )}
                    </fieldset>
                  </div>
                `;
              })}
            </div>
          `
        )}
      </div>
    `;
  },
};

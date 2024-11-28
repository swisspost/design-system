import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './palette.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Palette: Story = {
  render: () => {
    return html`${['light', 'dark'].map(
      mainScheme => html`
        <div class="palette-default p-24 d-flex flex-column gap-48" data-color-scheme=${mainScheme}>
          ${['', 'light', 'dark'].map(
            paletteScheme => html`
              <div>
                <p class="px-24">Palette scheme: ${paletteScheme || 'none'}</p>
                <div class="d-flex">
                  ${meta.argTypes.palette.options.map(palette =>
                    meta.render({ palette, colorScheme: paletteScheme }),
                  )}
                </div>
              </div>
            `,
          )}
        </div>
      `,
    )}`;
  },
};

import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import meta from './palettes.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Palette: Story = {
  render: (args: Args, context: StoryContext) => {
    return schemes(
      scheme => html`
        <div>
          <p class="px-24">Palette scheme: ${scheme}</p>
          <div class="d-flex">
            ${meta.argTypes?.palette?.options?.map(palette =>
              meta.render({ palette, colorScheme: scheme }, context),
            )}
          </div>
        </div>
      `,
      {
        additionalSchemes: ['none'],
      },
    );
  },
};

import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './autocomplete.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Autocomplete: Story = {
  render: (_args: Args, context: StoryContext) => {
    const variants = [
      ...bombArgs({
        label: [context.args.label, 'Select your preferred country'],
        clearable: [false, true],
      }),
      ...bombArgs({
        hint: ['Please select a country from the list'],
        clearable: [false],
      }),
      ...bombArgs({
        disabled: [true],
        clearable: [false],
      }),
    ];

    return schemes(
      () => html`
        <div class="d-flex gap-16 flex-column">
          <h2>Autocomplete Variants</h2>
          ${variants.map(
            (args: Args) => html`
              <div style="max-width: 400px;">
                ${Default.render?.(
                  { ...context.args, ...args },
                  { ...context, id: `autocomplete-${crypto.randomUUID()}` },
                )}
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};

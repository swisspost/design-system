import { Args, StoryObj, StoryContext } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import meta from './tag.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Tag: Story = {
  render: (args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        ${bombArgs({
          size: context.argTypes.size.options,
          markup: [
            'Short text',
            'Long text - Lorem ipsum dolor sit amet consectetur.',
            'With markup <span class="fst-italic">italic</span> <span class="fw-bold">bold</span> <img src="/favicon.svg"/>',
          ],
          showIcon: [false, true],
        }).map(
          (bombArgs: Args) =>
            html`<div class="d-flex flex-wrap gap-4 mb-24">
              ${context.argTypes.variant.options
                .filter((v: string) => v !== 'null')
                .map((variant: string) =>
                  meta.render?.(
                    {
                      ...args,
                      ...bombArgs,
                      variant,
                      icon: '1001',
                    },
                    context,
                  ),
                )}
            </div>`,
        )}
      `,
    );
  },
};

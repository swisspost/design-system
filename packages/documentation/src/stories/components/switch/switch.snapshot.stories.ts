import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './switch.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Switch: Story = {
  render: (_args: Args, context: StoryContext) => {
    const longerText =
      'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...';
    const templateVariants = (bg: string) =>
      bombArgs({
        labelPosition: ['before', 'after'],
        label: ['Notifications', longerText],
        hiddenLabel: [false],
        checked: [false, true],
        disabled: [false, true],
        validation: ['null', 'is-valid', 'is-invalid'],
      })
        .filter((args: Args) => !(args.labelPosition == 'before' && args.label === longerText))
        .map(args => ({ ...args, id: `${bg}-${crypto.randomUUID()}` }))
        .map(
          (args: Args) =>
            html`
              <div class="col-6 p-16">
                ${meta.render?.({ ...context.args, ...args }, { ...context, id: args.id })}
              </div>
            `,
        );

    return html`
      <div>
        ${[
          { bg: 'bg-white', scheme: 'light' },
          { bg: 'bg-dark', scheme: 'dark' },
        ].map(
          ({ bg, scheme }) =>
            html`
              <div data-color-scheme="${scheme}" class=${'row bg-' + bg}>
                ${templateVariants(bg)}
              </div>
            `,
        )}
      </div>
    `;
  },
};

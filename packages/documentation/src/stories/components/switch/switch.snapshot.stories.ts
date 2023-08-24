import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './switch.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Switch: Story = {
  render: (_args: Args, context: StoryContext) => {
    const longerText =
      'Longa etikedo kiu plej versajne ne taugas sur unu linio kaj tial devas esti envolvita. Kaj nur por esti sur la sekura flanko, ni simple aldonu unu plian tre sencelan frazon ci tie. Vi neniam scias...';
    const templateVariants = bombArgs({
      labelPosition: ['before', 'after'],
      label: ['Notifications', longerText],
      hiddenLabel: [false],
      checked: [false, true],
      disabled: [false, true],
      validation: ['null', 'is-valid', 'is-invalid'],
    })
      .filter((args: Args) => !(args.labelPosition == 'before' && args.label === longerText))
      .map((args: Args) => {
        return html`
          <div class="col-6 p-3">${meta.render?.({ ...context.args, ...args }, context)}</div>
        `;
      });

    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div class=${'row bg-' + bg}>${templateVariants}</div>
          `,
        )}
      </div>
    `;
  },
};

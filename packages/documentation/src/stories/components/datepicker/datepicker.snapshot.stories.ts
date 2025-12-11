import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './datepicker.stories';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Datepicker: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="row">
          <h1>Datepicker</h1>
          ${bombArgs({
            inline: [true,false],
            range: [true, false]
          })
            .map((args: Args) => {
              return html`
                <div class="col-md-6 mb-32">
                  <h2 class="h4">${args.range ? 'Range' : 'Simple'} ${args.inline ? 'inline' : 'input'} datepicker</h2>
                  ${meta.render?.({ ...context.args, ...args }, context)}
                </div>
              `
            })}
        </div>
      `,
      //TODO: Remove this when styling is done
      {filter: scheme => scheme === COLOR_SCHEMES.light,
    });
  },
};

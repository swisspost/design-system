import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './timepicker.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Timepicker: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="container-fluid">
          <div class="row">
            ${bombArgs({
              label: ['Label'],
              floatingLabel: [false, true],
              hiddenLabel: [false, true],
              hint: [
                '',
                'This is helpful text that provides guidance or additional information to assist the user in filling out this field correctly.',
              ],
              disabled: [false, true],
              validation: ['null', 'is-valid', 'is-invalid'],
              requiredOptional: ['null', 'required', 'optional'],
            })
              .filter(args => !(args.floating === true && args.hiddenLabel === true))
              .map((args: Args, i: number) => {
                context.name = `input-${i}`;
                return html`<div class="col-md-4 col-sm-6 mb-16">
                  ${meta.render?.({ ...context.args, ...args }, context)}
                </div>`;
              })}
          </div>
        </div>
      `,
    );
  },
};

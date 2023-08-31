import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './textarea.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Textarea: Story = {
  render: (_args: Args, context: StoryContext) => {
    const longText =
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
    const shortText = 'Loremipsum';
    let counter = 0;
    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div class=${'row bg-' + bg}>
              ${bombArgs({
                label: [shortText, longText],
                floatingLabel: [true, false],
                hiddenLabel: [true, false],
                size: context.argTypes.size.options,
                disabled: [true, false],
                hint: [shortText, longText],
                validation: context.argTypes.validation.options,
              })
                .filter(
                  (args: Args) => !(args.hiddenLabel === true && args.floatingLabel === false),
                )
                .filter(
                  (args: Args) => !(args.hint === longText && args.validation === 'is-invalid'),
                )
                .filter(
                  (args: Args) => !(args.label === longText && args.validation === 'is-invalid'),
                )
                .map((args: Args) => {
                  return html`
                    <div class="col-6 p-3">
                      ${meta.render?.({ ...context.args, ...args }, context)}
                    </div>
                  `;
                })}
            </div>
          `,
        )}
      </div>
    `;
  },
};

import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, FloatingLabel } from './select.stories';
import { html } from 'lit';
import { getCombinations, COMBINATIONS } from '../../../utils/inputComponentsGetCombinations';

export default {
  ...meta,
  title: 'Snapshots',
  render: renderSelectSnapshot,
};

function renderSelectSnapshot(_args: Args, context: StoryContext) {
  const combinations = [
    ...COMBINATIONS,
    {
      label: `Label - small multipleSize`,
      multipleSize: 2,
    },
    {
      label: `Label - large multipleSize`,
      multipleSize: 6,
    },
    {
      label: `Label - With option selected`,
      selected: 2,
      value: `valoro_2`,
    }
  ];
  return html`
    <div class="d-flex flex-wrap align-items-start gap-regular">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} d-flex gap-3 flex-column p-3">
            <h3>Sizes</h3>
            ${getCombinations('size', context.argTypes.size.options, combinations)
              .filter(
                (args: Args) =>
                  !args.multipleSize || (args.multipleSize && context.args.multiple === true),
              )
              .map(
                (args: Args) =>
                  html`
                    <div>
                      ${args.title !== undefined && args.title
                        ? html`
                            <h4>
                              ${Object.entries(context.argTypes.size.control.labels)
                                .filter(([key, value]) => key === args.size)
                                .map(s => s[1])}
                            </h4>
                          `
                        : ''}
                      <div>${Default.render?.({ ...context.args, ...args }, context)}</div>
                    </div>
                  `,
              )}
            <h3>Floating Label</h3>
            ${getCombinations('floatingLabel', [true], combinations)
              .filter(
                (args: Args) =>
                  !args.multipleSize || (args.multipleSize && context.args.multiple === true),
              )
              .map(
                (args: Args) =>
                  html`
                    <div>${FloatingLabel.render?.({ ...context.args, ...args }, context)}</div>
                  `,
              )}
          </div>
        `,
      )}
    </div>
  `;
}

type Story = StoryObj;

export const Selectdefault: Story = {
  args: {
    multiple: false,
  },
};
export const Selectmultiple: Story = {
  args: {
    multiple: true,
  },
};

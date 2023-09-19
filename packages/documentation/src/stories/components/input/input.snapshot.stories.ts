import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { getCombinations, COMBINATIONS } from '../../../utils/inputComponentsGetCombinations';

export default {
  ...meta,
  title: 'Snapshots',
  render: renderInputSnapshot,
};

function renderInputSnapshot(_args: Args, context: StoryContext) {
  const combinations = [
    ...COMBINATIONS,
    {
      label: `Label - no Placeholder`,
      placeholder: null,
    },
  ];
  return html`
    <div class="d-flex flex-wrap align-items-start gap-regular">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} d-flex gap-3 flex-column p-3">
            <h3>Sizes</h3>
            ${getCombinations('size', context.argTypes.size.options, combinations).map(
              (args: Args) =>
                html`
                  <div>
                    ${args.title !== undefined && args.title
                      ? html`
                          <h4>${args.size}</h4>
                        `
                      : ''}
                    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                  </div>
                `,
            )}
            <h3>Floating Label</h3>
            ${getCombinations('floatingLabel', [true], combinations).map(
              (args: Args) =>
                html`
                  <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                `,
            )}
          </div>
        `,
      )}
    </div>
  `;
}

type Story = StoryObj;

export const Inputtext: Story = {
  args: {
    type: 'text',
  },
};
export const InputPassword: Story = {
  args: {
    type: 'password',
  },
};
export const Inputdate: Story = {
  args: {
    type: 'date',
  },
};
export const Inputdatetimelocal: Story = {
  args: {
    type: 'local',
  },
};
export const Inputmonth: Story = {
  args: {
    type: 'month',
  },
};
export const Inputweek: Story = {
  args: {
    type: 'week',
  },
};
export const Inputtime: Story = {
  args: {
    type: 'time',
  },
};
export const Inputcolor: Story = {
  args: {
    type: 'color',
  },
};

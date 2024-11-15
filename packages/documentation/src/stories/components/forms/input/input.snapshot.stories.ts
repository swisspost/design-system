import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { COMBINATIONS, getCombinations } from '@/utils/inputComponentsGetCombinations';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
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
    {
      label: `Label - with Value`,
      value: 'Lorem Ipsum',
    },
    {
      label: `Label - Floating label`,
      floatingLabel: true,
    },
  ];
  return html`
    <div class="d-flex flex-wrap align-items-start gap-16">
      ${[
        { bg: 'bg-white', scheme: 'light' },
        { bg: 'bg-dark', scheme: 'dark' },
      ].map(
        ({ bg, scheme }) => html`
          <div data-color-scheme="${scheme}" class="${bg} d-flex gap-16 flex-column p-16">
            <h3>Sizes</h3>
            ${getCombinations('size', context.argTypes.size.options, combinations)
              .filter(
                (args: Args) =>
                  !args.value ||
                  (args.value &&
                    (context.args.type === 'text' || context.args.type === 'password')),
              )
              .map((args: Args) => {
                context.id = `a-${crypto.randomUUID()}`;
                return html`
                  <div>
                    ${args.title !== undefined && args.title
                      ? html`
                          <h4>
                            ${Object.entries(context.argTypes.size.control.labels)
                              .filter(([key]) => key === args.size)
                              .map(s => s[1])}
                          </h4>
                        `
                      : ''}
                    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                  </div>
                `;
              })}
            <h3>Floating Label</h3>
            ${getCombinations('floatingLabel', [true], combinations)
              .filter(
                (args: Args) =>
                  !args.value ||
                  (args.value &&
                    (context.args.type === 'text' || context.args.type === 'password')),
              )
              .map((args: Args) => {
                context.id = `${bg}-${crypto.randomUUID()}`;
                return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div> `;
              })}
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
export const Inputpassword: Story = {
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
    type: 'datetime-local',
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

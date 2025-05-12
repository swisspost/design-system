import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
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
  ];
  return schemes(
    scheme => html`
      <div class="d-flex gap-16 flex-column">
        <h3>Standard</h3>
        ${getCombinations('floatingLabel', [false], combinations)
          .filter(
            (args: Args) =>
              !args.value ||
              (args.value && (context.args.type === 'text' || context.args.type === 'password')),
          )
          .map((args: Args) => {
            context.id = `${scheme}-${crypto.randomUUID()}`;
            return html`
              <div>
                <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
              </div>
            `;
          })}
        <h3>Floating Label</h3>
        ${getCombinations('floatingLabel', [true], combinations)
          .filter(
            (args: Args) =>
              !args.value ||
              (args.value && (context.args.type === 'text' || context.args.type === 'password')),
          )
          .map((args: Args) => {
            context.id = `${scheme}-${crypto.randomUUID()}`;
            return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div> `;
          })}
      </div>
    `,
  );
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

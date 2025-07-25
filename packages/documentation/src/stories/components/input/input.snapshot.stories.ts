import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
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
      title: 'No placeholder',
      label: `Label`,
      placeholder: null,
    },
    {
      title: 'With value',
      label: `Label`,
      value: 'Lorem Ipsum',
    },
  ];
  return schemes(
    scheme => html`
      <h1>Inputs</h1>
      <h2 class="h4">Standard</h2>
      <div class="row">
        ${getCombinations('floatingLabel', [false], combinations)
          .filter(
            (args: Args) =>
              !args.value ||
              (args.value && (context.args.type === 'text' || context.args.type === 'password')),
          )
          .map((args: Args) => {
            context.id = `${scheme}-${crypto.randomUUID()}`;
            return html`
              <div class="col-md-6 mb-16">
                <h3 class="h6">${args.title}</h3>
                <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
              </div>
            `;
          })}
      </div>
      <h2 class="h4">Floating Label</h2>
      <div class="row">
        ${getCombinations('floatingLabel', [true], combinations)
          .filter(
            (args: Args) =>
              !args.value ||
              (args.value && (context.args.type === 'text' || context.args.type === 'password')),
          )
          .map((args: Args) => {
            context.id = `${scheme}-${crypto.randomUUID()}`;
            return html` <div class="col-md-6 mb-16">
              <h3 class="h6">${args.title}</h3>
              <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
            </div>`;
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

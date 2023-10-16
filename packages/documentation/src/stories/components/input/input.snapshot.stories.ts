import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { COMBINATIONS } from '../../../utils/inputComponentsGetCombinations';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
  render: renderInputSnapshot,
};

function renderInputSnapshot(_args: Args, context: StoryContext) {
  return html`
    <div class="d-flex flex-wrap align-items-start gap-regular">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} d-flex gap-3 flex-column p-3">
            <h3>Sizes</h3>
            ${context.argTypes.size.options.map((size: string) => {
              const variants = bombArgs({
                combinations: COMBINATIONS,
                size: [size],
                pseudoClass: ['null', 'focus'],
              })
                .map(extractCombinationsArgs)
                .filter(
                  (args: Args) =>
                    !args.value ||
                    (args.value &&
                      (context.args.type === 'text' || context.args.type === 'password')),
                )
                .map(args => renderVariant(args, context));

              return html`
                <section>
                  <h4>${context.argTypes.size.control.labels[size]}</h4>
                  <div class="d-flex gap-3 flex-column">${variants}</div>
                </section>
              `;
            })}
            <h3>Floating Label</h3>
            ${bombArgs({
              combinations: COMBINATIONS,
              floatingLabel: [true],
              pseudoClass: ['null', 'focus'],
            })
              .map(extractCombinationsArgs)
              .filter(
                (args: Args) =>
                  !args.value ||
                  (args.value &&
                    (context.args.type === 'text' || context.args.type === 'password')),
              )
              .map(args => renderVariant(args, context))}
          </div>
        `,
      )}
    </div>
  `;
}

function extractCombinationsArgs(args: Args) {
  return { ...args, ...args.combinations };
}

function renderVariant(args: Args, context: StoryContext) {
  return html`
    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
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
export const Inputcolor: Story = {
  args: {
    type: 'color',
  },
};

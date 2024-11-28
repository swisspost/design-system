import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, FloatingLabel } from './select.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Select: Story = {
  render: (_args: Args, context: StoryContext) => {
    //Arguments for Default Version
    const bombArgsGeneratedDefault = [
      ...bombArgs({
        label: [
          context.args.label,
          'Label - Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor',
        ],
        hint: [''],
      }),
      ...bombArgs({
        hiddenLabel: [true],
        hint: ['Hintus textus', context.args.hint],
      }),
      ...bombArgs({
        disabled: [false, true],
        validation: context.argTypes.validation.options,
      }),
      ...bombArgs({
        validation: context.argTypes.validation.options.filter(
          (option: string) => option !== 'is-invalid',
        ),
      }),
    ]
      // remove disabled & validated examples
      .filter((args: Args) => !(args.disabled && args.validation !== 'null'))
      .map(args => ({ ...args, id: `a-${crypto.randomUUID()}` }));

    //Arguments for Multiple Version
    const bombArgsGeneratedMultiple = [
      ...bombArgs({
        multiple: [true],
        label: [
          context.args.label,
          'Label - Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor',
        ],
        hint: [''],
      }),
      ...bombArgs({
        multiple: [true],
        hiddenLabel: [true],
        hint: ['', 'Hintus textus', context.args.hint],
      }),
      ...bombArgs({
        multiple: [true],
        disabled: [false, true],
        validation: context.argTypes.validation.options,
      }),
    ]
      // remove disabled & validated examples
      .filter((args: Args) => !(args.disabled && args.validation !== 'null'))
      .map(args => ({ ...args, id: `a-${crypto.randomUUID()}` }));

    return schemes(
      () => html`
        <div class="d-flex gap-16 flex-column">
          <h2>Floating Label</h2>
          ${bombArgsGeneratedDefault.map(
            (args: Args) =>
              html`
                <div>
                  ${FloatingLabel.render?.(
                    { ...context.args, ...FloatingLabel.args, ...args },
                    { ...context, id: args.id },
                  )}
                </div>
              `,
          )}
          <h2>Default</h2>
          ${bombArgsGeneratedDefault
            .map((args: Args) => ({ ...args, floatingLabel: false }))
            .map((args: Args) => {
              return html`
                <div>
                  ${Default.render?.(
                    { ...context.args, ...Default.args, ...args },
                    { ...context, id: args.id },
                  )}
                </div>
              `;
            })}
          <h2>Multiple - Floating Label</h2>
          ${bombArgsGeneratedMultiple.map(
            (args: Args) =>
              html`
                <div>
                  ${FloatingLabel.render?.(
                    { ...context.args, ...FloatingLabel.args, ...args },
                    { ...context, id: args.id },
                  )}
                </div>
              `,
          )}
          <h2>Multiple - Default</h2>
          ${bombArgsGeneratedMultiple.map(
            (args: Args) =>
              html`
                <div>
                  ${Default.render?.(
                    { ...context.args, ...Default.args, ...args },
                    { ...context, id: args.id },
                  )}
                </div>
              `,
          )}
        </div>
      `,
    );
  },
};

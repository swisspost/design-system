import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, FloatingLabel } from './select.stories';
import { html } from 'lit';
import { bombArgs } from '../../../../utils';

export default {
  ...meta,
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
        size: context.argTypes.size.options,
        disabled: [false, true],
        validation: context.argTypes.validation.options,
      }),
      ...bombArgs({
        size: context.argTypes.size.options,
        validation: context.argTypes.validation.options.filter(
          (option: string) => option !== 'is-invalid',
        ),
      }),
    ]
      // remove disabled & validated examples
      .filter((args: Args) => !(args.disabled && args.validation !== 'null'));

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
        size: context.argTypes.size.options,
        disabled: [false, true],
        validation: context.argTypes.validation.options,
      }),
    ]
      // remove disabled & validated examples
      .filter((args: Args) => !(args.disabled && args.validation !== 'null'));

    return html`
      <div class="d-flex gap-3 flex-column">
        ${['bg-white', 'bg-dark'].map(
          bg =>
            html`
              <div class="${bg} d-flex gap-3 flex-column p-3">
                <h2>Default</h2>
                ${bombArgsGeneratedDefault.map(
                  (args: Args) =>
                    html`
                      <div>
                        ${Default.render?.({ ...context.args, ...Default.args, ...args }, context)}
                      </div>
                    `,
                )}
                <h2>Floating Label</h2>
                ${bombArgsGeneratedDefault.map(
                  (args: Args) =>
                    html`
                      <div>
                        ${FloatingLabel.render?.(
                          { ...context.args, ...FloatingLabel.args, ...args },
                          context,
                        )}
                      </div>
                    `,
                )}
                <h2>Multiple - Default</h2>
                ${bombArgsGeneratedMultiple.map(
                  (args: Args) =>
                    html`
                      <div>
                        ${Default.render?.({ ...context.args, ...Default.args, ...args }, context)}
                      </div>
                    `,
                )}
                <h2>Multiple - Floating Label</h2>
                ${bombArgsGeneratedMultiple.map(
                  (args: Args) =>
                    html`
                      <div>
                        ${FloatingLabel.render?.(
                          { ...context.args, ...FloatingLabel.args, ...args },
                          context,
                        )}
                      </div>
                    `,
                )}
              </div>
            `,
        )}
      </div>
    `;
  },
};

import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
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
        label: [context.args.label],
        requiredOptional: ['required', 'optional'],
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
      .map(args => ({ ...args }));

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
      .map(args => ({ ...args }));

    return schemes(
      () => html`
        <div class="d-flex gap-16 flex-column">
          <h2>Floating Label</h2>
          <div class="row">
            ${bombArgsGeneratedDefault.map(
              (args: Args) => html`
                <div class="col-md-6 col-lg-4 mb-32">
                  ${FloatingLabel.render?.(
                    { ...context.args, ...FloatingLabel.args, ...args },
                    { ...context, id: `a-${crypto.randomUUID()}` },
                  )}
                </div>
              `,
            )}
          </div>

          <h2>Standard - Default size</h2>
          <div class="row">
            ${bombArgsGeneratedDefault
              .map((args: Args) => ({ ...args, floatingLabel: false }))
              .map((args: Args) => {
                return html`
                  <div class="col-md-6 col-lg-4 mb-32">
                    ${Default.render?.(
                      { ...context.args, ...Default.args, ...args },
                      { ...context, id: `a-${crypto.randomUUID()}` },
                    )}
                  </div>
                `;
              })}
          </div>
          <h2>Standard - Small size</h2>
          <div class="row">
            ${bombArgsGeneratedDefault
              .map((args: Args) => ({ ...args, floatingLabel: false, size: 'small' }))
              .map((args: Args) => {
                return html`
                  <div class="col-md-6 col-lg-4 mb-32">
                    ${Default.render?.(
                      { ...context.args, ...Default.args, ...args },
                      { ...context, id: `a-${crypto.randomUUID()}` },
                    )}
                  </div>
                `;
              })}
          </div>
          <h2>Multiple - Floating Label</h2>
          <div class="row">
            ${bombArgsGeneratedMultiple.map(
              (args: Args) => html`
                <div class="col-md-6 col-lg-4 mb-32">
                  ${FloatingLabel.render?.(
                    { ...context.args, ...FloatingLabel.args, ...args },
                    { ...context, id: `a-${crypto.randomUUID()}` },
                  )}
                </div>
              `,
            )}
          </div>
          <h2>Multiple - Standard - Default size</h2>
          <div class="row">
            ${bombArgsGeneratedMultiple
              .map((args: Args) => ({ ...args, floatingLabel: false }))
              .map(
                (args: Args) => html`
                  <div class="col-md-6 col-lg-4 mb-32">
                    ${Default.render?.(
                      { ...context.args, ...Default.args, ...args },
                      { ...context, id: `a-${crypto.randomUUID()}` },
                    )}
                  </div>
                `,
              )}
          </div>
          <h2>Multiple - Standard - Small size</h2>
          <div class="row">
            ${bombArgsGeneratedMultiple
              .map((args: Args) => ({ ...args, floatingLabel: false, size: 'small' }))
              .map(
                (args: Args) => html`
                  <div class="col-md-6 col-lg-4 mb-32">
                    ${Default.render?.(
                      { ...context.args, ...Default.args, ...args },
                      { ...context, id: `a-${crypto.randomUUID()}` },
                    )}
                  </div>
                `,
              )}
          </div>
        </div>
      `,
    );
  },
};

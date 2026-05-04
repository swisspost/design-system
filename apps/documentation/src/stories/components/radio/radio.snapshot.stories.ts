import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { renderGroup } from './radio.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Radio: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      scheme => html`
        <h1>Radio Buttons</h1>
        <h2 class="h4">Single Radio Button</h2>
        <div class="d-flex flex-wrap gap-16">
          ${[
            ...bombArgs({
              label: [
                'Label',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
              ],
              checked: [false, true],
              disabled: [false, true],
              size: ['null', 'form-check-sm'],
              validation: context.argTypes.validation.options,
              requiredOptional: ['null', 'required', 'optional'],
            }),
            ...bombArgs({
              hiddenLabel: [true],
              disabled: [false, true],
              validation: context.argTypes.validation.options,
              requiredOptional: ['null', 'required', 'optional'],
            }),
          ]
            .filter(
              (args: Args) =>
                !(args.disabled && args.validation !== 'null') &&
                !(args.requiredOptional === 'required' && args.disabled === true),
            )
            .map((args: Args) => {
              context.id = `${scheme}-${crypto.randomUUID()}`;
              return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div>`;
            })}
        </div>

        <h2 class="h4 mt-24">Grouped Radio Buttons</h2>
        <div class="d-flex flex-column gap-16">
          ${(() => {
            const combos = bombArgs({
              inline: [false, true],
              size: ['null', 'form-check-sm'],
            });

            return combos.map((combo: Args) => {
              context.id = `${scheme}-${crypto.randomUUID()}`;
              return html`
                <div class="mt-16">
                  ${renderGroup(
                    {
                      label: 'Label',
                      hiddenLegend: false,
                      checkedRadio: null,
                      ...combo,
                    },
                    context,
                  )}
                </div>
              `;
            });
          })()}
        </div>
      `,
    );
  },
};

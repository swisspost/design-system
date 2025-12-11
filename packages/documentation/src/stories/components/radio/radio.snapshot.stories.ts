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
        <div class="d-flex gap-16 flex-column">
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
            // remove disabled & validated examples
            .filter(
              (args: Args) =>
                !(args.disabled && args.validation !== 'null') &&
                !(args.requiredOptional === 'required' && args.disabled === true),
            )
            .map((args: Args) => {
              const id = `${scheme}-${crypto.randomUUID()}`;
              return meta.render?.(
                { ...context.args, ...args, name: `${scheme}-snapshot-group` },
                { ...context, id },
              );
            })}
        </div>

        <!-- Radio Group/Vertical (Grouped) -->
        <div class="mt-16">
          ${(() => {
            const groupContext = {
              ...context,
              id: `${scheme}-grouped-${crypto.randomUUID()}`,
              name: 'Grouped',
            };
            return renderGroup(
              {
                label: 'Label',
                hiddenLegend: false,
                checkedRadio: null,
              },
              groupContext,
            );
          })()}
        </div>

        <!-- Radio Group/Horizontal (Inline) -->
        <div class="mt-16">
          ${(() => {
            const inlineContext = {
              ...context,
              id: `${scheme}-inline-${crypto.randomUUID()}`,
              name: 'Inline',
            };
            return renderGroup(
              {
                label: 'Label',
                inline: true,
                hiddenLegend: false,
                checkedRadio: null,
              },
              inlineContext,
            );
          })()}
        </div>
      `,
    );
  },
};

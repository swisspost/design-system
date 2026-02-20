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

// Simple id generator for snapshots: timestamp + counter
let __snapshotCounter = 0;
function snapshotId(prefix = '') {
  __snapshotCounter += 1;
  return `${prefix}${Date.now().toString(36)}-${__snapshotCounter.toString(36)}`;
}

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
              validation: Array.from(context.argTypes.validation.options ?? []),
              requiredOptional: ['null', 'required', 'optional'],
            }),
            ...bombArgs({
              hiddenLabel: [true],
              disabled: [false, true],
              validation: Array.from(context.argTypes.validation.options ?? []),
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
              const id = `${scheme}-${snapshotId()}`;
              return meta.render?.(
                { ...context.args, ...args, name: `${scheme}-snapshot-group` },
                { ...context, id },
              );
            })}
        </div>

        <!-- Radio Group: vertical/horizontal x default/small -->
        <div class="mt-16 d-flex gap-16 flex-column">
          ${(() => {
            const combos = bombArgs({
              inline: [false, true],
              size: ['null', 'form-check-sm'],
            });
            return combos.map((combo: Args, idx: number) => {
              const ctx = {
                ...context,
                id: `${scheme}-group-${snapshotId()}-${idx}`,
                name: `${combo.inline ? 'Inline' : 'Grouped'} ${combo.size === 'form-check-sm' ? 'Small' : 'Default'}`,
              };
              return html`<div class="mt-16">
                ${renderGroup(
                  { label: 'Label', hiddenLegend: false, checkedRadio: null, ...combo },
                  ctx,
                )}
              </div>`;
            });
          })()}
        </div>
      `,
    );
  },
};

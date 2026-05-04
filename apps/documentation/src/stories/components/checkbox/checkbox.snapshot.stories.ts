import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { renderGroup } from './checkbox.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Checkbox: Story = {
  render: (_args: Args, context: StoryContext) => {
    const longText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
    window.requestIdleCallback(() => {
      document.querySelectorAll<HTMLInputElement>('.indeterminate input').forEach(input => {
        input.indeterminate = true;
      });
    });
    return schemes(
      scheme => html`
        <h1>Checkboxes</h1>
        <h2 class="h4">Single checkbox</h2>
        <div class="d-flex flex-wrap gap-16">
          ${[
            ...bombArgs({
              checked: ['indeterminate'],
            }),
            ...bombArgs({
              label: ['Label', longText],
              validation: context.argTypes.validation.options,
              checked: ['unchecked', 'checked'],
              size: ['null', 'form-check-sm'],
              hiddenLabel: [false, true],
              disabled: [false, true],
              requiredOptional: ['null', 'required', 'optional'],
            })
              .filter(
                (args: Args) =>
                  !(args.requiredOptional === 'required' && args.disabled === true) &&
                  (args.validation === 'null' || !args.disabled) &&
                  (!args.hiddenLabel || !args.disabled) &&
                  (args.validation === 'null' || args.hiddenLabel),
              )
              .filter(
                (args: Args) =>
                  (args.validation === 'null' && !args.disabled && !args.hiddenLabel) ||
                  args.label !== longText,
              ),
          ].map((args: Args) => {
            context.id = `${scheme}-${crypto.randomUUID()}`;
            return html`
              <span class="${args.checked === 'indeterminate' ? 'indeterminate' : ''}">
                ${meta.render?.({ ...context.args, ...args }, context)}
              </span>
            `;
          })}
        </div>
        <div>
          <h2 class="h4 mt-24">Grouped checkboxes</h2>
          <div class="d-flex flex-column gap-16">
            ${(() => {
              const combos = bombArgs({
                inline: [false, true],
                size: ['null', 'form-check-sm'],
              });

              return combos.map((combo: Args) => {
                return html`
                  <div class="mt-16">
                    ${renderGroup({
                      hiddenLegend: false,
                      ...combo,
                    })}
                  </div>
                `;
              });
            })()}
          </div>
        </div>
      `,
    );
  },
};

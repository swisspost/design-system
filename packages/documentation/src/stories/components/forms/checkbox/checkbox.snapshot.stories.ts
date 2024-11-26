import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Inline } from './checkbox.stories';
import { html } from 'lit';
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
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-16 p-16">
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
                })
                  .filter(
                    (args: Args) =>
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
                context.id = `a-${crypto.randomUUID()}`;
                return html`
                  <span class="${args.checked === 'indeterminate' ? 'indeterminate' : ''}">
                    ${meta.render?.({ ...context.args, ...args }, context)}
                  </span>
                `;
              })}
              <div class="mt-32 w-100"></div>
              ${Inline.render?.({ ...context.args, ...Inline.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};

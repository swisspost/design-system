import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Inline } from './checkbox.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

const pseudoClass = ['null', 'hover', 'focus', ['focus', 'hover']];

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
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-regular p-regular">
              ${[
                ...bombArgs({
                  checked: ['indeterminate'],
                }),
                ...bombArgs({
                  label: ['Label', longText],
                  validation: context.argTypes.validation.options,
                  checked: ['unchecked', 'checked'],
                  hiddenLabel: [false, true],
                  disabled: [false, true],
                  pseudoClass,
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
              ].map(
                (args: Args) =>
                  html`
                    <span class="${args.checked === 'indeterminate' ? 'indeterminate' : ''}">
                      ${meta.render?.({ ...context.args, ...args }, context)}
                    </span>
                  `,
              )}
              <div class="mt-big w-100"></div>
              ${Inline.render?.({ ...context.args, ...Inline.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};

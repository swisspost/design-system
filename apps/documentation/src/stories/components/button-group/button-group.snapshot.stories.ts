import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Direction } from './button-group.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ButtonGroup: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      scheme => html`
        <h2>Single direction</h2>
        <div class="row">
          ${bombArgs({
            direction: context.argTypes.direction.options,
            labelContent: context.argTypes.labelContent.options,
            element: context.argTypes.element.options,
            checked: context.argTypes.checked.options,
            disabledElement: ['null', 0, 1, 2, 3, 4],
          })
            .filter(
              args =>
                !(
                  args.disabledElement !== 'null' &&
                  (args.element === 'button' || args.element === 'link')
                ),
            )
            .filter(args => args.disabledElement !== (args.checked as number) - 1)
            .map((args: Args) => {
              // Substitue checked with selected when element is checkbox
              if (args.element === 'checkbox') {
                args.selected = [args.checked];
                delete args.checked;
              }

              const contextName = Object.values({ scheme, ...args })
                .map(val => val.toString().trim())
                .join('_');

              return html`<div style="max-width: 500px;" class="py-16">
                ${meta.render?.({ ...context.args, ...args }, { ...context, name: contextName })}
              </div>`;
            })}
        </div>
        <h2>Responsive direction</h2>
        <div class="row">
          ${bombArgs({
            groupClass: [
              'btn-group-vertical btn-group-md-horizontal',
              'btn-group-sm-vertical btn-group-md-horizontal',
              'btn-group-md-vertical btn-group-lg-horizontal',
              'btn-group-lg-vertical',
              'btn-group-xl-vertical',
            ],
            element: ['button'],
          }).map(
            (args: Args) =>
              html`<div class="py-16">
                ${Direction.render?.({ ...context.args, ...args }, context)}
              </div>`,
          )}
        </div>
      `,
    );
  },
};

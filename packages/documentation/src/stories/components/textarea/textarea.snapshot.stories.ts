import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './textarea.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { COMBINATIONS, getCombinations } from '@/utils/inputComponentsGetCombinations';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Textarea: Story = {
  render: (_args: Args, context: StoryContext) => {
    const combinations = [
      ...COMBINATIONS,
      {
        label: `Label - small rows`,
        rows: 3,
      },
      {
        label: `Label - large rows`,
        rows: 8,
      },
      {
        label: `Label - Text inside the Textarea`,
        textInside:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      },
      {
        label: `Label - Not resizable`,
        resize: 'resize: none',
      },
    ];

    // Special combinations for disabled overflow text with floating label
    const disabledOverflowTextCombinations = [
      {
        label: `Floating Label - Disabled with overflow text`,
        floatingLabel: true,
        disabled: true,
        textInside:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        rows: 3,
      },
    ];

    return schemes(
      () => html`
        <div>
          <h2>Standard Combinations</h2>
          <h3>Floating Label</h3>
          ${getCombinations('floatingLabel', [true], combinations).map((args: Args) => {
            context.id = crypto.randomUUID();
            return html`
              <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
            `;
          })}

          <h3>Standard Label</h3>
          ${getCombinations('floatingLabel', [false], combinations).map((args: Args) => {
            context.id = crypto.randomUUID();
            return html`
              <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
            `;
          })}

          <h2>Disabled with Overflow Text</h2>
          ${disabledOverflowTextCombinations.map((args: Args) => {
            context.id = crypto.randomUUID();
            return html`
              <div class="mb-4">${meta.render?.({ ...context.args, ...args }, context)}</div>
            `;
          })}
        </div>
      </div>
    `,
      {
        additionalSchemes: ['dark'],
      },
    );
  },
};

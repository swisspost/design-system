import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './textarea.stories';
import { html } from 'lit';
import { COMBINATIONS, getCombinations } from '@/utils/inputComponentsGetCombinations';
import { schemes } from '@/shared/snapshots/schemes';

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

    return schemes(
      () => html`
        <h3>Floating Label</h3>
        ${getCombinations('floatingLabel', [true], combinations).map((args: Args) => {
          context.id = crypto.randomUUID();
          return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div> `;
        })}
        <h3>Standard</h3>
        ${getCombinations('floatingLabel', [false], combinations).map((args: Args) => {
          context.id = crypto.randomUUID();
          return html` <div>${meta.render?.({ ...context.args, ...args }, context)}</div> `;
        })}
      `,
    );
  },
};

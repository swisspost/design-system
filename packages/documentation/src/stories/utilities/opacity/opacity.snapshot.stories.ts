import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { opacityOptions, Opacity as op } from './opacity.stories';
import './opacity.styles.scss';

const { id, ...metaWithoutId } = meta;

// const OpacitySnapshot: Story = {
//   render: () => {
//     return html`
//       ${opacityOptions.map(opacity => {
//         return html`
//           <div class="opacity-${opacity}">
//             <div class="opacity-content">Opacity ${opacity}%</div>
//           </div>
//         `;
//       })}
//     `;
//   },
// };

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Opacity: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="opacity-example-snapshot">
        ${opacityOptions.map(opacity => op.render?.({ ...op.args, opacity }, context))}
      </div>
    `;
  },
};

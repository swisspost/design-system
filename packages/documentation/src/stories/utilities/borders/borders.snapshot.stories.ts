import type { StoryObj, Args } from '@storybook/web-components-vite';
import { html } from 'lit';
import meta, { BorderRounded, BorderSides, RemoveBorders } from './borders.stories';
import './borders.styles.scss';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Borders: Story = {
  render: () => {
    return html`
      ${bombArgs({
        borderWidth: BorderSides.argTypes?.borderWidth?.options,
        borderSide: BorderSides.argTypes?.border?.options,
        removeBorders: RemoveBorders.argTypes?.borderToRemove?.options,
      }).map((bombargs: Args) => {
        return html`
          <div
            class="${bombargs.borderSide} ${bombargs.removeBorders !== 'none'
              ? '' + bombargs.removeBorders
              : ''} ${bombargs.borderWidth !== 'none' ? `border-${bombargs.borderWidth} ` : ''}"
          >
            Sample Text
          </div>
        `;
      })}
    `;
  },
  decorators: [story => html`<div class="borders-example">${story()}</div>`],
};

export const Rounded: Story = {
  render: () => {
    const roundedOptions = BorderRounded.argTypes?.borderRounded?.options || [];
    return html`
      ${roundedOptions.map(option => {
        return html`<div class="border ${option !== 'none' ? option : ''}">Sample Text</div>`;
      })}
    `;
  },
  decorators: [story => html` <div class="borders-example">${story()}</div> `],
};
